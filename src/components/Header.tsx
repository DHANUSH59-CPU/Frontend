"use client";

import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/appStore";
import { logoutUser } from "@/store/authSlice";

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAppSelector((s) => s.authSlice);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Character Builder", to: "/character-builder" },
    { label: "Match", to: "/match" },
    { label: "Connections", to: "/connections" },
    { label: "Profile", to: "/profile" },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-center px-6">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Button key={item.to} asChild variant="ghost" className="px-3">
              <Link to={item.to}>{item.label}</Link>
            </Button>
          ))}
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="px-3"
              onClick={handleLogout}
              disabled={loading}
            >
              Logout
            </Button>
          ) : (
            <Button asChild variant="ghost" className="px-3">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
