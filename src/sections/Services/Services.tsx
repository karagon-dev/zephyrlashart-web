const services = [
  {
    title: 'Extensiones de pestañas',
    description:
      'Juegos de pestañas clásicas, híbridas y de volumen diseñados para mejorar tu belleza natural.',
    price: 'Desde $45',
  },
  {
    title: 'Diseño de cejas',
    description:
      'Mapeo de cejas, dar forma, limpieza y estilismo para un look limpio y equilibrado.',
    price: 'Desde $25',
  },
  {
    title: 'Levantamiento y tinte de pestañas',
    description:
      'Una opción suave y de bajo mantenimiento para levantar y oscurecer tus pestañas naturales.',
    price: 'Desde $35',
  },
];

import styles from './Services.module.css';

function Services() {
  return (
    <section className="section" id="services">
      <div className="section__header">
        <p className="eyebrow">Nuestros servicios</p>
        <h2>Servicios de belleza hechos simple.</h2>
        <p>
          Elige entre servicios personalizados de pestañas y cejas diseñados
          para confianza diaria, glamour suave y belleza limpia.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <article className={styles.card} key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <strong>{service.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;