"use client";

import * as React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = React.useState("");

  // Set dark mode as default theme
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-neutral-800/50 bg-background/50 backdrop-blur-sm text-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Newsletter */}
          <div className="relative">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">
              Talent Frame
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              AI-powered talent discovery for the film industry. Connect actors
              and directors seamlessly.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-12 bg-background border-neutral-800/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link
                to="/"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/match"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Match
              </Link>
              <Link
                to="/character-builder"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Character Builder
              </Link>
              <Link
                to="/profile"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Profile
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <nav className="space-y-2 text-sm">
              <Link
                to="/about"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                About Us
              </Link>
              <a
                href="#"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </a>
              <a
                href="#"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-neutral-800/50 bg-background/50 hover:bg-background"
                      asChild
                    >
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-neutral-800/50 bg-background/50 hover:bg-background"
                      asChild
                    >
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-neutral-800/50 bg-background/50 hover:bg-background"
                      asChild
                    >
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-neutral-800/50 bg-background/50 hover:bg-background"
                      asChild
                    >
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800/50 pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Talent Frame. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
