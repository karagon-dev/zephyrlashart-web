const galleryItems = [
  {
    title: 'Volume Lash Extensions',
    category: 'Lash Extensions',
    image:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Brow Lamination',
    category: 'Brows',
    image:
      'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Lash Lift Results',
    category: 'Lash Lift',
    image:
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
  },
];

function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section__header">
        <p className="eyebrow">Studio work</p>
        <h2>Clean details. Soft glam. Real results.</h2>
        <p>
          A preview of lash extension sets, brow lamination work, and lash lift
          transformations created with detail, mapping, and care.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article className="gallery-card" key={item.title}>
            <img src={item.image} alt={item.title} />

            <div className="gallery-card__content">
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