"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on courses and profile pages
  const hideFooter =
    pathname.startsWith("/courses") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/progress") ||
    pathname.startsWith("/settings");

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}
