import styles from './Gallery.module.css';

const galleryItems = [
  {
    index: '01',
    title: 'Volumen suave · Cat eye',
    category: 'Extensiones de pestañas',
    detail: 'Mapeo personalizado · 5D ligero',
    image:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
  },
  {
    index: '02',
    title: 'Laminación con forma natural',
    category: 'Cejas',
    detail: 'Keratina + tinte suave',
    image:
      'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80',
  },
  {
    index: '03',
    title: 'Lifting con tinte negro',
    category: 'Levantamiento de pestañas',
    detail: 'Duración aprox. 6 semanas',
    image:
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
  },
];

function Gallery() {
  return (
    <section className={`section ${styles.section}`} id="gallery">
      <div className={`section__header ${styles.header}`}>
        <p className="eyebrow">Trabajo del estudio</p>
        <h2>Detalles limpios. Glamour suave. Resultados reales.</h2>
        <p>
          Una vista previa de juegos de extensiones, trabajo de laminación y
          transformaciones de lifting creadas con mapeo y cuidado para cada
          rostro.
        </p>

        <a href="https://www.instagram.com/zephyrlashbrowart?igsh=amtpOG15amRqbWdo"
           target="_blank"
           rel="noreferrer"
           className={styles.headerLink}>
          Ver más en Instagram →
        </a>
      </div>

      <div className={styles.grid}>
        {galleryItems.map((item) => (
          <article className={styles.card} key={item.title}>
            <img src={item.image} alt={item.title} loading="lazy" />

            <span className={styles.index} aria-hidden="true">
              {item.index}
            </span>

            <div className={styles.cardContent}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <small>{item.detail}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Gallery;