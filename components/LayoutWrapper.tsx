"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { useSidebar } from "@/lib/SidebarContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/" && !pathname.startsWith("/(home)");
  const { isExpanded } = useSidebar();

  return (
    <>
      {showSidebar && <Sidebar />}
      <main
        className={`flex-1 overflow-y-auto w-full transition-all duration-300 ${
          showSidebar ? (isExpanded ? "ml-64" : "ml-20") : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}
