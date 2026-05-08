import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek, addMonths, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import type { AppointmentListItem } from "../../types/appointment";

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

type AppointmentCalendarProps = {
  appointments: AppointmentListItem[];
  onSelectAppointment: (appointmentKey: number) => void;
};

type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

function CustomToolbar({ date, onNavigate }: { date: Date; onNavigate: (action: "PREV" | "NEXT") => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
      <button type="button" onClick={() => onNavigate("PREV")}>
        &lt;
      </button>
      <span style={{ minWidth: "120px", textAlign: "center" }}>
        {format(date, "MMMM yyyy")}
      </span>
      <button type="button" onClick={() => onNavigate("NEXT")}>
        &gt;
      </button>
    </div>
  );
}

export function AppointmentCalendar({
  appointments,
  onSelectAppointment,
}: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events: CalendarEvent[] = appointments.map((appointment) => ({
    id: appointment.appointmentKey,
    title: `${appointment.clientName} • ${appointment.serviceName}`,
    start: new Date(appointment.startDateTime),
    end: new Date(appointment.endDateTime),
  }));

  const handleNavigate = (action: "PREV" | "NEXT") => {
    setCurrentDate((prevDate) =>
      action === "PREV" ? subMonths(prevDate, 1) : addMonths(prevDate, 1)
    );
  };

  return (
    <section className="admin-card admin-calendar-card">
      <CustomToolbar date={currentDate} onNavigate={handleNavigate} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultView="month"
        style={{ height: 620 }}
        toolbar={false}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectEvent={(event) => onSelectAppointment(event.id)}
      />
    </section>
  );
}