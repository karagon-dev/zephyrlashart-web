import { useState } from "react";
import {
  createAvailableSlot,
  updateAvailableSlot,
  markAvailableSlotUnavailable,
} from "../../services/availableSlotApi";
import { hasOverlappingSlots } from "../../lib/slotValidation";
import type { AvailableSlot } from "../../types/availableSlot";

type AvailableSlotModalProps = {
  selectedRange?: {
    start: Date;
    end: Date;
  } | null;
  selectedSlot?: AvailableSlot | null;
  allSlots: AvailableSlot[];
  onClose: () => void;
  onCreated?: () => void;
};

export function AvailableSlotModal({
  selectedRange,
  selectedSlot,
  allSlots,
  onClose,
  onCreated,
}: AvailableSlotModalProps) {
  const isEditMode = !!selectedSlot;

  if (!selectedRange && !selectedSlot) {
    return null;
  }

  const defaultStart = selectedSlot
    ? toDateTimeLocalValue(new Date(selectedSlot.startDateTime))
    : selectedRange
      ? toDateTimeLocalValue(selectedRange.start)
      : "";

  const defaultEnd = selectedSlot
    ? toDateTimeLocalValue(new Date(selectedSlot.endDateTime))
    : selectedRange
      ? toDateTimeLocalValue(selectedRange.end)
      : "";

  const [startDateTime, setStartDateTime] = useState(defaultStart);
  const [endDateTime, setEndDateTime] = useState(defaultEnd);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    try {
      setIsSubmitting(true);

      // Validate times
      if (new Date(startDateTime) >= new Date(endDateTime)) {
        setErrorMessage("End time must be after start time.");
        return;
      }

      // Check for overlapping slots
      const slotData = { startDateTime, endDateTime };
      if (
        hasOverlappingSlots(
          slotData,
          allSlots,
          selectedSlot?.availableSlotKey
        )
      ) {
        setErrorMessage(
          "This time slot overlaps with an existing slot. Please choose a different time."
        );
        return;
      }

      if (isEditMode && selectedSlot) {
        await updateAvailableSlot(selectedSlot.availableSlotKey, {
          startDateTime,
          endDateTime,
          isAvailable: selectedSlot.isAvailable,
        });
      } else {
        await createAvailableSlot(slotData);
      }

      onCreated?.();
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!selectedSlot) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await markAvailableSlotUnavailable(
        selectedSlot.availableSlotKey,
        selectedSlot.startDateTime,
        selectedSlot.endDateTime
      );

      onCreated?.();
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to mark slot as unavailable."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <section className="appointment-modal">
        <button type="button" className="modal-close-button" onClick={onClose}>
          ×
        </button>

        <p className="eyebrow">Available slot</p>

        <h2>{isEditMode ? "Edit available slot" : "Create available slot"}</h2>

        {errorMessage && (
          <p style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
            {errorMessage}
          </p>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Start
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(event) => setStartDateTime(event.target.value)}
              required
            />
          </label>

          <label>
            End
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(event) => setEndDateTime(event.target.value)}
              required
            />
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" disabled={isSubmitting} style={{ flex: 1 }}>
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update slot"
                  : "Create slot"}
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                style={{
                  background: "rgba(160, 80, 80, 0.2)",
                  color: "var(--color-primary)",
                  border: "1px solid rgba(160, 80, 80, 0.3)",
                }}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

function toDateTimeLocalValue(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}