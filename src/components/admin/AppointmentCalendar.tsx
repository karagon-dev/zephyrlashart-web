import { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import type { AppointmentListItem } from "../../types/appointment";
import type { AvailableSlot } from "../../types/availableSlot";
import { CreateBatchSlotModal } from "./CreateBatchSlotModal";
import { DayEventsModal } from "./DayEventsModal";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarEventType = "appointment" | "availableSlot";

type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  eventType: CalendarEventType;
};

type AppointmentCalendarProps = {
  appointments: AppointmentListItem[];
  availableSlots: AvailableSlot[];
  onSelectAppointment: (appointmentKey: number) => void;
  onSelectAvailableSlot: (availableSlotKey: number) => void;
  onSelectEmptySlot: (start: Date, end: Date) => void;
};

function CustomToolbar({
  date,
  onNavigate,
  onCreateBatch,
}: {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
  onCreateBatch: () => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flex: 1 }}>
        <button
          type="button"
          onClick={() => onNavigate("PREV")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <span style={{ minWidth: "120px", textAlign: "center" }}>
          {format(date, "MMMM yyyy")}
        </span>

        <button
          type="button"
          onClick={() => onNavigate("NEXT")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={onCreateBatch}
        style={{
          background: "rgba(160, 120, 120, 0.1)",
          border: "1px solid rgba(160, 120, 120, 0.3)",
          borderRadius: "0.65rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "600",
          color: "var(--color-primary)",
        }}
      >
        Create batch
      </button>
    </div>
  );
}

export function AppointmentCalendar({
  appointments,
  availableSlots,
  onSelectAppointment,
  onSelectAvailableSlot,
  onSelectEmptySlot,
}: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayEventsDate, setDayEventsDate] = useState<string | null>(null);

  const appointmentEvents: CalendarEvent[] = appointments.map((appointment) => ({
    id: appointment.appointmentKey,
    title: `${appointment.clientName} • ${appointment.serviceName}`,
    start: new Date(appointment.startDateTime),
    end: new Date(appointment.endDateTime),
    eventType: "appointment",
  }));

  const availableSlotEvents: CalendarEvent[] = availableSlots
    .filter((slot) => slot.isAvailable)
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
    .map((slot) => {
      const startTime = new Date(slot.startDateTime);
      const endTime = new Date(slot.endDateTime);
      const startHours = startTime.getHours().toString().padStart(2, '0');
      const startMinutes = startTime.getMinutes().toString().padStart(2, '0');
      const endHours = endTime.getHours().toString().padStart(2, '0');
      const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
      return {
        id: slot.availableSlotKey,
        title: `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`,
        start: startTime,
        end: endTime,
        eventType: "availableSlot",
      };
    });

  const events = [...availableSlotEvents, ...appointmentEvents];

  const [showBatchModal, setShowBatchModal] = useState(false);

  // Get all events for the selected date
  const dayEvents = useMemo(() => {
    if (!dayEventsDate) return [];
    return events
      .filter((e) => format(e.start, "yyyy-MM-dd") === dayEventsDate)
      .map((e) => ({
        id: e.id,
        title: e.title,
        eventType: e.eventType,
      }));
  }, [events, dayEventsDate]);

  const handleShowMore = (_events: CalendarEvent[], date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    setDayEventsDate(dateStr);
  };

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else if (action === "NEXT") {
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else {
      setCurrentDate(new Date());
    }
  };

  return (
    <section className="admin-card admin-calendar-card">
      <CustomToolbar date={currentDate} onNavigate={handleNavigate} onCreateBatch={() => setShowBatchModal(true)} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="month"
        selectable
        toolbar={false}
        style={{ height: 650, width: "100%" }}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectEvent={(event) => {
          if (event.eventType === "appointment") {
            onSelectAppointment(event.id);
            return;
          }

          onSelectAvailableSlot(event.id);
        }}
        onSelectSlot={(slotInfo) =>
          onSelectEmptySlot(slotInfo.start, slotInfo.end)
        }
        onShowMore={handleShowMore}
        eventPropGetter={(event) => ({
          className:
            event.eventType === "appointment"
              ? "calendar-event-appointment"
              : "calendar-event-slot",
        })}
      />

      <DayEventsModal
        isOpen={dayEventsDate !== null}
        date={dayEventsDate}
        events={dayEvents}
        onClose={() => setDayEventsDate(null)}
        onSelectAppointment={onSelectAppointment}
        onSelectAvailableSlot={onSelectAvailableSlot}
      />

      <CreateBatchSlotModal
        isOpen={showBatchModal}
        onClose={() => setShowBatchModal(false)}
        currentMonth={currentDate}
      />
    </section>
  );
}