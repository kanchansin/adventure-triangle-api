import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import BetaForm from "./components/Registration/BetaForm";
import PartnerSection from "./components/Registration/PartnerSection";
import LaunchEvent from "./components/Registration/LaunchEvent";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <BetaForm />
      <LaunchEvent />
      <PartnerSection />

      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © 2025 Adventure Triangle. All rights reserved. | <a href="#" style={{ color: 'white' }}>Legal</a> | <a href="#" style={{ color: 'white' }}>Contact</a>
        </p>
      </footer>
    </main>
  );
}
