"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/courses") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/progress") ||
    pathname.startsWith("/settings");

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}
