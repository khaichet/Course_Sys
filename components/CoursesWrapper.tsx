"use client";

import { useSidebar } from "@/lib/SidebarContext";
import { usePathname } from "next/navigation";
import React from "react";

export default function CoursesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded } = useSidebar();
  const pathname = usePathname();
  const showSidebar = pathname !== "/" && !pathname.startsWith("/(home)");

  return (
    <div
      className={`transition-all duration-300 ${
        showSidebar ? (isExpanded ? "ml-64" : "ml-20") : ""
      }`}
    >
      {children}
    </div>
  );
}
