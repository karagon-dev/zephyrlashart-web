import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./AuthPages.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const loggedUser = await login({
        email,
        password,
      });

      const roleName = loggedUser.roleName?.toLowerCase();

      if (roleName === "admin") {
        navigate("/admin/calendar");
      } else {
        navigate("/");
      }
    } catch {
      setError("Correo electrónico o contraseña inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Bienvenido de nuevo</h1>

        <p className={styles.subtitle}>Inicia sesión para administrar tus citas.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            Contraseña

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <span className={styles.error}>{error}</span>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <p className={styles.footerText}>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className={styles.footerLink}>
              Crear cuenta
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}