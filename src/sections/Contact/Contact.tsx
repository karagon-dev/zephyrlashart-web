import styles from './Contact.module.css';

const channels = [
  {
    href: 'https://wa.me/50600000000',
    label: 'WhatsApp',
    value: 'Reservar mediante chat',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-12.7 7.2L3 21l2.3-5.1A8.38 8.38 0 1 1 21 11.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    external: true,
  },
  {
    href: 'https://www.instagram.com/zephyrlashbrowart?igsh=amtpOG15amRqbWdo',
    label: 'Instagram',
    value: '@zephyrlashbrowart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
    external: true,
  },
  {
    href: 'https://maps.google.com/',
    label: 'Ubicación',
    value: 'Encontrar el estudio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    external: true,
  },
  {
    href: 'mailto:hello@zephyrlashart.com',
    label: 'Correo',
    value: 'hello@zephyrlashart.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    external: false,
  },
];

const hours = [
  { day: 'Lunes – Viernes', time: '9:00 – 19:00' },
  { day: 'Sábado', time: '9:00 – 16:00' },
  { day: 'Domingo', time: 'Cerrado' },
];

function Contact() {
  return (
    <section className={`section ${styles.section}`} id="contact">
      <div className={styles.intro}>
        <p className="eyebrow">Contacto</p>
        <h2>¿Lista para tu próxima cita?</h2>
        <p>
          Escríbenos para confirmar disponibilidad, resolver dudas o pedir un
          diseño personalizado de pestañas o cejas según tu estilo.
        </p>

        <div className={styles.hours}>
          <div className={styles.hoursHeader}>
            <span className={styles.dot} aria-hidden="true" />
            <strong>Horario del estudio</strong>
          </div>
          <ul>
            {hours.map((h) => (
              <li key={h.day}>
                <span>{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.grid}>
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={styles.channel}
          >
            <span className={styles.icon}>{c.icon}</span>
            <span className={styles.channelLabel}>{c.label}</span>
            <strong>{c.value}</strong>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;