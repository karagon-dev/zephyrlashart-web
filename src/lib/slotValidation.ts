import type { AvailableSlot } from "../types/availableSlot";

export function hasOverlappingSlots(
  newSlot: { startDateTime: string; endDateTime: string },
  existingSlots: AvailableSlot[],
  excludeSlotKey?: number
): boolean {
  const newStart = new Date(newSlot.startDateTime).getTime();
  const newEnd = new Date(newSlot.endDateTime).getTime();

  return existingSlots.some((slot) => {
    // Only check against available slots (not marked as unavailable with isAvailable === false)
    if (!slot.isAvailable) {
      return false;
    }

    // Skip the slot being edited
    if (excludeSlotKey !== undefined && slot.availableSlotKey === excludeSlotKey) {
      return false;
    }

    const existingStart = new Date(slot.startDateTime).getTime();
    const existingEnd = new Date(slot.endDateTime).getTime();

    // Check for overlap: new slot starts before existing slot ends AND new slot ends after existing slot starts
    return newStart < existingEnd && newEnd > existingStart;
  });
}
