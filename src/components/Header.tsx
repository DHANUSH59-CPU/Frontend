"use client";

import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/appStore";
import { logoutUser } from "@/store/authSlice";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useAppSelector((s) => s.authSlice);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Debug: Log authentication state
  console.log(
    "Header - isAuthenticated:",
    isAuthenticated,
    "loading:",
    loading
  );

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Character Builder", link: "/character-builder" },
    { name: "Match", link: "/match" },
    { name: "Connections", link: "/connections" },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="relative w-full mt-5">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {loading ? (
              <div
                aria-label="Loading account"
                className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"
              />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Open account menu"
                    className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-border"
                  >
                    {(() => {
                      const avatarUrl =
                        (user as any)?.profileImage || (user as any)?.profileImageUrl;
                      if (avatarUrl && !imgError) {
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={avatarUrl}
                            alt={`${(user as any)?.userName || user?.username || "User"} avatar`}
                            className="h-full w-full object-cover"
                            onError={() => setImgError(true)}
                          />
                        );
                      }
                      const name = (user as any)?.userName || user?.username || "U";
                      const initials = name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((s: string) => s[0]?.toUpperCase())
                        .join("");
                      return (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-300 text-xs font-semibold text-neutral-700 dark:bg-neutral-600 dark:text-white">
                          {initials || "U"}
                        </div>
                      );
                    })()}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavbarButton href="/login" variant="primary">
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              {isAuthenticated ? (
                <NavbarButton
                  as="button"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                  disabled={loading}
                >
                  Logout
                </NavbarButton>
              ) : (
                <NavbarButton
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
