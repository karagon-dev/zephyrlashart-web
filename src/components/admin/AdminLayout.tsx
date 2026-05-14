import type { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import styles from "./AdminLayout.module.css";

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
    <div className={styles.shell}>
      <AdminSidebar />

      <main className={styles.page}>
        <header className={styles.header}>
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