import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

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
    <header className={styles.navbar}>
      <a href="/" className={styles.brand}>
        Zephyr Lash Art Studio
      </a>

      <nav className={styles.links}>
        <a href="#services">Servicios</a>
        <a href="#gallery">Galería</a>
        <a href="#booking">Reservas</a>
        <a href="#contact">Contacto</a>
        {isAdmin && <a href="/admin/calendar">Panel de administración</a>}

        <div className={styles.profileMenu} ref={menuRef}>
          <button
            className={styles.profileLink}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="User menu"
          >
            <User size={18} strokeWidth={2} />
          </button>

          {isMenuOpen && user && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownUser}>
                <div className={styles.dropdownUserHeader}>
                  <div>
                    <p className={styles.dropdownGreeting}>¡Hola, {user.clientFirstName}!</p>
                    <p className={styles.dropdownEmail}>{user.clientEmail}</p>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <button
                  className={styles.dropdownItem}
                  onClick={handleAdminPanel}
                >
                  Panel de administración
                </button>
              )}
              <button
                className={styles.dropdownItem}
                onClick={handlePasswordReset}
              >
                Restablecer contraseña
              </button>
              <button
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                onClick={handleLogout}
              >
                <LogOut size={16} strokeWidth={2} />
                Cerrar sesión
              </button>
            </div>
          )}

          {isMenuOpen && !user && (
            <div className={styles.dropdown}>
              <a href="/login" className={styles.dropdownItem}>
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