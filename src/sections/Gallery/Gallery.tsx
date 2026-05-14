const galleryItems = [
  {
    title: 'Extensiones de pestañas de volumen',
    category: 'Extensiones de pestañas',
    image:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Laminación de cejas',
    category: 'Cejas',
    image:
      'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Resultados del levantamiento de pestañas',
    category: 'Levantamiento de pestañas',
    image:
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
  },
];

import styles from './Gallery.module.css';

function Gallery() {
  return (
    <section className={`section ${styles.section}`} id="gallery">
      <div className="section__header">
        <p className="eyebrow">Trabajo del estudio</p>
        <h2>Detalles limpios. Glamour suave. Resultados reales.</h2>
        <p>
          Una vista previa de juegos de extensiones de pestañas, trabajo de
          laminación de cejas y transformaciones de levantamiento de pestañas
          creadas con detalle, mapeo y cuidado.
        </p>
      </div>

      <div className={styles.grid}>
        {galleryItems.map((item) => (
          <article className={styles.card} key={item.title}>
            <img src={item.image} alt={item.title} />

            <div className={styles.cardContent}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Gallery;