function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <a href="/" className="login-brand">
          Zephyr Lash Art Studio
        </a>

        <p className="eyebrow">Welcome back</p>

        <h1>Sign in to your account.</h1>

        <p className="login-subtitle">
          Access your appointments, booking details, and admin tools.
        </p>

        <form className="login-form">
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" placeholder="Your password" />
          </label>

          <button type="submit">Sign in</button>
        </form>

        <p className="login-footer-text">
          New here? You can request an appointment from the booking section.
        </p>
      </section>
    </main>
  );
}

export default LoginPage;