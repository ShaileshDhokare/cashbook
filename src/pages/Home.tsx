import { Header } from '@/components/content/Header';
import { HeroSection } from '@/components/content/HeroSection';
import { FeatureCard } from '@/components/content/FeatureCard';
import { BookOpen, PieChart, ClipboardList } from 'lucide-react';
import Footer from '@/components/content/Footer';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header displayLogin />
      <div className='mt-16'>
        <HeroSection />

        <section className='px-6 py-16 max-w-6xl mx-auto'>
          <h2 className='text-2xl font-bold mb-8 text-center'>
            Feature Highlights
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <FeatureCard
              icon={BookOpen}
              title='Organize Expenses by Book'
              description='Create custom categories for home, car, and more.'
            />
            <FeatureCard
              icon={PieChart}
              title='Track Spending with Categories'
              description='Visualize where your money goes with custom tags.'
            />
            <FeatureCard
              icon={ClipboardList}
              title='Easy Data Entry'
              description='Quickly add transactions on the go.'
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
