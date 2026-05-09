import type { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

type AdminLayoutProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function AdminLayout({
  title,
  eyebrow = "Admin Panel",
  children,
}: AdminLayoutProps) {
  return (
    <div className="admin-shell">
      <AdminSidebar />

      <main className="admin-page">
        <header className="admin-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}