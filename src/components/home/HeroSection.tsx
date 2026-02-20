import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Find Your Perfect PG in Mohali
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover verified PG accommodations with complete details, photos, and direct contact with owners
          </p>
        </div>
        
        <SearchBar />

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">PG Listings</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Locations</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Happy Students</div>
          </div>
        </div>
      </div>
    </section>
  );
}
