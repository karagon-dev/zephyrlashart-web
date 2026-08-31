import { clientApi } from "./clientApi";
import type { AvailableSlot } from "../types/availableSlot";

export type CreateAvailableSlotRequest = {
  startDateTime: string;
  endDateTime: string;
};

export type UpdateAvailableSlotRequest = {
  startDateTime: string;
  endDateTime: string;
  isAvailable: boolean;
};

export type CreateBatchAvailableSlotsRequest = {
  slotDates: string[];
  timeRanges: Array<{
    startTime: string;
    endTime: string;
  }>;
  notes: string;
};

function threeMonthRangeQuery(): string {
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
  const startDateString = today.toISOString().split("T")[0];
  const endDateString = endDate.toISOString().split("T")[0];

  return `startDate=${startDateString}&endDate=${endDateString}`;
}

export function getAvailableSlots(): Promise<AvailableSlot[]> {
  return clientApi<AvailableSlot[]>(
    `/available-slots?${threeMonthRangeQuery()}`
  );
}

export function getPublicAvailableSlots(): Promise<AvailableSlot[]> {
  return clientApi<AvailableSlot[]>(
    `/available-slots/public?${threeMonthRangeQuery()}`
  );
}

export function createAvailableSlot(
  payload: CreateAvailableSlotRequest
): Promise<void> {
  return clientApi<void>("/available-slots", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createBatchAvailableSlots(
  payload: CreateBatchAvailableSlotsRequest
): Promise<void> {
  return clientApi<void>("/available-slots/batch", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAvailableSlot(
  availableSlotKey: number,
  payload: UpdateAvailableSlotRequest
): Promise<void> {
  return clientApi<void>(`/available-slots/${availableSlotKey}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function markAvailableSlotUnavailable(
  availableSlotKey: number,
  startDateTime: string,
  endDateTime: string
): Promise<void> {
  return clientApi<void>(`/available-slots/${availableSlotKey}`, {
    method: "PUT",
    body: JSON.stringify({
      startDateTime,
      endDateTime,
      isAvailable: false,
    }),
  });
}
