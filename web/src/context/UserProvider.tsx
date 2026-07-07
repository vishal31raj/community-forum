import { useEffect, useMemo, useState, type ReactNode } from "react";

import UserContext from "./UserContext";
import type { User } from "../types/user";

interface Props {
  children: ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");

    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
