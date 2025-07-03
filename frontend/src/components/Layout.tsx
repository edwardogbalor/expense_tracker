// src/components/Layout.tsx
import { ReactNode } from "react";
import { DefaultSidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex  w-screen h-screen overflow-hidden">
      <DefaultSidebar/>
      <div className="flex-1 h-full overflow-y-auto bg-[#0d0d0d] text-white p-6">
        {children}
      </div>
    </div>
  );
}
