function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-content">
        <p className="eyebrow">Contacto</p>
        <h2>¿Listo para tu próxima cita de pestañas o cejas?</h2>
        <p>
          Envía un mensaje al estudio para confirmar disponibilidad, hacer
          preguntas o solicitar un juego de pestañas personalizado según tu
          estilo.
        </p>
      </div>

      <div className="contact-grid">
        <a href="https://wa.me/50600000000" target="_blank" rel="noreferrer">
          <span>WhatsApp</span>
          <strong>Reservar mediante chat</strong>
        </a>

        <a href="https://www.instagram.com/zephyrlashbrowart?igsh=amtpOG15amRqbWdo" target="_blank" rel="noreferrer">
          <span>Instagram</span>
          <strong>Ver trabajo más reciente</strong>
        </a>

        <a href="https://maps.google.com/" target="_blank" rel="noreferrer">
          <span>Ubicación</span>
          <strong>Encontrar el estudio</strong>
        </a>

        <a href="mailto:hello@zephyrlashart.com">
          <span>Correo electrónico</span>
          <strong>hello@zephyrlashart.com</strong>
        </a>
      </div>
    </section>
  );
}

export default Contact;