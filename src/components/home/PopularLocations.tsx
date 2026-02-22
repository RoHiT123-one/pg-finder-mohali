import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { AREAS } from '@/lib/constants';

export default function PopularLocations() {
  const areaMap: Record<string, string> = {
    'Phase 5': 'phase-5',
    'Phase 7': 'phase-7',
    'Kharar': 'kharar',
    'Landran': 'landran',
    'Sector 70': 'sector-70',
    'Sector 71': 'sector-71',
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Locations</h2>
          <p className="text-muted-foreground">
            Explore PG accommodations in top areas of Mohali
          </p>
        </div>

        {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 by default for 6 locations*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {AREAS.map((area) => (
            <Link key={area} to={`/area/${areaMap[area]}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">{area}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Mohali</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
