import { format } from "date-fns";
import styles from "./Modals.module.css";

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
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.dayEvents}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dayEventsHeader}>
          <h2>{format(new Date(date), "EEEE, MMM d")}</h2>
          <button
            type="button"
            className={styles.dayEventsClose}
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.dayEventsContent}>
          {events.length === 0 ? (
            <p className={styles.dayEventsEmpty}>No hay eventos programados para este día.</p>
          ) : (
            <div className={styles.dayEventsList}>
              {events.map((event) => {
                const itemClass =
                  event.eventType === "appointment"
                    ? `${styles.eventItem} ${styles.eventItemAppointment}`
                    : `${styles.eventItem} ${styles.eventItemSlot}`;
                const badgeClass =
                  event.eventType === "appointment"
                    ? `${styles.eventBadge} ${styles.eventBadgeAppointment}`
                    : `${styles.eventBadge} ${styles.eventBadgeSlot}`;
                return (
                  <button
                    key={event.id}
                    className={itemClass}
                    onClick={() => handleEventClick(event)}
                  >
                    <span className={badgeClass}></span>
                    <span className={styles.eventTitle}>{event.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
