import { createContext } from "react";
import type { User } from "../types/user";

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
