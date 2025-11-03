import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "@/utils/axios";
import Loader from "@/components/kokonutui/loader";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FullUserProfile {
  _id: string;
  userName: string;
  emailId: string;
  profileImage?: string;
  phone?: string;
  location?: string;
  bio?: string;
  role: "actor" | "director";
  actorProfile?: {
    age?: number;
    gender?: "Male" | "Female" | "Other";
    height?: number;
    weight?: number;
    skills?: string[];
    languages?: string[];
    portfolio?: string[];
  };
  directorProfile?: {
    company?: string;
    experienceYears?: number;
    pastProjects?: string[];
    castingPreferences?: string[];
  };
}

interface MatchDetailsModalProps {
  userId: string;
  compatibilityScore: number;
  onClose: () => void;
}

export default function MatchDetailsModal({
  userId,
  compatibilityScore,
  onClose,
}: MatchDetailsModalProps) {
  const [user, setUser] = useState<FullUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        // Fetch user details
        const response = await axiosClient.get(`/api/user/${userId}`);
        setUser(response.data.user);
      } catch (error: any) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const formatScore = (score: number): string => {
    return `${(score * 100).toFixed(1)}%`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 0.7) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 0.5) return "text-blue-600 dark:text-blue-400";
    if (score >= 0.3) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader title="Loading profile..." subtitle="Please wait" size="sm" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Unable to load user profile</p>
        <Button variant="outline" className="mt-4" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Avatar and Compatibility Score */}
      <div className="flex items-start gap-6">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.userName}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-2xl font-semibold">
              {(user.userName || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{user.userName}</h2>
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
            <div className="text-right mt-10">
              <p className="text-sm text-muted-foreground">Compatibility</p>
              <p
                className={`text-3xl font-bold ${getScoreColor(
                  compatibilityScore
                )}`}
              >
                {formatScore(compatibilityScore)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            navigate(`/chat/${userId}`);
          }}
          className="gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-base">{user.emailId}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-base">{user.phone}</p>
            </div>
          )}
          {user.location && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Location
              </p>
              <p className="text-base">{user.location}</p>
            </div>
          )}
          {user.bio && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bio</p>
              <p className="text-base">{user.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actor Profile */}
      {user.role === "actor" && user.actorProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Actor Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {user.actorProfile.age && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Age
                  </p>
                  <p className="text-base">{user.actorProfile.age} years</p>
                </div>
              )}
              {user.actorProfile.gender && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Gender
                  </p>
                  <p className="text-base">{user.actorProfile.gender}</p>
                </div>
              )}
              {user.actorProfile.height && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Height
                  </p>
                  <p className="text-base">{user.actorProfile.height} cm</p>
                </div>
              )}
              {user.actorProfile.weight && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Weight
                  </p>
                  <p className="text-base">{user.actorProfile.weight} kg</p>
                </div>
              )}
            </div>

            {user.actorProfile.skills &&
              user.actorProfile.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.actorProfile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {user.actorProfile.languages &&
              user.actorProfile.languages.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.actorProfile.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {user.actorProfile.portfolio &&
              user.actorProfile.portfolio.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Portfolio
                  </p>
                  <div className="space-y-1">
                    {user.actorProfile.portfolio.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {url}
                      </a>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Director Profile */}
      {user.role === "director" && user.directorProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Director Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.directorProfile.company && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Company
                </p>
                <p className="text-base">{user.directorProfile.company}</p>
              </div>
            )}
            {user.directorProfile.experienceYears && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Experience
                </p>
                <p className="text-base">
                  {user.directorProfile.experienceYears} years
                </p>
              </div>
            )}
            {user.directorProfile.pastProjects &&
              user.directorProfile.pastProjects.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Past Projects
                  </p>
                  <div className="space-y-1">
                    {user.directorProfile.pastProjects.map((project, idx) => (
                      <p key={idx} className="text-base">
                        {project}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            {user.directorProfile.castingPreferences &&
              user.directorProfile.castingPreferences.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Casting Preferences
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.directorProfile.castingPreferences.map((pref, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

