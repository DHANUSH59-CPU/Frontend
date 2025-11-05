import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/store/appStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/kokonutui/file-upload";
import axiosClient from "@/utils/axios";
import { useToast } from "@/components/ui/toast";
import AvatarCreatorWrapper from "@/components/AvatarCreator";
import SafeAvatar from "@/components/SafeAvatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const genderEnum = z.enum(["Male", "Female", "Other"]);

const actorSchema = z.object({
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .optional(),
  gender: genderEnum.optional(),
  height: z.coerce
    .number({ invalid_type_error: "Height must be a number" })
    .optional(),
  weight: z.coerce
    .number({ invalid_type_error: "Weight must be a number" })
    .optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  portfolio: z.array(z.string()).optional(),
});

const directorSchema = z.object({
  company: z.string().optional(),
  experienceYears: z.coerce
    .number({ invalid_type_error: "Experience must be a number" })
    .optional(),
  pastProjects: z.array(z.string()).optional(),
  castingPreferences: z.array(z.string()).optional(),
});

const baseSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  emailId: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(1000, "Bio is too long").optional(),
  role: z.enum(["actor", "director"]),
  profileImage: z.string().url().optional(),
});

const formSchema = baseSchema.and(
  z.object({
    actorProfile: actorSchema.optional(),
    directorProfile: directorSchema.optional(),
  })
);

type FormValues = z.infer<typeof formSchema>;

const toArray = (value?: string[] | null) =>
  Array.isArray(value) ? value : [];

export default function Profile() {
  const { user } = useAppSelector((s) => s.authSlice);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    (user as any)?.profileImage || (user as any)?.profileImageUrl
  );
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const { notify } = useToast();

  const defaultValues: FormValues = useMemo(() => {
    return {
      userName: user?.username || (user as any)?.userName || "",
      emailId: user?.emailId || "",
      phone: (user as any)?.phone || "",
      location: (user as any)?.location || "",
      bio: (user as any)?.bio || "",
      role: (user as any)?.role || "actor",
      profileImage: (user as any)?.profileImage || undefined,
      actorProfile: (user as any)?.actorProfile
        ? {
            age: (user as any)?.actorProfile?.age ?? undefined,
            gender: (user as any)?.actorProfile?.gender ?? undefined,
            height: (user as any)?.actorProfile?.height ?? undefined,
            weight: (user as any)?.actorProfile?.weight ?? undefined,
            skills: toArray((user as any)?.actorProfile?.skills),
            languages: toArray((user as any)?.actorProfile?.languages),
            portfolio: toArray((user as any)?.actorProfile?.portfolio),
          }
        : undefined,
      directorProfile: (user as any)?.directorProfile
        ? {
            company: (user as any)?.directorProfile?.company ?? "",
            experienceYears:
              (user as any)?.directorProfile?.experienceYears ?? undefined,
            pastProjects: toArray((user as any)?.directorProfile?.pastProjects),
            castingPreferences: toArray(
              (user as any)?.directorProfile?.castingPreferences
            ),
          }
        : undefined,
    } as FormValues;
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    setAvatarUrl(defaultValues.profileImage);
  }, [defaultValues, reset]);

  const role = watch("role");

  const onSubmit = async (values: FormValues) => {
    // Normalize numeric fields from string inputs
    if (values.actorProfile) {
      const a = values.actorProfile as any;
      if (a.age && typeof a.age === "string") a.age = Number(a.age);
      if (a.height && typeof a.height === "string") a.height = Number(a.height);
      if (a.weight && typeof a.weight === "string") a.weight = Number(a.weight);
    }
    if (values.directorProfile) {
      const d = values.directorProfile as any;
      if (d.experienceYears && typeof d.experienceYears === "string")
        d.experienceYears = Number(d.experienceYears);
    }

    try {
      await axiosClient.put("/api/edit", values);
      notify({
        type: "success",
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
    } catch (e: any) {
      notify({
        type: "error",
        title: "Save failed",
        description: e?.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axiosClient.post("/api/image/embed", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data?.url as string | undefined;
      if (url) {
        setAvatarUrl(url);
        setValue("profileImage", url);
        notify({ type: "success", title: "Avatar updated" });
      }
    } catch (e: any) {
      notify({
        type: "error",
        title: "Upload failed",
        description: e?.response?.data?.error || "Unable to upload image",
      });
    }
  };

  const handleAvatarCreated = async (url: string) => {
    try {
      setAvatarUrl(url);
      setValue("profileImage", url);
      setShowAvatarCreator(false);
      notify({ type: "success", title: "Avatar created successfully" });
    } catch (e: any) {
      notify({
        type: "error",
        title: "Failed to save avatar",
        description: e?.response?.data?.error || "Unable to save avatar",
      });
    }
  };

  const ChipList = ({
    label,
    fieldPath,
    placeholder,
  }: {
    label: string;
    fieldPath:
      | "actorProfile.skills"
      | "actorProfile.languages"
      | "actorProfile.portfolio"
      | "directorProfile.pastProjects"
      | "directorProfile.castingPreferences";
    placeholder?: string;
  }) => {
    const values = (watch(fieldPath as any) as string[] | undefined) || [];
    const [input, setInput] = useState("");
    const add = () => {
      const v = input.trim();
      if (!v) return;
      const updated = [...values, v];
      setValue(fieldPath as any, updated);
      setInput("");
    };
    const remove = (idx: number) => {
      const updated = values.filter((_, i) => i !== idx);
      setValue(fieldPath as any, updated);
    };
    return (
      <div className="space-y-2">
        <Label htmlFor={`chip-${fieldPath}`}>{label}</Label>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
            id={`chip-${fieldPath}`}
            name={`chip-${fieldPath}`}
            placeholder={placeholder}
          />
          <Button type="button" onClick={add}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {values.map((v, idx) => (
            <span
              key={`${v}-${idx}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm"
            >
              {v}
              <button
                type="button"
                className="text-muted-foreground"
                onClick={() => remove(idx)}
                aria-label={`Remove ${v}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4 mt-24 mb-40 md:mt-32 md:mb-56">
      <div className="flex items-center gap-6">
        <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-full border">
          {avatarUrl ? (
            avatarUrl.includes('readyplayer.me') ? (
              <SafeAvatar 
                modelSrc={avatarUrl} 
                className="h-full w-full"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <FileUpload
            acceptedFileTypes={[
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/gif",
            ]}
            onUploadSuccess={handleAvatarUpload}
            className="max-w-xs"
          />
          <div className="text-sm text-muted-foreground">or</div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAvatarCreator(true)}
            className="max-w-xs"
          >
            Create 3D Avatar
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="userName">Username</Label>
            <Input id="userName" {...register("userName")} />
            {errors.userName && (
              <p className="text-sm text-destructive">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailId">Email</Label>
            <Input id="emailId" readOnly disabled {...register("emailId")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" rows={4} {...register("bio")} />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            className="h-9 rounded-md border bg-background px-3 text-sm"
            {...register("role")}
          >
            <option value="actor">Actor</option>
            <option value="director">Director</option>
          </select>
        </div>

        {role === "actor" && (
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="text-sm font-medium">Actor Profile</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="actor-age">Age</Label>
                <Input
                  id="actor-age"
                  type="number"
                  {...register("actorProfile.age")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actor-gender">Gender</Label>
                <select
                  id="actor-gender"
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  {...register("actorProfile.gender")}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="actor-height">Height (cm)</Label>
                <Input
                  id="actor-height"
                  type="number"
                  {...register("actorProfile.height")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actor-weight">Weight (kg)</Label>
                <Input
                  id="actor-weight"
                  type="number"
                  {...register("actorProfile.weight")}
                />
              </div>
            </div>

            <ChipList
              label="Skills"
              fieldPath="actorProfile.skills"
              placeholder="e.g., Singing"
            />
            <ChipList
              label="Languages"
              fieldPath="actorProfile.languages"
              placeholder="e.g., English"
            />
            <ChipList
              label="Portfolio URLs"
              fieldPath="actorProfile.portfolio"
              placeholder="https://..."
            />
          </div>
        )}

        {role === "director" && (
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="text-sm font-medium">Director Profile</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="director-company">Company</Label>
                <Input
                  id="director-company"
                  {...register("directorProfile.company")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="director-experienceYears">
                  Experience (years)
                </Label>
                <Input
                  id="director-experienceYears"
                  type="number"
                  {...register("directorProfile.experienceYears")}
                />
              </div>
            </div>
            <ChipList
              label="Past Projects"
              fieldPath="directorProfile.pastProjects"
              placeholder="Project name"
            />
            <ChipList
              label="Casting Preferences"
              fieldPath="directorProfile.castingPreferences"
              placeholder="e.g., Thriller"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => reset(defaultValues)}
          >
            Cancel
          </Button>
        </div>
      </form>

      <Dialog open={showAvatarCreator} onOpenChange={setShowAvatarCreator}>
        <DialogContent className="max-w-7xl h-[90vh] p-0" onClose={() => setShowAvatarCreator(false)}>
          <div className="p-4 pb-0">
            <h2 className="text-lg font-semibold">Create Your 3D Avatar</h2>
          </div>
          <div className="flex-1 overflow-hidden h-[calc(90vh-60px)]">
            <AvatarCreatorWrapper
              subdomain="demo"
              onAvatarExported={handleAvatarCreated}
              onClose={() => setShowAvatarCreator(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
