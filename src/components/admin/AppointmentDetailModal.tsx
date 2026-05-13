import type { AppointmentDetail } from "../../types/appointment";

type AppointmentDetailModalProps = {
  appointment: AppointmentDetail | null;
  isLoading: boolean;
  onClose: () => void;
};

export function AppointmentDetailModal({
  appointment,
  isLoading,
  onClose,
}: AppointmentDetailModalProps) {
  if (!appointment && !isLoading) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <section className="appointment-modal">
        <button type="button" className="modal-close-button" onClick={onClose}>
          ×
        </button>

        {isLoading && <p>Cargando detalles de la cita...</p>}

        {!isLoading && appointment && (
          <>
            <p className="eyebrow">Detalle de cita</p>

            <h2>{appointment.clientName}</h2>

            <div className="appointment-modal-grid">
              <div>
                <span>Servicio</span>
                <strong>{appointment.serviceName}</strong>
              </div>

              <div>
                <span>Estado</span>
                <strong>{appointment.appointmentStatusName}</strong>
              </div>

              <div>
                <span>Correo electrónico</span>
                <strong>{appointment.clientEmail}</strong>
              </div>

              <div>
                <span>Teléfono</span>
                <strong>{appointment.clientPhoneNumber}</strong>
              </div>

              <div>
                <span>Inicio</span>
                <strong>
                  {new Date(appointment.startDateTime).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Fin</span>
                <strong>
                  {new Date(appointment.endDateTime).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Duración</span>
                <strong>{appointment.durationMinutes} minutos</strong>
              </div>

              <div>
                <span>Precio</span>
                <strong>${appointment.price}</strong>
              </div>
            </div>

            <div className="appointment-modal-notes">
              <span>Notas</span>
              <p>{appointment.notes ?? "No se proporcionaron notas."}</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}