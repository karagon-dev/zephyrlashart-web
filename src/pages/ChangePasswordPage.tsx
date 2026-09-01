import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../services/authApi";
import { PASSWORD_MIN_LENGTH } from "../constants/password";
import styles from "./AuthPages.module.css";

export function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      setError(`La contraseña nueva debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      navigate("/");
    } catch {
      setError("No se pudo cambiar la contraseña. Verifica la contraseña actual.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Cambiar contraseña</h1>

        <p className={styles.subtitle}>
          Ingresa tu contraseña actual y la nueva.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Contraseña actual

            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
            />
          </label>

          <label>
            Contraseña nueva

            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={PASSWORD_MIN_LENGTH}
              required
            />
          </label>

          <label>
            Confirmar contraseña nueva

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={PASSWORD_MIN_LENGTH}
              required
            />
          </label>

          {error && <span className={styles.error}>{error}</span>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar contraseña"}
          </button>

          <p className={styles.footerText}>
            <Link to="/" className={styles.footerLink}>
              Volver al inicio
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
