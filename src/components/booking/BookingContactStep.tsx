type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type Props = {
  formData: ContactFormData;
  onChange: (field: keyof ContactFormData, value: string) => void;
};

function BookingContactStep({ formData, onChange }: Props) {
  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <div>
          <h3>Your information</h3>
          <p>We’ll use this to confirm your appointment request.</p>
        </div>
      </div>

      <div className="booking-contact-grid">
        <label>
          Full name
          <input
            type="text"
            value={formData.name}
            placeholder="Your name"
            onChange={(event) => onChange('name', event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={formData.email}
            placeholder="Your email"
            onChange={(event) => onChange('email', event.target.value)}
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            value={formData.phone}
            placeholder="Your phone number"
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </label>

        <label className="booking-contact-grid__full">
          Notes
          <textarea
            value={formData.notes}
            placeholder="Example: natural volume, cat eye, brow cleanup..."
            onChange={(event) => onChange('notes', event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default BookingContactStep;