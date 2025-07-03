// src/components/Layout.tsx
import { ReactNode } from "react";
import { DefaultSidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-screen h-screen bg-[#18181b]">
      <aside className="w-64 h-full bg-[#111318] border-r border-[#23272f] flex-shrink-0">
        <DefaultSidebar />
      </aside>
      <main className="flex-1 h-full overflow-y-auto p-8">{/* Increased padding for dashboard spacing */}
        {children}
      </main>
    </div>
  );
}
