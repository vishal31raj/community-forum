import type { ChangeEvent } from "react";

import type { User } from "../types/user";

interface Props {
  users: User[];
  value: number | "";
  onChange: (userId: number) => void;
}

export default function UserSelector({
  users,
  value,
  onChange,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Select User
      </label>

      <select
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.role})
          </option>
        ))}
      </select>
    </div>
  );
}