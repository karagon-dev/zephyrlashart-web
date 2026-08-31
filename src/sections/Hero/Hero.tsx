import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.signature}>
          <span className={styles.signatureMark} aria-hidden="true" />
          <p className="eyebrow">Estudio de lujo · Pestañas &amp; Cejas</p>
        </div>

        <h1>
          Belleza que se siente <em className={styles.accent}>suave</em>,
          limpia y personal.
        </h1>

        <p className={styles.text}>
          En Zephyr Lash Art Studio diseñamos cada juego de pestañas y cada par
          de cejas a la medida de tus rasgos. Mapeo detallado, materiales
          premium y un espacio tranquilo pensado para ti.
        </p>

        <div className={styles.actions}>
          <a href="#booking" className="button button--primary">
            Reservar cita
          </a>

          <a href="#services" className="button button--secondary">
            Ver servicios
          </a>
        </div>

        <ul className={styles.trust} aria-label="Confianza del estudio">
          <li>
            <strong>+500</strong>
            <span>Clientas felices</span>
          </li>
          <li className={styles.trustDivider} aria-hidden="true" />
          <li>
            <strong>4.9 ★</strong>
            <span>Reseñas verificadas</span>
          </li>
          <li className={styles.trustDivider} aria-hidden="true" />
          <li>
            <strong>100%</strong>
            <span>Diseño personalizado</span>
          </li>
        </ul>
      </div>

      <div className={styles.visual}>
        <div className={styles.tag}>
          <span aria-hidden="true">✦</span> Hecho a mano · uno por uno
        </div>

        <div className={styles.card}>
          <span>Próxima cita disponible</span>
          <strong>Miércoles · 11:00 AM</strong>
          <small>Levantamiento y tinte de pestañas</small>
          <a href="#booking" className={styles.cardLink}>
            Reservar este horario →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;