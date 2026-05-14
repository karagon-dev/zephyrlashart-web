import { useState, useMemo } from 'react';

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

function buildCalendarDays(viewYear: number, viewMonth: number) {
  const year = viewYear;
  const month = viewMonth;

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
  
  // Calculate initial month from first available date
  const getInitialMonth = () => {
    if (availableDates.length === 0) {
      const now = new Date();
      return { year: now.getFullYear(), month: now.getMonth() };
    }
    const firstAvailableDate = new Date(`${availableDates[0]}T00:00:00`);
    return { year: firstAvailableDate.getFullYear(), month: firstAvailableDate.getMonth() };
  };

  const initialMonth = getInitialMonth();
  const [viewMonth, setViewMonth] = useState(initialMonth.month);
  const [viewYear, setViewYear] = useState(initialMonth.year);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const { monthTitle, days } = useMemo(
    () => buildCalendarDays(viewYear, viewMonth),
    [availableDates, viewYear, viewMonth]
  );

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
          <div className="booking-calendar__navigation">
            <button 
              className="booking-calendar__nav-btn booking-calendar__nav-btn--prev"
              onClick={handlePrevMonth}
              type="button"
              aria-label="Mes anterior"
            >
              ‹
            </button>
            <div className="booking-calendar__header">
              <strong>{monthTitle}</strong>
            </div>
            <button 
              className="booking-calendar__nav-btn booking-calendar__nav-btn--next"
              onClick={handleNextMonth}
              type="button"
              aria-label="Próximo mes"
            >
              ›
            </button>
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
