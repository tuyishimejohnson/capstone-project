import { Link } from "react-router-dom";
import { GlobeLock, Handshake } from "lucide-react";

export const FooterPrivacy = () => {
  return (
    <footer className="bg-gray-100 border-t-1 border-gray-300 py-6 px-4 rounded-t-2xl shadow-lg mt-8">
      <div className="flex justify-center gap-8 items-center mb-2">
        <Link
          to={"/privacy"}
          className="flex items-center gap-2 text-teal-900 font-semibold hover:text-teal-600 hover:underline transition-transform transform hover:scale-105"
        >
          <span role="img" aria-label="Privacy">
            <GlobeLock />
          </span>{" "}
          Privacy Policy
        </Link>
        <span className="text-teal-400">|</span>
        <Link
          to={"/ethics"}
          className="flex items-center gap-2 text-teal-900 font-semibold hover:text-teal-600 hover:underline transition-transform transform hover:scale-105"
        >
          <span role="img" aria-label="Ethics">
            <Handshake />
          </span>{" "}
          Code of Ethics
        </Link>
      </div>
      <div className="text-center text-xs text-teal-800 opacity-80">
        © {new Date().getFullYear()} Community Health Workers Portal. All rights
        reserved.
      </div>
    </footer>
  );
};
