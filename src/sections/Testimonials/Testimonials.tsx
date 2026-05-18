import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Sofia M.',
    service: 'Extensiones híbridas',
    rating: 5,
    text: 'El resultado se veía súper limpio y natural. Toda la cita se sintió tranquila, detallada y profesional.',
  },
  {
    name: 'Valeria R.',
    service: 'Laminación de cejas',
    rating: 5,
    text: 'Mis cejas finalmente se ven con forma sin necesitar mucho maquillaje. Me encantó el mapeo y el acabado final.',
  },
  {
    name: 'Camila A.',
    service: 'Lifting y tinte',
    rating: 5,
    text: 'Opción perfecta para pestañas diarias. Hizo que mis pestañas naturales se vieran más largas y oscuras.',
  },
];

function Testimonials() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`section__header ${styles.header}`}>
        <p className="eyebrow">Amor de las clientas</p>
        <h2>Resultados suaves, clientas felices.</h2>
        <p>
          Cada cita es un espacio para sentirte cuidada. Estas son algunas de
          las palabras que comparten quienes ya pasaron por el estudio.
        </p>

        <div className={styles.rating} aria-label="Calificación promedio">
          <span className={styles.stars} aria-hidden="true">★★★★★</span>
          <div>
            <strong>4.9 / 5</strong>
            <small>Basado en reseñas verificadas</small>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {testimonials.map((item) => (
          <article className={styles.card} key={item.name}>
            <span className={styles.quoteMark} aria-hidden="true">“</span>

            <div className={styles.stars} aria-label={`${item.rating} de 5 estrellas`}>
              {'★'.repeat(item.rating)}
            </div>

            <p>{item.text}</p>

            <div className={styles.author}>
              <span className={styles.avatar} aria-hidden="true">
                {item.name.charAt(0)}
              </span>
              <div>
                <strong>{item.name}</strong>
                <span>{item.service}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;