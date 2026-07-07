import { useUsers } from "../hooks/useUsers";
import { useUser } from "../hooks/useUser";

export default function UserSelector() {
  const { data: users, isLoading, isError } = useUsers();
  const { user, setUser } = useUser();

  if (isLoading) return <p>Loading users...</p>;

  if (isError) return <p>Failed to load users.</p>;

  return (
    <div>
      <label>Select User</label>

      <select
        value={user?.id ?? ""}
        onChange={(e) => {
          const selected = users?.find((u) => u.id === Number(e.target.value));

          setUser(selected ?? null);
        }}
      >
        <option value="">Choose a user</option>

        {users?.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>
    </div>
  );
}
