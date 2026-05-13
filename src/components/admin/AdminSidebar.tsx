import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/admin/calendar", label: "Calendario" },
  { to: "/admin/appointments", label: "Solicitudes de citas" },
  { to: "/", label: "Volver a la página principal" },
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <p className="eyebrow">Panel de administración</p>
        <h1>Zephyr Lash Art</h1>
      </div>

      <nav className="admin-sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "admin-sidebar-link is-active"
                : "admin-sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
