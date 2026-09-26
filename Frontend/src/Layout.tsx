import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ContactBar } from "./ContactBar";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pb-14 pt-[72px] md:pb-0">
        <Outlet />
      </main>
      <SiteFooter />
      <ContactBar />
    </div>
  );
}
