function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <p className="eyebrow">Luxury lashes & brows studio</p>

        <h1>Beauty that feels soft, clean, and personal.</h1>

        <p className="hero__text">
          Zephyr Lash Art Studio creates elegant lash and brow experiences
          through personalized services, easy booking, and a calm studio
          atmosphere.
        </p>

        <div className="hero__actions">
          <a href="#booking" className="button button--primary">
            Book appointment
          </a>

          <a href="#services" className="button button--secondary">
            View services
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__card">
          <span>Next available</span>
          <strong>Wednesday · 11:00 AM</strong>
          <small>Lash Lift & Tint</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;