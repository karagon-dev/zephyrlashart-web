import styles from './Footer.module.css';

const navLinks = [
  { href: '#services', label: 'Servicios' },
  { href: '#gallery', label: 'Galería' },
  { href: '#booking', label: 'Reservar' },
  { href: '#contact', label: 'Contacto' },
];

const social = [
  { href: 'https://www.instagram.com/zephyrlashbrowart?igsh=amtpOG15amRqbWdo', label: 'Instagram' },
  { href: 'https://wa.me/50600000000', label: 'WhatsApp' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">✦</span>
            <strong>Zephyr Lash Art Studio</strong>
          </div>
          <p>
            Estudio boutique de pestañas y cejas. Diseño detallado, materiales
            premium y un espacio tranquilo pensado para ti.
          </p>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Explora</span>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Síguenos</span>
          <ul>
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.bottom}>
        <span>© 2026 Zephyr Lash Art Studio · Todos los derechos reservados.</span>
        <span className={styles.tagline}>Hecho con cuidado, una mirada a la vez.</span>
      </div>
    </footer>
  );
}

export default Footer;