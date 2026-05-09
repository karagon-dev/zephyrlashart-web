import type { AvailableSlot } from "../types/availableSlot";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export async function getAvailableSlots(): Promise<AvailableSlot[]> {
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth() + 3, 0); // 3 months from now
  
  const startDateString = today.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];

  const response = await fetch(
    `${API_BASE_URL}/available-slots?startDate=${startDateString}&endDate=${endDateString}`
  );

  if (!response.ok) {
    throw new Error("Failed to load available slots.");
  }

  return response.json();
}

export async function createAvailableSlot(
  payload: CreateAvailableSlotRequest
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/available-slots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create available slot.");
  }
}

export async function createBatchAvailableSlots(
  payload: CreateBatchAvailableSlotsRequest
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/available-slots/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create batch available slots.");
  }
}

export async function updateAvailableSlot(
  availableSlotKey: number,
  payload: UpdateAvailableSlotRequest
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/available-slots/${availableSlotKey}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update available slot.");
  }
}

export async function markAvailableSlotUnavailable(
  availableSlotKey: number,
  startDateTime: string,
  endDateTime: string
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/available-slots/${availableSlotKey}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDateTime,
        endDateTime,
        isAvailable: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark slot as unavailable.");
  }
}
