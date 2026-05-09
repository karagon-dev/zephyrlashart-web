import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAvailableSlots } from '../../services/availableSlotApi';
import { createAppointment } from '../../services/appointmentApi';
import type { AvailableSlot } from '../../types/availableSlot';

const services = [
  { name: 'Classic Lash Extensions', key: 1 },
  { name: 'Hybrid Lash Extensions', key: 2 },
  { name: 'Volume Lash Extensions', key: 3 },
  { name: 'Brow Lamination', key: 4 },
  { name: 'Lash Lift & Tint', key: 5 },
];

function timeStringTo24Hour(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.match(/(\d+):(\d+)\s(AM|PM)/);
  if (!match) return { hours: 0, minutes: 0 };

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3];

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

function isTimeInSlot(
  dateStr: string,
  timeStr: string,
  slot: AvailableSlot
): boolean {
  if (!slot.isAvailable) return false;
  
  const { hours, minutes } = timeStringTo24Hour(timeStr);
  const selectedDateTime = new Date(`${dateStr}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
  const slotStart = new Date(slot.startDateTime);
  const slotEnd = new Date(slot.endDateTime);

  return selectedDateTime >= slotStart && selectedDateTime < slotEnd;
}

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    notes: '',
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Track if this is a guest booking or registered user booking
  // For now, default to guest; this would be determined by authentication context in a real app
  const isRegisteredUser = false;
  const clientKey: number | undefined = undefined;

  const fetchAvailableSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const slots = await getAvailableSlots();
      setAvailableSlots(slots);
    } catch {
      setErrorMessage('Could not load available slots.');
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
      setSelectedTime('');
    }
  }, [selectedDate, fetchAvailableSlots]);

  const availableSlotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return availableSlots.filter((slot) => {
      const slotDate = slot.startDateTime.split('T')[0];
      return slotDate === selectedDate;
    });
  }, [selectedDate, availableSlots]);

  const getSelectedSlot = useCallback(() => {
    if (!selectedDate || !selectedTime) return null;
    return availableSlots.find((slot) => isTimeInSlot(selectedDate, selectedTime, slot));
  }, [selectedDate, selectedTime, availableSlots]);

  const handleFormChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Determine required fields based on user type
    const requiredGuestFields = !isRegisteredUser && (!formData.name || !formData.email || !formData.phone);
    const requiredCommonFields = !formData.service || !selectedDate || !selectedTime;

    if (requiredGuestFields || requiredCommonFields) {
      setErrorMessage('Please fill in all required fields and select a date and time.');
      return;
    }

    const selectedSlot = getSelectedSlot();
    if (!selectedSlot) {
      setErrorMessage('Selected time slot is no longer available.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');

      const selectedService = services.find((s) => s.name === formData.service);
      if (!selectedService) {
        setErrorMessage('Invalid service selected.');
        return;
      }

      // Build payload based on user type
      const appointmentPayload = {
        serviceTypeKey: selectedService.key,
        availableSlotKey: selectedSlot.availableSlotKey,
        notes: formData.notes || undefined,
      } as any;

      if (isRegisteredUser && clientKey) {
        // Registered user: include clientKey
        appointmentPayload.clientKey = clientKey;
      } else {
        // Guest user: include guest client information and set clientKey to null
        appointmentPayload.clientKey = null;
        appointmentPayload.clientName = formData.name;
        appointmentPayload.clientEmail = formData.email;
        appointmentPayload.clientPhoneNumber = formData.phone;
      }

      await createAppointment(appointmentPayload);

      setSuccessMessage('Appointment requested successfully! We will confirm shortly.');
      setFormData({ name: '', email: '', phone: '', service: '', notes: '' });
      setSelectedDate('');
      setSelectedTime('');
    } catch {
      setErrorMessage('Failed to create appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section booking-section" id="booking">
      <div className="section__header">
        <p className="eyebrow">Booking</p>
        <h2>Choose your day and preferred time.</h2>
        <p>
          Request an appointment by selecting the service, date, and available
          time.
        </p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          {successMessage && (
            <div style={{ color: 'green', marginBottom: '1rem' }}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          <label>
            Full name
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
            />
          </label>

          <label>
            Service
            <select
              value={formData.service}
              onChange={(e) => handleFormChange('service', e.target.value)}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.key} value={service.name}>
                  {service.name}
                </option>
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
              }}
            />
          </label>

          <label>
            Notes
            <textarea
              rows={4}
              placeholder="Example: natural volume, cat eye, brow cleanup..."
              value={formData.notes}
              onChange={(e) => handleFormChange('notes', e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="button button--primary"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? 'Requesting...' : 'Request appointment'}
          </button>
        </form>

        <div className="time-picker">
          <div>
            <h3>Available hours</h3>
            <p>
              Open from 9:00 AM to 8:00 PM. Each appointment includes a
              20-minute break before the next client.
            </p>
            {isLoading && <p style={{ color: 'blue' }}>Loading available slots...</p>}
          </div>

          <div className="time-grid">
            {availableSlotsForDate.length === 0 && selectedDate ? (
              <p style={{ gridColumn: '1 / -1', color: '#999' }}>No available slots for this date.</p>
            ) : (
              availableSlotsForDate.map((slot) => {
                const slotStart = new Date(slot.startDateTime);
                const hours = slotStart.getHours();
                const minutes = slotStart.getMinutes();
                const period = hours >= 12 ? 'PM' : 'AM';
                const hour12 = hours % 12 === 0 ? 12 : hours % 12;
                const timeStr = `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
                const isSelected = selectedTime === timeStr && selectedDate === slot.startDateTime.split('T')[0];

                return (
                  <button
                    type="button"
                    key={slot.availableSlotKey}
                    disabled={isLoading}
                    className={`time-slot ${isSelected ? 'time-slot--selected' : ''}`}
                    onClick={() => setSelectedTime(timeStr)}
                  >
                    <strong>{timeStr}</strong>
                    <span>{isSelected ? 'Selected' : 'Available'}</span>
                  </button>
                );
              })
            )}
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