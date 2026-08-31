import { useEffect, useState } from "react";
import { getActiveServiceTypes } from "../../services/serviceTypeApi";
import { formatDuration, formatPrice } from "../../lib/format";
import type { ServiceType } from "../../types/serviceType";
import styles from "./Services.module.css";

function Services() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const data = await getActiveServiceTypes();
        setServices(data);
      } catch {
        setErrorMessage("No se pudieron cargar los servicios.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <section className={`section ${styles.section}`} id="services">
      <div className={`section__header ${styles.header}`}>
        <p className="eyebrow">Nuestros servicios</p>
        <h2>Hecho a tu medida, con detalle.</h2>
        <p>
          Cada servicio comienza con una consulta breve para entender tu estilo
          y diseñar pestañas o cejas que se sientan tuyas — limpias, suaves y
          favorecedoras.
        </p>
      </div>

      {isLoading && <p>Cargando servicios...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <div className={styles.grid}>
        {services.map((service, index) => (
          <article
            className={`${styles.card} ${index === 0 ? styles.cardFeatured : ""}`}
            key={service.serviceTypeKey}
          >
            {index === 0 && (
              <span className={styles.badge} aria-label="Servicio destacado">
                ✦ Favorito del estudio
              </span>
            )}

            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3>{service.serviceName}</h3>

            <div className={styles.cardFooter}>
              <span className={styles.duration}>
                {formatDuration(service.durationMinutes)}
              </span>
              <strong>{formatPrice(service.price)}</strong>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.note}>
        ¿No estás segura de qué reservar? Escríbenos por WhatsApp y te ayudamos
        a elegir el servicio ideal para tus rasgos.
      </p>
    </section>
  );
}

export default Services;
