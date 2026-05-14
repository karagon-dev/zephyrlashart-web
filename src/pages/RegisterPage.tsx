import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import type { RegisterRequest } from "../types/auth";
import styles from "./AuthPages.module.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login: loginToContext } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const payload: RegisterRequest = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      };

      await register(payload);

      // Auto-login after successful registration
      await loginToContext({
        email,
        password,
      });

      navigate("/");
    } catch {
      setError("No se pudo crear la cuenta. Verifica los datos e inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Crear cuenta</h1>

        <p className={styles.subtitle}>Regístrate para reservar y gestionar tus citas.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nombre

            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>

          <label>
            Apellido

            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </label>

          <label>
            Correo electrónico

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Número de teléfono

            <input
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </label>

          <label>
            Contraseña

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <label>
            Confirmar contraseña

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </label>

          {error && <span className={styles.error}>{error}</span>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className={styles.footerText}>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className={styles.footerLink}>
              Iniciar sesión
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
