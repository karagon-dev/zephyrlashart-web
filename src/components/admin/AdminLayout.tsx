import type { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h2>Appointments</h2>
        </div>
      </header>

      {children}
    </main>
  );
}