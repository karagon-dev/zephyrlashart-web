const testimonials = [
  {
    name: 'Sofia M.',
    service: 'Extensiones de pestañas híbridas',
    text: 'El resultado se veía súper limpio y natural. Toda la cita se sintió tranquila, detallada y profesional.',
  },
  {
    name: 'Valeria R.',
    service: 'Laminación de cejas',
    text: 'Mis cejas finalmente se ven con forma sin necesitar mucho maquillaje. Me encantó el mapeo y el acabado final.',
  },
  {
    name: 'Camila A.',
    service: 'Levantamiento y tinte de pestañas',
    text: 'Opción perfecta para pestañas diarias. Hizo que mis pestañas naturales se vieran más largas y oscuras.',
  },
];

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="section__header">
        <p className="eyebrow">Amor de los clientes</p>
        <h2>Resultados suaves, clientes felices.</h2>
        <p>
          Testimonios de ejemplo realistas para la demostración. Posteriormente,
          estos pueden provenir de un panel de administración o base de datos.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <p>“{item.text}”</p>

            <div>
              <strong>{item.name}</strong>
              <span>{item.service}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;