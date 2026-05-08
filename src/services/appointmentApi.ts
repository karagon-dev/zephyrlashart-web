import type {
  AppointmentListItem,
  UpdateAppointmentStatusRequest,
  AppointmentDetail ,
} from "../types/appointment";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAppointments(): Promise<AppointmentListItem[]> {
  const response = await fetch(`${API_BASE_URL}/appointments`);

  if (!response.ok) {
    throw new Error("Failed to load appointments.");
  }

  return response.json();
}

export async function updateAppointmentStatus(
  appointmentKey: number,
  payload: UpdateAppointmentStatusRequest
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/appointments/${appointmentKey}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update appointment status.");
  }
}

export async function getAppointmentByKey(
  appointmentKey: number
): Promise<AppointmentDetail> {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentKey}`);

  if (!response.ok) {
    throw new Error("Failed to load appointment details.");
  }

  return response.json();
}