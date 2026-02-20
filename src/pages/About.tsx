import { Card, CardContent } from '@/components/ui/card';
import { Building2, Target, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About PG Finder Mohali</h1>
          <p className="text-lg text-muted-foreground">
            Your trusted partner in finding the perfect accommodation
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-muted-foreground">
            PG Finder Mohali is the leading platform for finding paying guest accommodations in Mohali, Punjab. 
            We connect students and working professionals with verified PG owners, making the search for 
            comfortable and affordable accommodation hassle-free.
          </p>
          <p className="text-muted-foreground">
            Founded in 2026, we have helped thousands of students find their home away from home. Our platform 
            features detailed listings with photos, complete facility information, and direct contact with owners, 
            eliminating middlemen and unnecessary commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">500+ Listings</h3>
              <p className="text-muted-foreground">
                Extensive database of verified PG accommodations across Mohali
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">10,000+ Students</h3>
              <p className="text-muted-foreground">
                Helped thousands of students find their perfect accommodation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To simplify the PG search process and connect students with quality accommodations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">
                All listings are verified for authenticity and accuracy
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground mb-6">
            We are committed to providing the best PG search experience with verified listings, 
            transparent pricing, and direct communication with owners. No hidden charges, no middlemen, 
            just honest and reliable service.
          </p>
        </div>
      </div>
    </div>
  );
}
