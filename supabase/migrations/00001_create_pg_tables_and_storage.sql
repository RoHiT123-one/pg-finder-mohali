-- Create PGs table
CREATE TABLE pgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  address TEXT NOT NULL,
  rent_single INTEGER,
  rent_double INTEGER,
  rent_triple INTEGER,
  security_deposit INTEGER,
  gender_type TEXT NOT NULL CHECK (gender_type IN ('Boys', 'Girls', 'Co-ed')),
  food_included BOOLEAN DEFAULT false,
  ac_available BOOLEAN DEFAULT false,
  attached_bathroom BOOLEAN DEFAULT false,
  wifi BOOLEAN DEFAULT false,
  laundry BOOLEAN DEFAULT false,
  ro_water BOOLEAN DEFAULT false,
  cctv BOOLEAN DEFAULT false,
  power_backup BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  availability_status TEXT DEFAULT 'Available' CHECK (availability_status IN ('Available', 'Full')),
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  map_location TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pg_id UUID REFERENCES pgs(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create favorites table (using session storage for anonymous users)
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pg_id UUID REFERENCES pgs(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(pg_id, session_id)
);

-- Create enquiries table
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pg_id UUID REFERENCES pgs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  visit_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create storage bucket for PG images
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-9rps3w1146pt_pg_images', 'app-9rps3w1146pt_pg_images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public upload and read
CREATE POLICY "Anyone can upload PG images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'app-9rps3w1146pt_pg_images');

CREATE POLICY "Anyone can read PG images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'app-9rps3w1146pt_pg_images');

-- RLS Policies for pgs table
ALTER TABLE pgs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pgs"
ON pgs FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can insert pgs"
ON pgs FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update pgs"
ON pgs FOR UPDATE
TO anon, authenticated
USING (true);

-- RLS Policies for reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can insert reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- RLS Policies for favorites table
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage favorites"
ON favorites FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- RLS Policies for enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert enquiries"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read their enquiries"
ON enquiries FOR SELECT
TO anon, authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_pgs_area ON pgs(area);
CREATE INDEX idx_pgs_gender_type ON pgs(gender_type);
CREATE INDEX idx_pgs_featured ON pgs(featured);
CREATE INDEX idx_pgs_created_at ON pgs(created_at DESC);
CREATE INDEX idx_reviews_pg_id ON reviews(pg_id);
CREATE INDEX idx_favorites_session_id ON favorites(session_id);
CREATE INDEX idx_favorites_pg_id ON favorites(pg_id);