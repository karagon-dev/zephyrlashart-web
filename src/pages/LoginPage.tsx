import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Welcome back</h1>

        <p>Log in to manage your appointments.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <span className="login-error">{error}</span>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </section>
    </main>
  );
}