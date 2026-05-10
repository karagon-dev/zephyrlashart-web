import type { BookingService } from '../../sections/Booking/Booking';

type Props = {
  services: BookingService[];
  selectedService: BookingService | null;
  onSelectService: (service: BookingService) => void;
};

function BookingServiceStep({ services, selectedService, onSelectService }: Props) {
  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <div>
          <h3>Select your service</h3>
          <p>Start by choosing what you want to book.</p>
        </div>
      </div>

      <div className="service-card-grid">
        {services.map((service) => {
          const isSelected = selectedService?.key === service.key;

          return (
            <button
              type="button"
              key={service.key}
              className={`service-card ${isSelected ? 'service-card--selected' : ''}`}
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