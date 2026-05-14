import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <p className="eyebrow">Estudio de lujo de pestañas y cejas</p>

        <h1>Belleza que se siente suave, limpia y personal.</h1>

        <p className={styles.text}>
          Zephyr Lash Art Studio crea experiencias elegantes de pestañas y cejas
          a través de servicios personalizados, reservas fáciles y una atmósfera
          tranquila del estudio.
        </p>

        <div className={styles.actions}>
          <a href="#booking" className="button button--primary">
            Reservar cita
          </a>

          <a href="#services" className="button button--secondary">
            Ver servicios
          </a>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.card}>
          <span>Próximo disponible</span>
          <strong>Miércoles · 11:00 AM</strong>
          <small>Levantamiento y tinte de pestañas</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;