const testimonials = [
  {
    name: 'Sofia M.',
    service: 'Hybrid Lash Extensions',
    text: 'The result looked super clean and natural. The whole appointment felt calm, detailed, and professional.',
  },
  {
    name: 'Valeria R.',
    service: 'Brow Lamination',
    text: 'My brows finally look shaped without needing much makeup. Loved the mapping and the final finish.',
  },
  {
    name: 'Camila A.',
    service: 'Lash Lift & Tint',
    text: 'Perfect option for everyday lashes. It made my natural lashes look longer and darker.',
  },
];

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="section__header">
        <p className="eyebrow">Client love</p>
        <h2>Soft results, happy clients.</h2>
        <p>
          Realistic sample testimonials for the demo. Later, these can come from
          an admin panel or database.
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