"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { Skeleton } from "./ui/skeleton";

/**
 * Guards private pages. Shows a skeleton while the BetterAuth session is
 * resolving (never flashes a redirect on refresh), then redirects to login —
 * preserving the intended path with ?callbackUrl= — only if there is truly
 * no session.
 */
export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { isPending, data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(
        `/auth/sign-in?callbackURL=${encodeURIComponent(pathname)}`,
      );
    }
  }, [isPending, session, pathname, router]);

  if (isPending) {
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-12 sm:px-6">
        <Skeleton className="h-10 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return <>{children}</>;
}
