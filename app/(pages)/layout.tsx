"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SideBar from "../components/featured/CustomSidebar";
import { SidebarContext } from "../container/Dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const pathname = usePathname();

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const shouldShowSidebar = pathname !== "/signin";

  return (
    <div>
      <SidebarContext.Provider value={{ isSidebarCollapsed }}>
        {shouldShowSidebar && (
          <SideBar
            toggleSidebar={handleToggleSidebar}
            isCollapsed={isSidebarCollapsed}
          />
        )}

        {children}
      </SidebarContext.Provider>
    </div>
  );
}
