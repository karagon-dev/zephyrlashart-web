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
    <section className="section" id="services">
      <div className="section__header">
        <p className="eyebrow">Nuestros servicios</p>
        <h2>Servicios de belleza hechos simple.</h2>
        <p>
          Elige entre servicios personalizados de pestañas y cejas diseñados
          para confianza diaria, glamour suave y belleza limpia.
        </p>
      </div>

      {isLoading && <p>Cargando servicios...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <div className={styles.grid}>
        {services.map((service) => (
          <article className={styles.card} key={service.serviceTypeKey}>
            <h3>{service.serviceName}</h3>
            <p>{formatDuration(service.durationMinutes)}</p>
            <strong>{formatPrice(service.price)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
