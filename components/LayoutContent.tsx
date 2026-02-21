"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMapPage = pathname === "/map";

  return (
    <>
      <Navbar />
      <main className={`pt-16 ${isMapPage ? "h-screen" : "min-h-screen"}`}>
        {children}
      </main>
      {!isMapPage && <Footer />}
    </>
  );
}