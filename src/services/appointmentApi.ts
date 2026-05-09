import type {
  AppointmentListItem,
  UpdateAppointmentStatusRequest,
  AppointmentDetail ,
} from "../types/appointment";

export type CreateAvailableSlotRequest = {
  startDateTime: string;
  endDateTime: string;
};

export type CreateAppointmentRequest = {
  clientKey?: number | null;
  clientName?: string;
  clientEmail?: string;
  clientPhoneNumber?: string;
  serviceTypeKey: number;
  availableSlotKey: number;
  notes?: string;
};

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

export async function createAppointment(
  payload: CreateAppointmentRequest
): Promise<AppointmentListItem> {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create appointment.");
  }

  return response.json();
}

export async function createAvailableSlot(
  payload: CreateAvailableSlotRequest
) {
  const response = await fetch(
    `${API_BASE_URL}/available-slots`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create available slot.");
  }

  return response.json();
}