
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { UserRound, Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfileEditPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (result.error) {
        toast.error(result.error.message || "Profile update failed.");
        return;
      }

      toast.success("Your Profile updated successfully!");
      await authClient.getSession();
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0506] text-white">
        <Loader2 className="animate-spin text-[#ff263f]" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0506] px-4 text-white">
        <h1 className="text-2xl font-bold">Please Sign In</h1>
        <p className="text-gray-400">
          You need to sign in to edit your profile.
        </p>
        <Link
          href="/auth/sign-in"
          className="rounded-lg bg-[#ff263f] px-6 py-3 font-semibold text-white hover:bg-red-600"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0506] px-4 py-12 text-white">
      <div className="mx-auto max-w-2xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#ff263f]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="rounded-2xl border border-[#3b2025] bg-[#151011] p-6 shadow-xl sm:p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Edit <span className="text-[#ff263f]">Profile</span>
            </h1>

            <p className="mt-2 text-gray-400">
              Update your StudioSpace account information.
            </p>
          </div>

          {/* Avatar Preview */}
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#ff263f] bg-[#ff263f]">
              {image ? (
                <img
                  src={image}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <UserRound size={42} className="text-white" />
              )}
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Profile Picture Preview
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border border-[#3b2025] bg-[#0b0506] px-4 py-3 text-white outline-none transition focus:border-[#ff263f]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-[#3b2025] bg-[#0b0506]/50 px-4 py-3 text-gray-500"
              />

              <p className="mt-2 text-xs text-gray-500">
                Email address cannot be changed here.
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold"
              >
                Profile Image URL
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full rounded-lg border border-[#3b2025] bg-[#0b0506] px-4 py-3 text-white outline-none transition focus:border-[#ff263f]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Enter a publicly accessible image URL.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff263f] px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
