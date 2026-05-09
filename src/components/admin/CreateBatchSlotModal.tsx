import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { createBatchAvailableSlots } from "../../services/availableSlotApi";
import type { CreateBatchAvailableSlotsRequest } from "../../services/availableSlotApi";

export type CreateBatchSlotRange = {
  startTime: string;
  endTime: string;
};

type CreateBatchSlotModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: Date;
};

export function CreateBatchSlotModal({
  isOpen,
  onClose,
  currentMonth,
}: CreateBatchSlotModalProps) {
  const [timeRanges, setTimeRanges] = useState<CreateBatchSlotRange[]>([
    { startTime: "09:00", endTime: "10:00" },
  ]);

  const [viewMonth, setViewMonth] = useState<Date>(currentMonth);
  const [selectedDays, setSelectedDays] = useState<Record<string, number[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTimeRangeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const newRanges = [...timeRanges];
    newRanges[index] = { ...newRanges[index], [field]: value };
    setTimeRanges(newRanges);
  };

  const handleAddTimeRange = () => {
    setTimeRanges([...timeRanges, { startTime: "", endTime: "" }]);
  };

  const handleRemoveTimeRange = (index: number) => {
    setTimeRanges(timeRanges.filter((_, i) => i !== index));
  };

  const getMonthKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const monthKey = getMonthKey(viewMonth);
  const currentSelectedDays = selectedDays[monthKey] || [];

  const handleDayToggle = (day: number) => {
    setSelectedDays((prev) => ({
      ...prev,
      [monthKey]: prev[monthKey]?.includes(day)
        ? prev[monthKey].filter((d) => d !== day)
        : [...(prev[monthKey] || []), day],
    }));
  };

  const handleNavigateMonth = (direction: "prev" | "next") => {
    setViewMonth((prev) =>
      direction === "prev"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1)
        : new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all selected days from all months
    const allSelectedDaysEntries = Object.entries(selectedDays);
    if (allSelectedDaysEntries.length === 0 || allSelectedDaysEntries.every(([, days]) => days.length === 0)) {
      alert("Please select at least one day");
      return;
    }

    if (timeRanges.some((r) => !r.startTime || !r.endTime)) {
      alert("Please fill all time ranges");
      return;
    }

    try {
      setIsSubmitting(true);

      // Convert all selected days across all months to date strings (YYYY-MM-DD)
      const slotDates: string[] = [];
      allSelectedDaysEntries.forEach(([monthKey, days]) => {
        const [year, month] = monthKey.split("-");
        days
          .sort((a, b) => a - b)
          .forEach((day) => {
            slotDates.push(
              `${year}-${month}-${String(day).padStart(2, "0")}`
            );
          });
      });

      // Convert time ranges to include seconds (HH:MM:SS)
      const formattedTimeRanges = timeRanges.map((range) => ({
        startTime: `${range.startTime}:00`,
        endTime: `${range.endTime}:00`,
      }));

      const payload: CreateBatchAvailableSlotsRequest = {
        slotDates,
        timeRanges: formattedTimeRanges,
        notes: "Manual batch by selected dates",
      };

      await createBatchAvailableSlots(payload);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create batch slots");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <section className="appointment-modal">
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
        >
          ×
        </button>

        <p className="eyebrow">Batch scheduling</p>
        <h2>Create available slots</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.75rem" }}>
              <strong>Time Ranges</strong>
            </label>
            {timeRanges.map((range, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                  alignItems: "flex-end",
                }}
              >
                <label style={{ flex: 1 }}>
                  Start
                  <input
                    type="time"
                    value={range.startTime}
                    onChange={(e) =>
                      handleTimeRangeChange(index, "startTime", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </label>
                <label style={{ flex: 1 }}>
                  End
                  <input
                    type="time"
                    value={range.endTime}
                    onChange={(e) =>
                      handleTimeRangeChange(index, "endTime", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </label>
                {timeRanges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeRange(index)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(160, 80, 80, 0.2)",
                      border: "1px solid rgba(160, 80, 80, 0.3)",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      color: "var(--color-primary)",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTimeRange}
              style={{
                marginTop: "0.75rem",
                background: "rgba(160, 120, 120, 0.1)",
                border: "1px solid rgba(160, 120, 120, 0.3)",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                color: "var(--color-primary)",
                fontWeight: "600",
                fontSize: "0.85rem",
              }}
            >
              + Add slot
            </button>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.75rem" }}>
              <strong>Select Days in {format(viewMonth, "MMMM yyyy", { locale: enUS })}</strong>
            </label>
            <CalendarPicker
              month={viewMonth}
              selectedDays={currentSelectedDays}
              onDayToggle={handleDayToggle}
              onNavigateMonth={handleNavigateMonth}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create batch"}
          </button>
        </form>
      </section>
    </div>
  );
}

function CalendarPicker({
  month,
  selectedDays,
  onDayToggle,
  onNavigateMonth,
}: {
  month: Date;
  selectedDays: number[];
  onDayToggle: (day: number) => void;
  onNavigateMonth: (direction: "prev" | "next") => void;
}) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfWeek = getDay(monthStart);

  // Create empty cells for days before the month starts
  const emptyCells = Array.from({ length: firstDayOfWeek });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <button
          type="button"
          onClick={() => onNavigateMonth("prev")}
          style={{
            background: "rgba(160, 120, 120, 0.1)",
            border: "1px solid rgba(160, 120, 120, 0.3)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0.75rem",
            cursor: "pointer",
            fontWeight: "600",
            color: "var(--color-primary)",
          }}
        >
          ← Prev
        </button>
        <span style={{ fontWeight: "600", color: "var(--color-primary)" }}>
          {format(month, "MMMM yyyy", { locale: enUS })}
        </span>
        <button
          type="button"
          onClick={() => onNavigateMonth("next")}
          style={{
            background: "rgba(160, 120, 120, 0.1)",
            border: "1px solid rgba(160, 120, 120, 0.3)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0.75rem",
            cursor: "pointer",
            fontWeight: "600",
            color: "var(--color-primary)",
          }}
        >
          Next →
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "0.5rem",
        }}
      >
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              padding: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            {day}
          </div>
        ))}

        {/* Empty cells before month starts */}
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day buttons */}
        {days.map((day) => {
          const dayNum = day.getDate();
          const isSelected = selectedDays.includes(dayNum);

          return (
            <button
              key={dayNum}
              type="button"
              onClick={() => onDayToggle(dayNum)}
              style={{
                padding: "0.65rem",
                borderRadius: "0.5rem",
                border: isSelected
                  ? "2px solid var(--color-primary)"
                  : "1px solid rgba(160, 120, 120, 0.3)",
                background: isSelected
                  ? "rgba(160, 120, 120, 0.15)"
                  : "transparent",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: isSelected ? "700" : "500",
                transition: "all 0.2s ease",
                color: "#333",
              }}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}
