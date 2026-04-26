import { useMemo, useState } from 'react';

const services = [
  'Classic Lash Extensions',
  'Hybrid Lash Extensions',
  'Volume Lash Extensions',
  'Brow Lamination',
  'Lash Lift & Tint',
];

const bookedSlots = ['10:20 AM', '3:00 PM', '5:40 PM'];

function generateTimeSlots() {
  const slots: string[] = [];
  const start = 9 * 60;
  const end = 20 * 60;
  const appointmentDuration = 60;
  const breakDuration = 20;

  for (
    let minutes = start;
    minutes + appointmentDuration <= end;
    minutes += appointmentDuration + breakDuration
  ) {
    const hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    slots.push(`${hour12}:${minute.toString().padStart(2, '0')} ${period}`);
  }

  return slots;
}

function Booking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  return (
    <section className="section booking-section" id="booking">
      <div className="section__header">
        <p className="eyebrow">Booking</p>
        <h2>Choose your day and preferred time.</h2>
        <p>
          Request an appointment by selecting the service, date, and available
          time. Later this can connect to a real calendar and database.
        </p>
      </div>

      <div className="booking-layout">
        <form className="booking-form">
          <label>
            Full name
            <input type="text" placeholder="Your name" />
          </label>

          <label>
            Service
            <select defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </label>

          <label>
            Preferred date
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value);
                setSelectedTime('');
              }}
            />
          </label>

          <label>
            Notes
            <textarea
              rows={4}
              placeholder="Example: natural volume, cat eye, brow cleanup..."
            />
          </label>

          <button type="button" className="button button--primary">
            Request appointment
          </button>
        </form>

        <div className="time-picker">
          <div>
            <h3>Available hours</h3>
            <p>
              Open from 9:00 AM to 8:00 PM. Each appointment includes a
              20-minute break before the next client.
            </p>
          </div>

          <div className="time-grid">
            {timeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              const isSelected = selectedTime === time;

              return (
                <button
                  type="button"
                  key={time}
                  disabled={!selectedDate || isBooked}
                  className={`time-slot ${isBooked ? 'time-slot--booked' : ''} ${
                    isSelected ? 'time-slot--selected' : ''
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  <strong>{time}</strong>
                  <span>
                    {isBooked
                      ? 'Booked'
                      : isSelected
                        ? 'Selected'
                        : 'Available'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="booking-summary">
            <span>Selected appointment</span>
            <strong>
              {selectedDate && selectedTime
                ? `${selectedDate} · ${selectedTime}`
                : 'Choose a date and time'}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;