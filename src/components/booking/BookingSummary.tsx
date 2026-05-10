import type { AvailableSlot } from '../../types/availableSlot';
import type { BookingService } from '../../sections/Booking/Booking';

type Props = {
  selectedService: BookingService | null;
  selectedDate: string;
  selectedSlot: AvailableSlot | null;
};

function formatDate(date: string) {
  if (!date) return 'Not selected';

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(dateTime?: string) {
  if (!dateTime) return 'Not selected';

  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function BookingSummary({ selectedService, selectedDate, selectedSlot }: Props) {
  return (
    <div className="booking-summary-card">
      <span>Selected appointment</span>

      <div>
        <strong>{selectedService?.name ?? 'Choose a service'}</strong>
        <p>{selectedService?.duration ?? 'Duration pending'}</p>
      </div>

      <div>
        <strong>{formatDate(selectedDate)}</strong>
        <p>{formatTime(selectedSlot?.startDateTime)}</p>
      </div>
    </div>
  );
}

export default BookingSummary;