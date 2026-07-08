import { Link, useLocation } from "react-router-dom";

import { useUser } from "../hooks/useUser";
import type { User } from "../types/user";

interface Props {
  users: User[];
  onUserChange: (userId: number) => void;
}

export default function Header({ users, onUserChange }: Props) {
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
            Feed
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
        <div className="flex items-center gap-3">
          <select
            value={user?.id ?? ""}
            onChange={(e) => onUserChange(Number(e.target.value))}
            className="text-sm focus:outline-none"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {user && (
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                user.role === "moderator"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.role}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
