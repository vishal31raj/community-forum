import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {children}
    </div>
  );
}