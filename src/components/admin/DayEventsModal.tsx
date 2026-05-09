import { format } from "date-fns";

type CalendarEventType = "appointment" | "availableSlot";

type DayEvent = {
  id: number;
  title: string;
  eventType: CalendarEventType;
};

type DayEventsModalProps = {
  isOpen: boolean;
  date: string | null;
  events: DayEvent[];
  onClose: () => void;
  onSelectAppointment: (appointmentKey: number) => void;
  onSelectAvailableSlot: (availableSlotKey: number) => void;
};

export function DayEventsModal({
  isOpen,
  date,
  events,
  onClose,
  onSelectAppointment,
  onSelectAvailableSlot,
}: DayEventsModalProps) {
  if (!isOpen || !date) return null;

  const handleEventClick = (event: DayEvent) => {
    if (event.eventType === "appointment") {
      onSelectAppointment(event.id);
    } else {
      onSelectAvailableSlot(event.id);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="appointment-modal day-events-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="day-events-modal-header">
          <h2>{format(new Date(date), "EEEE, MMM d")}</h2>
          <button
            type="button"
            className="day-events-modal-close"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="day-events-modal-content">
          {events.length === 0 ? (
            <p className="day-events-empty">No events scheduled for this day.</p>
          ) : (
            <div className="day-events-list">
              {events.map((event) => (
                <button
                  key={event.id}
                  className={`day-event-item day-event-item-${event.eventType}`}
                  onClick={() => handleEventClick(event)}
                >
                  <span className={`day-event-badge day-event-badge-${event.eventType}`}></span>
                  <span className="day-event-title">{event.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
