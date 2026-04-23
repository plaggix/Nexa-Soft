import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import WhyUs from '../components/WhyUs';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
