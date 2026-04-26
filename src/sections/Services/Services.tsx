const services = [
  {
    title: 'Lash Extensions',
    description:
      'Classic, hybrid, and volume lash sets designed to enhance your natural beauty.',
    price: 'From $45',
  },
  {
    title: 'Brow Design',
    description:
      'Brow mapping, shaping, cleanup, and styling for a clean and balanced look.',
    price: 'From $25',
  },
  {
    title: 'Lash Lift & Tint',
    description:
      'A soft, low-maintenance option to lift and darken your natural lashes.',
    price: 'From $35',
  },
];

function Services() {
  return (
    <section className="section" id="services">
      <div className="section__header">
        <p className="eyebrow">Our services</p>
        <h2>Beauty services made simple.</h2>
        <p>
          Choose from personalized lash and brow services designed for everyday
          confidence, soft glam, and clean beauty.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
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