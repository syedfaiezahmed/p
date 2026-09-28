"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-[88px] sm:pt-[104px] lg:pt-[96px]">{children}</div>
    </>
  );
}
