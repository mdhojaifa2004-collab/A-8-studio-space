
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../app/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../app/component/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";

import {
  Menu,
  X,
  LogOut,
  UserPen,
  ChevronDown,
} from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  // Authentication session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Active navigation link
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close mobile menu
  const closeMenu = () => setOpen(false);

  // Logout function
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      closeMenu();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // User Avatar
  const UserAvatar = () => (
    <Avatar className="h-10 w-10 border border-[#ff263f]">
      <AvatarImage
        src={user?.image || ""}
        alt={user?.name || "User"}
      />

      <AvatarFallback className="bg-[#ff263f] font-semibold text-white">
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );

  // Profile Dropdown
  const ProfileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-2 text-white outline-none transition hover:bg-[#ff263f]/10 focus-visible:ring-2 focus-visible:ring-[#ff263f]">
        <UserAvatar />

        <span className="text-sm font-semibold">
          Profile
        </span>

        <ChevronDown size={16} className="text-gray-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 border-[#3b2025] bg-[#151011] text-white"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">
                {user?.name || "User"}
              </span>

              <span className="text-xs text-gray-400">
                {user?.email || ""}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#3b2025]" />

        <DropdownMenuItem
          onClick={() => router.push("/profile/edit")}
          className="cursor-pointer focus:bg-[#ff263f]/20 focus:text-white"
        >
          <UserPen className="mr-2 h-4 w-4" />
          Profile Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#3b2025]" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-[#ff263f] focus:bg-[#ff263f]/20 focus:text-[#ff263f]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-[#ff263f] bg-[#0b0506] text-white">
      <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-5">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff263f"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M4.5 7.5 9 9l1.5-4.5" />
            <path d="m14 4 1 4 4.5 1" />
            <path d="m19 15-4-1-2 5" />
            <path d="m5 16 3-2 1 5" />
          </svg>

          <span className="text-[22px] font-bold tracking-tight">
            Studio <span className="text-[#f50722]">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold text-white"
                  : "rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#ff263f]/10 hover:text-[#ff263f]"
              }
            >
              {link.label}
            </Link>
          ))}

          {/* My Bookings: Only logged-in users */}
          {!isPending && user && (
            <Link
              href="/my-bookings"
              className={
                isActive("/my-bookings")
                  ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold text-white"
                  : "rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#ff263f]/10 hover:text-[#ff263f]"
              }
            >
              My Bookings
            </Link>
          )}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {isPending ? null : user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="rounded-lg border border-[#ff263f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff263f]/10"
              >
                Sign In
              </Link>

              <Link
                href="/auth/sign-up"
                className="rounded-lg bg-[#ff263f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-2xl text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#2d1a1d] bg-[#0b0506] px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">

            {/* Mobile Navigation */}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={
                  isActive(link.href)
                    ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold text-white"
                    : "rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-[#ff263f]/10 hover:text-[#ff263f]"
                }
              >
                {link.label}
              </Link>
            ))}

            {!isPending && (
              <div className="mt-3 border-t border-[#2d1a1d] pt-4">

                {user ? (
                  <div className="flex flex-col gap-3">

                    {/* My Bookings */}
                    <Link
                      href="/my-bookings"
                      onClick={closeMenu}
                      className={
                        isActive("/my-bookings")
                          ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold text-white"
                          : "rounded-lg border border-[#3b2025] px-4 py-3 text-sm text-white hover:bg-[#ff263f]/10"
                      }
                    >
                      My Bookings
                    </Link>

                    {/* User Information */}
                    <div className="flex items-center gap-3">
                      <UserAvatar />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user.name || "User"}
                        </p>

                        <p className="truncate text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Profile Edit */}
                    <Link
                      href="/profile/edit"
                      onClick={closeMenu}
                      className="flex items-center gap-2 rounded-lg border border-[#3b2025] px-4 py-3 text-sm text-white hover:bg-[#ff263f]/10"
                    >
                      <UserPen size={17} />
                      Profile Edit
                    </Link>

                    {/* Sign Out */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 rounded-lg border border-[#ff263f] px-4 py-3 text-sm text-[#ff263f] transition hover:bg-[#ff263f]/10"
                    >
                      <LogOut size={17} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  /* Logged Out */
                  <div className="flex gap-3">
                    <Link
                      href="/auth/sign-in"
                      onClick={closeMenu}
                      className="flex-1 rounded-lg border border-[#ff263f] px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/auth/sign-up"
                      onClick={closeMenu}
                      className="flex-1 rounded-lg bg-[#ff263f] px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
