import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Stats from '@/components/Stats/Stats';
import Services from '@/components/Services/Services';
import WhyUs from '@/components/WhyUs/WhyUs';
import Testimonials from '@/components/Testimonials/Testimonials';
import Partners from '@/components/Partners/Partners';
import BlogPreview from '@/components/BlogPreview/BlogPreview';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Testimonials />
      <Partners />
      <BlogPreview />
      <FAQ />
      <Footer />
    </>
  );
}
