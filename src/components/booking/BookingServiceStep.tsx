import type { BookingService } from '../../sections/Booking/Booking';
import styles from './BookingServiceStep.module.css';

type Props = {
  services: BookingService[];
  selectedService: BookingService | null;
  onSelectService: (service: BookingService) => void;
};

function BookingServiceStep({ services, selectedService, onSelectService }: Props) {
  return (
    <div className={styles.step}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Paso 01 · Servicio</p>
        <h3>Selecciona tu servicio</h3>
        <p className={styles.subtitle}>
          Comienza eligiendo lo que deseas reservar. Puedes contarnos los
          detalles más adelante.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service, index) => {
          const isSelected = selectedService?.key === service.key;

          return (
            <button
              type="button"
              key={service.key}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => onSelectService(service)}
              aria-pressed={isSelected}
            >
              <span className={styles.cardIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className={styles.cardBody}>
                <strong>{service.name}</strong>
                <p>{service.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.duration}>
                  <span className={styles.clock} aria-hidden="true" />
                  {service.duration}
                </span>
                <span className={styles.check} aria-hidden="true">✓</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BookingServiceStep;