"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Better Auth sends OAuth failures back to `errorCallbackURL` with
 * `?error=<code>&error_description=<text>`. Without surfacing them the user
 * just sees the sign-in form again and assumes nothing happened.
 */
const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Google sign-in was cancelled.",
  account_not_linked:
    "An account with this email already exists. Sign in with your email and password first, then connect Google.",
  email_does_not_match:
    "Google returned an email that does not match your StudioSpace account.",
  account_already_linked_to_different_user:
    "This Google account is already connected to a different StudioSpace account.",
  email_not_found:
    "Google did not share an email address. Please allow email access and try again.",
  email_not_verified:
    "Google has not verified this email address, so it cannot be used to sign in.",
  state_mismatch: "Your Google sign-in session expired. Please try again.",
  state_not_found: "Your Google sign-in session expired. Please try again.",
  please_restart_the_process:
    "Your Google sign-in session expired. Please try again.",
  invalid_code: "Google sign-in could not be completed. Please try again.",
  no_code: "Google sign-in could not be completed. Please try again.",
  unable_to_get_user_info:
    "Google sign-in could not be completed. Please try again.",
  oauth_provider_not_found:
    "Google sign-in is not configured on this deployment.",
};

function OAuthErrorAlertContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return null;

  const message =
    OAUTH_ERROR_MESSAGES[error] ||
    searchParams.get("error_description") ||
    `Google sign-in failed (${error}). Please try again.`;

  return (
    <div
      role="alert"
      className="mb-6 rounded-xl border border-[#ff263f]/40 bg-[#ff263f]/10 px-4 py-3 text-sm"
    >
      <p className="font-bold text-white">Google sign-in failed</p>
      <p className="mt-1 text-red-200">{message}</p>
    </div>
  );
}

export default function OAuthErrorAlert() {
  return (
    <Suspense fallback={null}>
      <OAuthErrorAlertContent />
    </Suspense>
  );
}
