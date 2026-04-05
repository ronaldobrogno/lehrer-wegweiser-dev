import { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
