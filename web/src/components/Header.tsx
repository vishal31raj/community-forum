import { Link, useLocation } from "react-router-dom";

import { useUser } from "../hooks/useUser";

export default function Header() {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          Community Forum
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`transition-colors ${
              isActive("/")
                ? "font-semibold text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          {user ? (
            <Link
              to="/saved-posts"
              className={`transition-colors ${
                isActive("/saved-posts")
                  ? "font-semibold text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Saved Posts
            </Link>
          ) : (
            <span
              className="cursor-not-allowed text-gray-400"
              title="Select a user first"
            >
              Saved Posts
            </span>
          )}
        </nav>

        <div className="min-w-[180px] text-right">
          {user ? (
            <div className="flex gap-2 items-center justify-end">
              <p className="font-medium text-gray-900">{user.name}</p>

              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                  user.role === "moderator"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No user selected</p>
          )}
        </div>
      </div>
    </header>
  );
}