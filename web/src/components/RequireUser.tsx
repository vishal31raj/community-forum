import { Navigate } from "react-router-dom";

import { useUser } from "../hooks/useUser";

interface Props {
  children: React.ReactNode;
}

export default function RequireUser({ children }: Props) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
