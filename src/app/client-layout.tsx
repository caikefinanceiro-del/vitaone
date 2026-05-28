"use client";

import { AuthProvider } from "@/lib/use-auth";
import { SidebarProvider } from "@/lib/sidebar-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </AuthProvider>
  );
}

