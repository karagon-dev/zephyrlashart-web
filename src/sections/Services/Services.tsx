import styles from './Services.module.css';

const services = [
  {
    number: '01',
    title: 'Extensiones de pestañas',
    description:
      'Juegos clásicos, híbridos y de volumen diseñados para realzar tu mirada natural.',
    duration: '2 – 3 h',
    price: 'Desde $45',
    includes: ['Mapeo personalizado', 'Materiales premium', 'Retoque a 7 días'],
    featured: true,
  },
  {
    number: '02',
    title: 'Diseño de cejas',
    description:
      'Mapeo, forma, limpieza y estilismo para cejas equilibradas y bien definidas.',
    duration: '45 min',
    price: 'Desde $25',
    includes: ['Mapeo facial', 'Depilación con hilo o cera', 'Tinte opcional'],
  },
  {
    number: '03',
    title: 'Levantamiento y tinte',
    description:
      'Opción suave y de bajo mantenimiento para levantar y oscurecer tus pestañas naturales.',
    duration: '1 h',
    price: 'Desde $35',
    includes: ['Lifting con keratina', 'Tinte negro suave', 'Resultados ~6 semanas'],
  },
];

function Services() {
  return (
    <section className={`section ${styles.section}`} id="services">
      <div className={`section__header ${styles.header}`}>
        <p className="eyebrow">Nuestros servicios</p>
        <h2>Hecho a tu medida, con detalle.</h2>
        <p>
          Cada servicio comienza con una consulta breve para entender tu estilo
          y diseñar pestañas o cejas que se sientan tuyas — limpias, suaves y
          favorecedoras.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <article
            className={`${styles.card} ${service.featured ? styles.cardFeatured : ''}`}
            key={service.title}
          >
            {service.featured && (
              <span className={styles.badge} aria-label="Servicio destacado">
                ✦ Favorito del estudio
              </span>
            )}

            <span className={styles.number} aria-hidden="true">
              {service.number}
            </span>

            <h3>{service.title}</h3>
            <p>{service.description}</p>

            <ul className={styles.includes} aria-label="Qué incluye">
              {service.includes.map((item) => (
                <li key={item}>
                  <span className={styles.bullet} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.cardFooter}>
              <span className={styles.duration}>{service.duration}</span>
              <strong>{service.price}</strong>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.note}>
        ¿No estás segura de qué reservar? Escríbenos por WhatsApp y te ayudamos
        a elegir el servicio ideal para tus rasgos.
      </p>
    </section>
  );
}

export default Services;