function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <p className="eyebrow">Estudio de lujo de pestañas y cejas</p>

        <h1>Belleza que se siente suave, limpia y personal.</h1>

        <p className="hero__text">
          Zephyr Lash Art Studio crea experiencias elegantes de pestañas y cejas
          a través de servicios personalizados, reservas fáciles y una atmósfera
          tranquila del estudio.
        </p>

        <div className="hero__actions">
          <a href="#booking" className="button button--primary">
            Reservar cita
          </a>

          <a href="#services" className="button button--secondary">
            Ver servicios
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__card">
          <span>Próximo disponible</span>
          <strong>Miércoles · 11:00 AM</strong>
          <small>Levantamiento y tinte de pestañas</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;