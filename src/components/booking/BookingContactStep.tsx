import styles from './BookingContactStep.module.css';

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
    <div className={styles.step}>
      <div className={styles.header}>
        <div>
          <h3>Tu información</h3>
          <p>Usaremos esto para confirmar tu solicitud de cita.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <label>
          Nombre completo
          <input
            type="text"
            value={formData.name}
            placeholder="Tu nombre"
            onChange={(event) => onChange('name', event.target.value)}
          />
        </label>

        <label>
          Correo electrónico
          <input
            type="email"
            value={formData.email}
            placeholder="Tu correo electrónico"
            onChange={(event) => onChange('email', event.target.value)}
          />
        </label>

        <label>
          Número de teléfono
          <input
            type="tel"
            value={formData.phone}
            placeholder="Tu número de teléfono"
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </label>

        <label className={styles.full}>
          Notas
          <textarea
            value={formData.notes}
            placeholder="Ejemplo: volumen natural, ojo de gato, limpieza de cejas..."
            onChange={(event) => onChange('notes', event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default BookingContactStep;