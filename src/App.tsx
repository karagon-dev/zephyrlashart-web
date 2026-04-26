import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero/Hero';
import Services from './sections/Services/Services';
import Gallery from './sections/Gallery/Gallery';
import Booking from './sections/Booking/Booking';
import Testimonials from './sections/Testimonials/Testimonials';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';

function App() {
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

export default App;