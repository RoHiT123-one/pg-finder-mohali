import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ImageGallery from '@/components/pg/ImageGallery';
import ContactButtons from '@/components/pg/ContactButtons';
import { getPGById, incrementPGViews, getReviewsByPGId, getAverageRating } from '@/db/api';
import { IndianRupee, MapPin, Users, Wifi, Droplet, Shield, Zap, Wind, Utensils, Bath, Star, ArrowLeft } from 'lucide-react';
import type { PG, Review } from '@/types';

export default function PGDetail() {
  const { id } = useParams<{ id: string }>();
  const [pg, setPg] = useState<PG | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPGDetails();
    }
  }, [id]);

  async function loadPGDetails() {
    if (!id) return;
    
    setLoading(true);
    try {
      const [pgData, reviewsData, rating] = await Promise.all([
        getPGById(id),
        getReviewsByPGId(id),
        getAverageRating(id),
      ]);
      
      if (pgData) {
        setPg(pgData);
        incrementPGViews(id);
      }
      setReviews(reviewsData);
      setAverageRating(rating);
    } catch (error) {
      console.error('Error loading PG details:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 mb-6 bg-muted" />
        <Skeleton className="h-64 bg-muted" />
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-muted-foreground">PG not found</p>
        <Link to="/listings">
          <Button className="mt-4">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const facilities = [
    { key: 'wifi', label: 'WiFi', icon: Wifi, value: pg.wifi },
    { key: 'ro_water', label: 'RO Water', icon: Droplet, value: pg.ro_water },
    { key: 'cctv', label: 'CCTV', icon: Shield, value: pg.cctv },
    { key: 'power_backup', label: 'Power Backup', icon: Zap, value: pg.power_backup },
    { key: 'laundry', label: 'Laundry', icon: Wind, value: pg.laundry },
    { key: 'food_included', label: 'Food', icon: Utensils, value: pg.food_included },
    { key: 'ac_available', label: 'AC', icon: Wind, value: pg.ac_available },
    { key: 'attached_bathroom', label: 'Attached Bathroom', icon: Bath, value: pg.attached_bathroom },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/listings">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ImageGallery images={pg.image_urls} pgName={pg.name} />

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl md:text-3xl">{pg.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{pg.address}, {pg.area}, Mohali</span>
                  </div>
                </div>
                <Badge
                  variant={pg.availability_status === 'Available' ? 'default' : 'secondary'}
                >
                  {pg.availability_status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pg.description && (
                <>
                  <p className="text-muted-foreground">{pg.description}</p>
                  <Separator />
                </>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-3">Room Types & Rent</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pg.rent_single && (
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Single Sharing</p>
                      <div className="flex items-center text-xl font-bold text-primary">
                        <IndianRupee className="h-5 w-5" />
                        <span>{pg.rent_single.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  {pg.rent_double && (
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Double Sharing</p>
                      <div className="flex items-center text-xl font-bold text-primary">
                        <IndianRupee className="h-5 w-5" />
                        <span>{pg.rent_double.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  {pg.rent_triple && (
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Triple Sharing</p>
                      <div className="flex items-center text-xl font-bold text-primary">
                        <IndianRupee className="h-5 w-5" />
                        <span>{pg.rent_triple.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
                {pg.security_deposit && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Security Deposit: ₹{pg.security_deposit.toLocaleString()}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Facilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {facilities.map((facility) => {
                    const Icon = facility.icon;
                    return (
                      <div
                        key={facility.key}
                        className={`flex items-center space-x-2 p-2 rounded-lg ${
                          facility.value ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{facility.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Additional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Gender Type</p>
                    <Badge variant="outline" className="mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {pg.gender_type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="font-semibold mt-1">{pg.views}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                {averageRating > 0 && (
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                    <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-2">({reviews.length} reviews)</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{review.reviewer_name}</p>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Map Section */}
          {pg.map_location && (
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0&q=${encodeURIComponent(pg.map_location)}&language=en&region=cn`}
                  allowFullScreen
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Owner Name</p>
                  <p className="font-semibold">{pg.owner_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-semibold">{pg.owner_phone}</p>
                </div>
                <ContactButtons phone={pg.owner_phone} pgName={pg.name} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
