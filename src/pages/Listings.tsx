import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import PGCard from '@/components/pg/PGCard';
import PGFiltersComponent from '@/components/pg/PGFilters';
import { getPGs } from '@/db/api';
import type { PG, PGFilters } from '@/types';

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PGFilters>({
    area: searchParams.get('area') || undefined,
    gender_type: searchParams.get('gender_type') || undefined,
    max_rent: searchParams.get('max_rent') ? Number(searchParams.get('max_rent')) : undefined,
  });

  useEffect(() => {
    loadPGs();
  }, [filters]);

  async function loadPGs() {
    setLoading(true);
    try {
      const data = await getPGs(filters, 50);
      setPgs(data);
    } catch (error) {
      console.error('Error loading PGs:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFiltersChange = (newFilters: PGFilters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.area) params.append('area', newFilters.area);
    if (newFilters.gender_type) params.append('gender_type', newFilters.gender_type);
    if (newFilters.min_rent) params.append('min_rent', newFilters.min_rent.toString());
    if (newFilters.max_rent) params.append('max_rent', newFilters.max_rent.toString());
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">PG Listings in Mohali</h1>

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
                No PGs found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">
                Showing {pgs.length} {pgs.length === 1 ? 'result' : 'results'}
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
