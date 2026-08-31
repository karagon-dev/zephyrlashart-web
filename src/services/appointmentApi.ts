import { clientApi } from "./clientApi";
import type {
  AppointmentListItem,
  UpdateAppointmentStatusRequest,
  AppointmentDetail,
} from "../types/appointment";

export type CreateAppointmentRequest = {
  clientKey?: number | null;
  clientName?: string;
  clientEmail?: string;
  clientPhoneNumber?: string;
  serviceTypeKey: number;
  availableSlotKey: number;
  notes?: string;
};

export function getAppointments(): Promise<AppointmentListItem[]> {
  return clientApi<AppointmentListItem[]>("/appointments");
}

export function updateAppointmentStatus(
  appointmentKey: number,
  payload: UpdateAppointmentStatusRequest
): Promise<void> {
  return clientApi<void>(`/appointments/${appointmentKey}/status`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function getAppointmentByKey(
  appointmentKey: number
): Promise<AppointmentDetail> {
  return clientApi<AppointmentDetail>(`/appointments/${appointmentKey}`);
}

export function createAppointment(
  payload: CreateAppointmentRequest
): Promise<AppointmentListItem> {
  return clientApi<AppointmentListItem>("/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
