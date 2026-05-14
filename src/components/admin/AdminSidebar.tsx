import { NavLink } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const NAV_ITEMS = [
  { to: "/admin/calendar", label: "Calendario" },
  { to: "/admin/appointments", label: "Solicitudes de citas" },
  { to: "/", label: "Volver a la página principal" },
];

export function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <p className="eyebrow">Panel de administración</p>
        <h1>Zephyr Lash Art</h1>
      </div>

      <nav className={styles.sidebarNav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
