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
        <div>
          <h3>Selecciona tu servicio</h3>
          <p>Comienza eligiendo lo que deseas reservar.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((service) => {
          const isSelected = selectedService?.key === service.key;

          return (
            <button
              type="button"
              key={service.key}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => onSelectService(service)}
            >
              <strong>{service.name}</strong>
              <span>{service.duration}</span>
              <p>{service.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BookingServiceStep;