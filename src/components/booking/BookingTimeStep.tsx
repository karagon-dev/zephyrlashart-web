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
          <h3>Elige una hora</h3>
          <p>Selecciona uno de los espacios de cita disponibles.</p>
        </div>
      </div>

      {!selectedDate && <p className="booking-muted">Selecciona una fecha primero.</p>}

      {selectedDate && isLoading && <p className="booking-muted">Cargando horarios...</p>}

      {selectedDate && !isLoading && availableSlots.length === 0 && (
        <p className="booking-muted">No hay horarios disponibles para esta fecha.</p>
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
              <span>Disponible</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BookingTimeStep;