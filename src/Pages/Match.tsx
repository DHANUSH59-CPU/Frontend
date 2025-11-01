import { useState } from "react";
import FileUpload from "@/components/kokonutui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axiosClient from "@/utils/axios";
import { useToast } from "@/components/ui/toast";
import Loader from "@/components/kokonutui/loader";

interface MatchUser {
  _id: string;
  userName: string;
  profileImage?: string;
  role: "actor" | "director";
}

interface Match {
  user: MatchUser;
  score: number;
}

interface MatchResponse {
  count: number;
  matches: Match[];
}

export default function Match() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const { notify } = useToast();

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setHasUploaded(true);
    setMatches([]);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosClient.post<MatchResponse>(
        "/api/match/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.matches && response.data.matches.length > 0) {
        setMatches(response.data.matches);
        notify({
          type: "success",
          title: "Matches found!",
          description: `Found ${response.data.count} potential matches`,
        });
      } else {
        notify({
          type: "info",
          title: "No matches found",
          description: "Try uploading a different image",
        });
      }
    } catch (error: any) {
      console.error("Match error:", error);
      notify({
        type: "error",
        title: "Match failed",
        description: error?.response?.data?.error || "Unable to find matches",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score: number): string => {
    return `${(score * 100).toFixed(1)}%`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 0.7) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 0.5) return "text-blue-600 dark:text-blue-400";
    if (score >= 0.3) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getRoleBadgeColor = (role: string): string => {
    return role === "actor"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4 mt-24 mb-40 md:mt-32 md:mb-56">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Your Match</h1>
          <p className="text-muted-foreground mt-2">
            Upload an image to discover compatible actors or directors
          </p>
        </div>

        <div className="flex justify-center">
          <FileUpload
            acceptedFileTypes={[
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/gif",
            ]}
            onUploadSuccess={handleImageUpload}
            className="max-w-md"
          />
        </div>
      </div>

      {loading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader
            title="Finding matches..."
            subtitle="Analyzing your image"
            size="md"
          />
        </div>
      )}

      {!loading && hasUploaded && matches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Matches ({matches.length})
            </h2>
          </div>

          <div className="space-y-3">
            {matches.map((match) => (
              <Card
                key={match.user._id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border">
                    {match.user.profileImage ? (
                      <img
                        src={match.user.profileImage}
                        alt={match.user.userName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-semibold">
                        {match.user.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg truncate">
                        {match.user.userName}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          match.user.role
                        )}`}
                      >
                        {match.user.role.charAt(0).toUpperCase() +
                          match.user.role.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      Compatibility
                    </span>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(
                        match.score
                      )}`}
                    >
                      {formatScore(match.score)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!loading && hasUploaded && matches.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No matches found. Try uploading a different image.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setHasUploaded(false);
              setMatches([]);
            }}
          >
            Upload Another Image
          </Button>
        </Card>
      )}
    </div>
  );
}
