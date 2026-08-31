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
        <p className={styles.eyebrow}>Paso 04 · Detalles</p>
        <h3>Tu información</h3>
        <p className={styles.subtitle}>
          Usaremos estos datos solo para confirmar tu solicitud de cita.
          Tu información nunca se comparte.
        </p>
      </div>

      <div className={styles.grid}>
        <label>
          <span className={styles.labelText}>
            Nombre completo <em>*</em>
          </span>
          <input
            type="text"
            value={formData.name}
            placeholder="Tu nombre"
            onChange={(event) => onChange('name', event.target.value)}
          />
        </label>

        <label>
          <span className={styles.labelText}>
            Correo electrónico <em>*</em>
          </span>
          <input
            type="email"
            value={formData.email}
            placeholder="tu@correo.com"
            onChange={(event) => onChange('email', event.target.value)}
          />
        </label>

        <label>
          <span className={styles.labelText}>
            Número de teléfono <em>*</em>
          </span>
          <input
            type="tel"
            value={formData.phone}
            placeholder="+506 0000 0000"
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </label>

        <label className={styles.full}>
          <span className={styles.labelText}>
            Notas para el estudio <small>(opcional)</small>
          </span>
          <textarea
            value={formData.notes}
            placeholder="Ej: volumen natural, ojo de gato, limpieza de cejas..."
            onChange={(event) => onChange('notes', event.target.value)}
          />
        </label>
      </div>

      <div className={styles.note} aria-hidden="true">
        <span className={styles.noteIcon}>✦</span>
        Recibirás una confirmación por WhatsApp o correo en menos de 24 horas.
      </div>
    </div>
  );
}

export default BookingContactStep;