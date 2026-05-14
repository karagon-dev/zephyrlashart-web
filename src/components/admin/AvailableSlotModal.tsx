import { useState } from "react";
import {
  createAvailableSlot,
  updateAvailableSlot,
  markAvailableSlotUnavailable,
} from "../../services/availableSlotApi";
import { hasOverlappingSlots } from "../../lib/slotValidation";
import type { AvailableSlot } from "../../types/availableSlot";
import modalStyles from "./Modals.module.css";
import authStyles from "../../pages/AuthPages.module.css";

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
        setErrorMessage("La hora de finalización debe ser después de la hora de inicio.");
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
          "Este espacio de tiempo se superpone con un espacio existente. Por favor elige una hora diferente."
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
        error instanceof Error ? error.message : "Ocurrió un error."
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
        error instanceof Error ? error.message : "Error al marcar el espacio como no disponible."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={modalStyles.backdrop}>
      <section className={modalStyles.modal}>
        <button type="button" className={modalStyles.closeButton} onClick={onClose}>
          ×
        </button>

        <p className="eyebrow">Espacio disponible</p>

        <h2>{isEditMode ? "Editar espacio disponible" : "Crear espacio disponible"}</h2>

        {errorMessage && (
          <p style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
            {errorMessage}
          </p>
        )}

        <form className={authStyles.form} onSubmit={handleSubmit}>
          <label>
            Inicio
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(event) => setStartDateTime(event.target.value)}
              required
            />
          </label>

          <label>
            Fin
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
                  ? "Actualizando..."
                  : "Creando..."
                : isEditMode
                  ? "Actualizar espacio"
                  : "Crear espacio"}
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
                {isSubmitting ? "Eliminando..." : "Eliminar"}
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