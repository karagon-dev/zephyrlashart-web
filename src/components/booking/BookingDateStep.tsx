type Props = {
  availableDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  isLoading: boolean;
};

function getDateKey(date: Date) {
  return date.toISOString().split('T')[0];
}

function formatMonthTitle(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function buildCalendarDays(availableDates: string[]) {
  const fallbackDate = new Date();
  const firstAvailableDate = availableDates[0]
    ? new Date(`${availableDates[0]}T00:00:00`)
    : fallbackDate;

  const year = firstAvailableDate.getFullYear();
  const month = firstAvailableDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startOffset = firstDayOfMonth.getDay();

  const days = [];

  for (let i = 0; i < startOffset; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDayOfMonth.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return {
    monthTitle: formatMonthTitle(firstDayOfMonth),
    days,
  };
}

function BookingDateStep({ availableDates, selectedDate, onSelectDate, isLoading }: Props) {
  const availableDateSet = new Set(availableDates);
  const { monthTitle, days } = buildCalendarDays(availableDates);

  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <div>
          <h3>Elige una fecha</h3>
          <p>Las fechas disponibles están resaltadas.</p>
        </div>
      </div>

      {isLoading && <p className="booking-muted">Cargando fechas disponibles...</p>}

      {!isLoading && availableDates.length === 0 && (
        <p className="booking-muted">No se encontraron fechas disponibles.</p>
      )}

      {!isLoading && availableDates.length > 0 && (
        <div className="booking-calendar">
          <div className="booking-calendar__header">
            <strong>{monthTitle}</strong>
          </div>

          <div className="booking-calendar__weekdays">
            <span>Dom</span>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
          </div>

          <div className="booking-calendar__grid">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="booking-calendar__empty" />;
              }

              const dateKey = getDateKey(date);
              const isAvailable = availableDateSet.has(dateKey);
              const isSelected = selectedDate === dateKey;

              return (
                <button
                  key={dateKey}
                  type="button"
                  disabled={!isAvailable}
                  className={[
                    'booking-calendar__day',
                    isAvailable ? 'booking-calendar__day--available' : '',
                    isSelected ? 'booking-calendar__day--selected' : '',
                  ].join(' ')}
                  onClick={() => onSelectDate(dateKey)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingDateStep;