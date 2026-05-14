import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <main className="login-page">
      <section className="login-card">
        <h1>Bienvenido de nuevo</h1>

        <p>Inicia sesión para administrar tus citas.</p>

        <form onSubmit={handleSubmit} className="login-form">
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

          {error && <span className="login-error">{error}</span>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem" }}>
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--color-primary)",
                fontWeight: "600",
                textDecoration: "none",
                borderBottom: "2px solid var(--color-primary)",
                paddingBottom: "2px",
              }}
            >
              Crear cuenta
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}