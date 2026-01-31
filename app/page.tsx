import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import SamplesSection from '@/components/landing/SamplesSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Additional sections will be added here */}
      <div style={{ height: '100vh', background: 'var(--background)' }}>
        {/* Placeholder for scroll testing */}
      </div>
    </main>
  );
}
