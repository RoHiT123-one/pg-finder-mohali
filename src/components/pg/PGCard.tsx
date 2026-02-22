import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, IndianRupee, Users, Utensils } from 'lucide-react';
import type { PG } from '@/types';

interface PGCardProps {
  pg: PG;
  // image_urls: string[]
}

export default function PGCard({ pg }: PGCardProps) {
  const minRent = Math.min(
    ...[pg.rent_single, pg.rent_double, pg.rent_triple].filter((r): r is number => r !== null)
  );

  const thumbnailImage = pg.images?.[0] || 'placeholder-pg.jpg';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pg.image_urls?.[0] || "https://placehold.co/600x400?text=No+Image"}
          alt={pg.name}
          className="w-full h-full object-cover"
        />
        {pg.featured && (
          <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
        )}
        <Badge
          className="absolute top-2 left-2"
          variant={pg.availability_status === 'Available' ? 'default' : 'secondary'}
        >
          {pg.availability_status}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{pg.name}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{pg.area}, Mohali</span>
        </div>

        <div className="flex items-center text-lg font-bold text-primary mb-3">
          <IndianRupee className="h-5 w-5" />
          <span>{minRent.toLocaleString()}/month</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            {pg.gender_type}
          </Badge>
          {pg.food_included && (
            <Badge variant="outline" className="text-xs">
              <Utensils className="h-3 w-3 mr-1" />
              Food
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/pg/${pg.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
