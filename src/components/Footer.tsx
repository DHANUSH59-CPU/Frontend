// React import removed (unused)
import { Link } from "react-router";
import { Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#FFD700]/20 rounded-lg flex items-center justify-center border border-[#FFD700]/40">
                <Film className="w-5 h-5 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-semibold text-[#FFD700]">
                TalentFrame
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              An AI-powered casting platform that connects filmmakers with
              actors through intelligent face recognition and smart talent
              matching. Crafted for the new era of cinema.
            </p>
            <div className="flex space-x-5 pt-2">
              <a
                href="https://github.com/DHANUSH59-CPU"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD700] transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.801 8.207 11.387.599.111.793-.262.793-.577v-2.234c-3.338.727-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.839 1.238 1.839 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.4 3.003-.404 1.02.004 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .318.192.693.801.576C20.563 21.8 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dhanush-kumar-11b994333"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD700] transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FFD700]">
              Core Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li>🎬 AI-Powered Casting</li>
              <li>📸 Face Recognition</li>
              <li>🤝 Actor-Filmmaker Matching</li>
              <li>🌐 Smart Discovery</li>
              <li>📊 Personalized Insights</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FFD700]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#FFD700] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="hover:text-[#FFD700] transition-colors duration-200"
                >
                  Discover Talent
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="hover:text-[#FFD700] transition-colors duration-200"
                >
                  Upload Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#FFD700] transition-colors duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FFD700]">Powered By</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 border border-[#FFD700]/30 rounded-full text-[#FFD700]">
                React
              </span>
              <span className="px-2 py-1 border border-[#FFD700]/30 rounded-full text-[#FFD700]">
                Node.js
              </span>
              <span className="px-2 py-1 border border-[#FFD700]/30 rounded-full text-[#FFD700]">
                FastAPI
              </span>
              <span className="px-2 py-1 border border-[#FFD700]/30 rounded-full text-[#FFD700]">
                MongoDB
              </span>
              <span className="px-2 py-1 border border-[#FFD700]/30 rounded-full text-[#FFD700]">
                Pinecone
              </span>
            </div>
          </div>

          {/* Developer */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FFD700]">Developer</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FFD700]/20 rounded-full flex items-center justify-center border border-[#FFD700]/40">
                <span className="font-bold text-[#FFD700]">DK</span>
              </div>
              <div>
                <h5 className="font-medium text-gray-200">Dhanush Kumar</h5>
                <p className="text-sm text-gray-500">
                  AI & Full Stack Engineer
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Building the bridge between creativity and technology through
              AI-driven talent discovery and casting innovation.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()} TalentFrame. Crafted with 💫 by
            Dhanush.
          </span>
          <span className="text-gray-600">
            Empowering filmmakers through AI and innovation.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
