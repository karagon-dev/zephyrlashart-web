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

        {isLoading && <p>Loading appointment details...</p>}

        {!isLoading && appointment && (
          <>
            <p className="eyebrow">Appointment detail</p>

            <h2>{appointment.clientName}</h2>

            <div className="appointment-modal-grid">
              <div>
                <span>Service</span>
                <strong>{appointment.serviceName}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{appointment.appointmentStatusName}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{appointment.clientEmail}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{appointment.clientPhoneNumber}</strong>
              </div>

              <div>
                <span>Start</span>
                <strong>
                  {new Date(appointment.startDateTime).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>End</span>
                <strong>
                  {new Date(appointment.endDateTime).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>{appointment.durationMinutes} minutes</strong>
              </div>

              <div>
                <span>Price</span>
                <strong>${appointment.price}</strong>
              </div>
            </div>

            <div className="appointment-modal-notes">
              <span>Notes</span>
              <p>{appointment.notes ?? "No notes provided."}</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}