import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/admin/calendar", label: "Calendar" },
  { to: "/admin/appointments", label: "Appointment requests" },
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <p className="eyebrow">Admin Panel</p>
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
