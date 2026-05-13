import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user?.roleName?.toLowerCase() === "admin";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleAdminPanel = () => {
    setIsMenuOpen(false);
    navigate("/admin/calendar");
  };

  const handlePasswordReset = () => {
    setIsMenuOpen(false);
    navigate("/password-reset");
  };

  return (
    <header className="navbar">
      <a href="/" className="navbar__brand">
        Zephyr Lash Art Studio
      </a>

      <nav className="navbar__links">
        <a href="#services">Servicios</a>
        <a href="#gallery">Galería</a>
        <a href="#booking">Reservas</a>
        <a href="#contact">Contacto</a>
        {isAdmin && <a href="/admin/calendar">Panel de administración</a>}

        <div className="navbar__profile-menu" ref={menuRef}>
          <button
            className="navbar__profile-link"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="User menu"
          >
            <User size={18} strokeWidth={2} />
          </button>

          {isMenuOpen && user && (
            <div className="navbar__dropdown">
              <div className="navbar__dropdown-user">
                <div className="navbar__dropdown-user-header">
                  <div>
                    <p className="navbar__dropdown-greeting">¡Hola, {user.clientFirstName}!</p>
                    <p className="navbar__dropdown-email">{user.clientEmail}</p>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <button
                  className="navbar__dropdown-item"
                  onClick={handleAdminPanel}
                >
                  Panel de administración
                </button>
              )}
              <button
                className="navbar__dropdown-item"
                onClick={handlePasswordReset}
              >
                Restablecer contraseña
              </button>
              <button
                className="navbar__dropdown-item navbar__dropdown-logout"
                onClick={handleLogout}
              >
                <LogOut size={16} strokeWidth={2} />
                Cerrar sesión
              </button>
            </div>
          )}

          {isMenuOpen && !user && (
            <div className="navbar__dropdown">
              <a href="/login" className="navbar__dropdown-item">
                Iniciar sesión
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;