import { useCallback, useEffect, useMemo, useState } from 'react';
import BookingContactStep from '../../components/booking/BookingContactStep';
import BookingDateStep from '../../components/booking/BookingDateStep';
import BookingServiceStep from '../../components/booking/BookingServiceStep';
import BookingTimeStep from '../../components/booking/BookingTimeStep';
import { createAppointment } from '../../services/appointmentApi';
import { getAvailableSlots } from '../../services/availableSlotApi';
import type { AvailableSlot } from '../../types/availableSlot';

export type BookingService = {
  key: number;
  name: string;
  duration: string;
  description: string;
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const services: BookingService[] = [
  { key: 1, name: 'Extensiones de pestañas clásicas', duration: '2h', description: 'Mejora de pestañas natural y elegante.' },
  { key: 2, name: 'Extensiones de pestañas híbridas', duration: '2h 30m', description: 'Una mezcla suave de pestañas clásicas y de volumen.' },
  { key: 3, name: 'Extensiones de pestañas de volumen', duration: '3h', description: 'Mirada de pestañas más completa y dramática.' },
  { key: 4, name: 'Laminación de cejas', duration: '1h', description: 'Cejas definidas, levantadas y pulidas.' },
  { key: 5, name: 'Levantamiento y tinte de pestañas', duration: '1h 30m', description: 'Pestañas naturales levantadas con tinte.' },
];

const totalSteps = 4;

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAvailableSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const slots = await getAvailableSlots();
      setAvailableSlots(slots);
    } catch {
      setErrorMessage('No se pudieron cargar los espacios disponibles.');
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailableSlots();
  }, [fetchAvailableSlots]);

  const availableDates = useMemo(() => {
    const dates = new Set(
      availableSlots
        .filter((slot) => slot.isAvailable)
        .map((slot) => slot.startDateTime.split('T')[0])
    );

    return Array.from(dates).sort();
  }, [availableSlots]);

  const availableSlotsForDate = useMemo(() => {
    if (!selectedDate) return [];

    return availableSlots.filter((slot) => {
      const slotDate = slot.startDateTime.split('T')[0];
      return slotDate === selectedDate && slot.isAvailable;
    });
  }, [selectedDate, availableSlots]);

  const canGoNext =
    (currentStep === 1 && selectedService) ||
    (currentStep === 2 && selectedDate) ||
    (currentStep === 3 && selectedSlot) ||
    (currentStep === 4 && formData.name && formData.email && formData.phone);

  const handleNext = () => {
    if (!canGoNext) {
      setErrorMessage('Por favor completa este paso antes de continuar.');
      return;
    }

    setErrorMessage('');
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleFormChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedSlot) {
      setErrorMessage('Por favor completa los detalles de tu reserva.');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage('Por favor completa tu información de contacto.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      await createAppointment({
        clientKey: null,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhoneNumber: formData.phone,
        serviceTypeKey: selectedService.key,
        availableSlotKey: selectedSlot.availableSlotKey,
        notes: formData.notes || undefined,
      });

      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
      setCurrentStep(1);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedSlot(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: '',
      });

      await fetchAvailableSlots();
    } catch {
      setErrorMessage('Failed to create appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section booking-section" id="booking">
      <div className="container booking-container">
        {showSuccessToast && (
          <div className="booking-toast booking-toast--success">
            <div className="booking-toast__icon">✓</div>

            <div>
              <strong>Solicitud de cita enviada exitosamente</strong>
              <p>Te contactaremos pronto para confirmar tu reserva.</p>
            </div>
          </div>
        )}
        <div className="booking-header">
          <p className="eyebrow">Reservas</p>
          <h2>Reserva tu cita</h2>
          <p>Elige tu servicio, fecha y hora. Luego envía tu solicitud.</p>
        </div>

        {errorMessage && <div className="form-message form-message--error">{errorMessage}</div>}

        <div className="booking-wizard">
          <div className="booking-progress">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="booking-progress__bar">
              <div style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
          </div>

          <div className="booking-wizard__content">
            {currentStep === 1 && (
              <BookingServiceStep
                services={services}
                selectedService={selectedService}
                onSelectService={setSelectedService}
              />
            )}

            {currentStep === 2 && (
              <BookingDateStep
                availableDates={availableDates}
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                isLoading={isLoading}
              />
            )}

            {currentStep === 3 && (
              <BookingTimeStep
                selectedDate={selectedDate}
                availableSlots={availableSlotsForDate}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                isLoading={isLoading}
              />
            )}

            {currentStep === 4 && (
              <BookingContactStep formData={formData} onChange={handleFormChange} />
            )}
          </div>

          <div className="booking-actions">
            {currentStep > 1 && (
              <button type="button" className="button button--secondary" onClick={handleBack}>
                Atrás
              </button>
            )}

            {currentStep < totalSteps && (
              <button type="button" className="button button--primary" onClick={handleNext}>
                Siguiente
              </button>
            )}

            {currentStep === totalSteps && (
              <button
                type="button"
                className="button button--primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud de reserva'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;