import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AppointmentCalendar } from "../components/admin/AppointmentCalendar";
import { AppointmentDetailModal } from "../components/admin/AppointmentDetailModal";
import { AvailableSlotModal } from "../components/admin/AvailableSlotModal";
import {
  getAppointments,
  getAppointmentByKey,
} from "../services/appointmentApi";
import { getAvailableSlots } from "../services/availableSlotApi";
import type {
  AppointmentDetail,
  AppointmentListItem,
} from "../types/appointment";
import type { AvailableSlot } from "../types/availableSlot";

export function AdminCalendarPage() {
  const [appointments, setAppointments] = useState<AppointmentListItem[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDetail | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [selectedSlotRange, setSelectedSlotRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedAvailableSlot, setSelectedAvailableSlot] =
    useState<AvailableSlot | null>(null);

  const displayedAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.appointmentStatusKey !== 3),
    [appointments]
  );

  async function loadDashboardData() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [appointmentsData, availableSlotsData] = await Promise.all([
        getAppointments(),
        getAvailableSlots(),
      ]);

      setAppointments(appointmentsData);
      setAvailableSlots(availableSlotsData);
    } catch {
      setErrorMessage("No se pudieron cargar los datos del calendario.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSelectAppointment(appointmentKey: number) {
    try {
      setIsModalLoading(true);
      setSelectedAppointment(null);

      const data = await getAppointmentByKey(appointmentKey);
      setSelectedAppointment(data);
    } catch {
      setErrorMessage("No se pudieron cargar los detalles de la cita.");
    } finally {
      setIsModalLoading(false);
    }
  }

  function handleSelectEmptySlot(start: Date, end: Date) {
    setSelectedSlotRange({ start, end });
  }

  function handleSelectAvailableSlot(availableSlotKey: number) {
    const slot = availableSlots.find(
      (s) => s.availableSlotKey === availableSlotKey
    );
    if (slot) {
      setSelectedAvailableSlot(slot);
    }
  }

  useEffect(() => {
    void loadDashboardData();
  }, []);

  return (
    <AdminLayout title="Calendario" eyebrow="Descripción del cronograma">
      {errorMessage && <p className="admin-state">{errorMessage}</p>}
      {isLoading && <p className="admin-state">Cargando calendario...</p>}

      <AppointmentCalendar
        appointments={displayedAppointments}
        availableSlots={availableSlots}
        onSelectAppointment={handleSelectAppointment}
        onSelectAvailableSlot={handleSelectAvailableSlot}
        onSelectEmptySlot={handleSelectEmptySlot}
      />

      <AppointmentDetailModal
        appointment={selectedAppointment}
        isLoading={isModalLoading}
        onClose={() => setSelectedAppointment(null)}
      />

      <AvailableSlotModal
        selectedRange={selectedSlotRange || undefined}
        selectedSlot={selectedAvailableSlot}
        allSlots={availableSlots}
        onClose={() => {
          setSelectedSlotRange(null);
          setSelectedAvailableSlot(null);
        }}
        onCreated={loadDashboardData}
      />
    </AdminLayout>
  );
}
