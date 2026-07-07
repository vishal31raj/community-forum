import type { ReactNode } from "react";

import Header from "./Header";
import PageContainer from "./ui/PageContainer";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <PageContainer>{children}</PageContainer>
    </div>
  );
}
