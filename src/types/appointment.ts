export type AppointmentListItem = {
  appointmentKey: number;
  clientKey: number;
  clientName: string;
  clientEmail: string;
  clientPhoneNumber: string;
  serviceTypeKey: number;
  serviceName: string;
  appointmentStatusKey: number;
  appointmentStatusName: string;
  availableSlotKey?: number | null;
  startDateTime: string;
  endDateTime: string;
  notes?: string | null;
  createdDate: string;
};

export type UpdateAppointmentStatusRequest = {
  appointmentStatusKey: number;
};

export type AppointmentDetail = AppointmentListItem & {
  durationMinutes: number;
  price: number;
  serviceIsActive: boolean;
};
