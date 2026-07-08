import type { ReactNode } from "react";

import Header from "./Header";
import PageContainer from "./ui/PageContainer";
import { useUsers } from "../hooks/useUsers";
import { useUser } from "../hooks/useUser";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { setUser } = useUser();
  const { data: users = [] } = useUsers();

  const handleUserChange = (userId: number) => {
    const selectedUser = users.find((u) => u.id === userId) ?? null;

    setUser(selectedUser);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header users={users} onUserChange={handleUserChange} />

      <PageContainer>{children}</PageContainer>
    </div>
  );
}
