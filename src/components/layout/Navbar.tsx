import { User } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="navbar__brand">
        Zephyr Lash Art Studio
      </a>

      <nav className="navbar__links">
        <a href="#services">Services</a>
        <a href="#gallery">Gallery</a>
        <a href="#booking">Booking</a>
        <a href="#contact">Contact</a>

        <a href="/login" className="navbar__profile-link">
          <User size={18} strokeWidth={2} />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;