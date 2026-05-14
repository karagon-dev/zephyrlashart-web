import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero/Hero";
import Services from "./sections/Services/Services";
import Gallery from "./sections/Gallery/Gallery";
import Booking from "./sections/Booking/Booking";
import Testimonials from "./sections/Testimonials/Testimonials";
import Contact from "./sections/Contact/Contact";
import Footer from "./sections/Footer/Footer";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminAppointmentsPage } from "./pages/AdminAppointmentsPage";
import { AdminCalendarPage } from "./pages/AdminCalendarPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Gallery />
        <Booking />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin/calendar"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminCalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminAppointmentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;