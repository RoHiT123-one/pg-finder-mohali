import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import PGCard from '@/components/pg/PGCard';
import PGFiltersComponent from '@/components/pg/PGFilters';
import { getPGs } from '@/db/api';
import { ArrowLeft } from 'lucide-react';
import type { PG, PGFilters } from '@/types';

export default function AreaPage() {
  const { area } = useParams<{ area: string }>();
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PGFilters>({});

  const areaNameMap: Record<string, string> = {
    'phase-5': 'Phase 5',
    'phase-7': 'Phase 7',
    'kharar': 'Kharar',
    'landran': 'Landran',
    'sector-70': 'Sector 70',
    'sector-71': 'Sector 71',
  };

  const areaName = area ? areaNameMap[area] : '';

  useEffect(() => {
    if (areaName) {
      loadPGs();
    }
  }, [areaName, filters]);

  async function loadPGs() {
    setLoading(true);
    try {
      const data = await getPGs({ ...filters, area: areaName }, 50);
      setPgs(data);
    } catch (error) {
      console.error('Error loading PGs:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFiltersChange = (newFilters: PGFilters) => {
    setFilters(newFilters);
  };

  if (!areaName) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-muted-foreground">Area not found</p>
        <Link to="/listings">
          <Button className="mt-4">View All PGs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/listings">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Listings
        </Button>
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-2">PG in {areaName}, Mohali</h1>
      <p className="text-muted-foreground mb-8">
        Find the best PG accommodations in {areaName}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <PGFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        </div>

        {/* PG Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-96 bg-muted" />
              ))}
            </div>
          ) : pgs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No PGs found in {areaName}. Try adjusting your filters or check other areas.
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">
                Showing {pgs.length} {pgs.length === 1 ? 'result' : 'results'} in {areaName}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pgs.map((pg) => (
                  <PGCard key={pg.id} pg={pg} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
