import type { AvailableSlot } from '../../types/availableSlot';

type Props = {
  selectedDate: string;
  availableSlots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  onSelectSlot: (slot: AvailableSlot) => void;
  isLoading: boolean;
};

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function BookingTimeStep({
  selectedDate,
  availableSlots,
  selectedSlot,
  onSelectSlot,
  isLoading,
}: Props) {
  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <div>
          <h3>Choose a time</h3>
          <p>Select one of the available appointment slots.</p>
        </div>
      </div>

      {!selectedDate && <p className="booking-muted">Select a date first.</p>}

      {selectedDate && isLoading && <p className="booking-muted">Loading times...</p>}

      {selectedDate && !isLoading && availableSlots.length === 0 && (
        <p className="booking-muted">No available times for this date.</p>
      )}

      <div className="time-pill-grid">
        {availableSlots.map((slot) => {
          const isSelected = selectedSlot?.availableSlotKey === slot.availableSlotKey;

          return (
            <button
              type="button"
              key={slot.availableSlotKey}
              className={`time-pill ${isSelected ? 'time-pill--selected' : ''}`}
              onClick={() => onSelectSlot(slot)}
            >
              <strong>{formatTime(slot.startDateTime)}</strong>
              <span>Available</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BookingTimeStep;