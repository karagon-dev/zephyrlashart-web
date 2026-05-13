import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AppointmentDetailModal } from "../components/admin/AppointmentDetailModal";
import {
  getAppointments,
  updateAppointmentStatus,
  getAppointmentByKey,
} from "../services/appointmentApi";
import type {
  AppointmentDetail,
  AppointmentListItem,
} from "../types/appointment";

const STATUS = {
  pending: 1,
  confirmed: 2,
  rejected: 3,
  completed: 4,
  cancelled: 5,
  noShow: 6,
};

type StatusFilter = "all" | "pending" | "confirmed" | "rejected";

export function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentListItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDetail | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const filteredAppointments = useMemo(() => {
    if (statusFilter === "all") {
      return appointments;
    }

    const statusKeyByFilter = {
      pending: STATUS.pending,
      confirmed: STATUS.confirmed,
      rejected: STATUS.rejected,
    };

    return appointments.filter(
      (appointment) =>
        appointment.appointmentStatusKey === statusKeyByFilter[statusFilter]
    );
  }, [appointments, statusFilter]);

  async function loadAppointments() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAppointments();
      setAppointments(data);
    } catch {
      setErrorMessage("No se pudieron cargar las citas.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusUpdate(
    appointmentKey: number,
    appointmentStatusKey: number
  ) {
    try {
      setErrorMessage("");

      await updateAppointmentStatus(appointmentKey, {
        appointmentStatusKey,
      });

      await loadAppointments();
    } catch {
      setErrorMessage("No se pudo actualizar el estado de la cita.");
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

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    void loadAppointments();
  }, []);

  return (
    <AdminLayout title="Solicitudes de citas" eyebrow="Administrar reservas">
      <section className="admin-toolbar">
        <div className="admin-filters">
          <button
            type="button"
            className={statusFilter === "all" ? "is-active" : ""}
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </button>

          <button
            type="button"
            className={statusFilter === "pending" ? "is-active" : ""}
            onClick={() => setStatusFilter("pending")}
          >
            Pendiente
          </button>

          <button
            type="button"
            className={statusFilter === "confirmed" ? "is-active" : ""}
            onClick={() => setStatusFilter("confirmed")}
          >
            Confirmado
          </button>

          <button
            type="button"
            className={statusFilter === "rejected" ? "is-active" : ""}
            onClick={() => setStatusFilter("rejected")}
          >
            Rechazado
          </button>
        </div>
      </section>

      <section className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {errorMessage && <div className="admin-error-message" style={{color: "red", padding: "10px"}}>{errorMessage}</div>} {isLoading && (
              <tr>
                <td colSpan={6} className="admin-empty-row">
                  Cargando citas...
                </td>
              </tr>
            )}

            {!isLoading && filteredAppointments.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-empty-row">
                  No se encontraron citas.
                </td>
              </tr>
            )}

            {!isLoading &&
              filteredAppointments.map((appointment) => {
                return (
                  <tr
                    key={appointment.appointmentKey}
                    className="admin-table-row"
                    onClick={() =>
                      handleSelectAppointment(appointment.appointmentKey)
                    }
                  >
                    <td>
                      <strong>{appointment.clientName}</strong>
                      <span>{appointment.clientEmail}</span>
                      <span>{appointment.clientPhoneNumber}</span>
                    </td>

                    <td>{appointment.serviceName}</td>

                    <td>{formatDate(appointment.startDateTime)}</td>

                    <td>
                      <span
                        className={`status-badge ${appointment.appointmentStatusName.toLowerCase()}`}
                      >
                        {appointment.appointmentStatusName}
                      </span>
                    </td>

                    <td>{appointment.notes ?? "-"}</td>

                    <td>
                      <div
                        className="admin-actions"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.appointmentKey,
                              STATUS.confirmed
                            )
                          }
                        >
                          Confirmar
                        </button>

                        <button
                          type="button"
                          className="button-secondary"
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.appointmentKey,
                              STATUS.rejected
                            )
                          }
                        >
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>

      <AppointmentDetailModal
        appointment={selectedAppointment}
        isLoading={isModalLoading}
        onClose={() => setSelectedAppointment(null)}
      />
    </AdminLayout>
  );
}
