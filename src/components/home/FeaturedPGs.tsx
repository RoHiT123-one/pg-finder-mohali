import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import PGCard from '@/components/pg/PGCard';
import { getFeaturedPGs } from '@/db/api';
import type { PG } from '@/types';

export default function FeaturedPGs() {
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPGs() {
      try {
        const data = await getFeaturedPGs(6);
        setPgs(data);
      } catch (error) {
        console.error('Error loading featured PGs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedPGs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured PGs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (pgs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured PGs</h2>
          <p className="text-muted-foreground">
            Handpicked premium accommodations for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <PGCard key={pg.id} pg={pg} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/listings">
            <Button size="lg">View All PGs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
