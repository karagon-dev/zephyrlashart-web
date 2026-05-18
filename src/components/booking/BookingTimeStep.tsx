import type { AvailableSlot } from '../../types/availableSlot';
import styles from './BookingTimeStep.module.css';

type Props = {
  selectedDate: string;
  availableSlots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  onSelectSlot: (slot: AvailableSlot) => void;
  isLoading: boolean;
};

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

type Period = 'morning' | 'afternoon' | 'evening';

const periodLabels: Record<Period, string> = {
  morning: 'Mañana',
  afternoon: 'Tarde',
  evening: 'Noche',
};

function getPeriod(dateTime: string): Period {
  const hour = new Date(dateTime).getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

function formatLongDate(date: string) {
  if (!date) return '';
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function BookingTimeStep({
  selectedDate,
  availableSlots,
  selectedSlot,
  onSelectSlot,
  isLoading,
}: Props) {
  const grouped = availableSlots.reduce<Record<Period, AvailableSlot[]>>(
    (acc, slot) => {
      const p = getPeriod(slot.startDateTime);
      acc[p].push(slot);
      return acc;
    },
    { morning: [], afternoon: [], evening: [] }
  );

  const periods: Period[] = ['morning', 'afternoon', 'evening'];

  return (
    <div className={styles.step}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Paso 03 · Hora</p>
        <h3>Elige una hora</h3>
        <p className={styles.subtitle}>
          {selectedDate
            ? `Espacios disponibles para el ${formatLongDate(selectedDate)}.`
            : 'Selecciona una fecha primero para ver los horarios.'}
        </p>
      </div>

      {!selectedDate && <p className={styles.muted}>Selecciona una fecha primero.</p>}

      {selectedDate && isLoading && <p className={styles.muted}>Cargando horarios...</p>}

      {selectedDate && !isLoading && availableSlots.length === 0 && (
        <p className={styles.muted}>No hay horarios disponibles para esta fecha.</p>
      )}

      {selectedDate && !isLoading && availableSlots.length > 0 && (
        <div className={styles.groups}>
          {periods.map((p) =>
            grouped[p].length === 0 ? null : (
              <div key={p} className={styles.group}>
                <div className={styles.groupHeader}>
                  <span className={styles.groupDot} aria-hidden="true" />
                  <span className={styles.groupLabel}>{periodLabels[p]}</span>
                  <span className={styles.groupCount}>{grouped[p].length} espacios</span>
                </div>

                <div className={styles.grid}>
                  {grouped[p].map((slot) => {
                    const isSelected =
                      selectedSlot?.availableSlotKey === slot.availableSlotKey;

                    return (
                      <button
                        type="button"
                        key={slot.availableSlotKey}
                        className={`${styles.pill} ${isSelected ? styles.pillSelected : ''}`}
                        onClick={() => onSelectSlot(slot)}
                        aria-pressed={isSelected}
                      >
                        <strong>{formatTime(slot.startDateTime)}</strong>
                        <span>Disponible</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default BookingTimeStep;