import HeroSection from '@/components/home/HeroSection';
import FeaturedPGs from '@/components/home/FeaturedPGs';
import PopularLocations from '@/components/home/PopularLocations';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedPGs />
      <PopularLocations />
      <WhyChooseUs />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Browse through hundreds of verified listings and connect directly with owners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings">
              <Button size="lg" variant="secondary">
                Browse All PGs
              </Button>
            </Link>
            {/* <Link to="/list-your-pg">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                List Your PG
              </Button>
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
