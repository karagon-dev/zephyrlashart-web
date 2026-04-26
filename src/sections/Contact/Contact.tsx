function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-content">
        <p className="eyebrow">Contact</p>
        <h2>Ready for your next lash or brow appointment?</h2>
        <p>
          Message the studio to confirm availability, ask questions, or request
          a custom lash set based on your style.
        </p>
      </div>

      <div className="contact-grid">
        <a href="https://wa.me/50600000000" target="_blank" rel="noreferrer">
          <span>WhatsApp</span>
          <strong>Book through chat</strong>
        </a>

        <a href="https://instagram.com/" target="_blank" rel="noreferrer">
          <span>Instagram</span>
          <strong>View latest work</strong>
        </a>

        <a href="https://maps.google.com/" target="_blank" rel="noreferrer">
          <span>Location</span>
          <strong>Find the studio</strong>
        </a>

        <a href="mailto:hello@zephyrlashart.com">
          <span>Email</span>
          <strong>hello@zephyrlashart.com</strong>
        </a>
      </div>
    </section>
  );
}

export default Contact;