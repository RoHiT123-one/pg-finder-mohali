export interface PG {
  id: string;
  name: string;
  area: string;
  address: string;
  rent_single: number | null;
  rent_double: number | null;
  rent_triple: number | null;
  security_deposit: number | null;
  gender_type: 'Boys' | 'Girls' | 'Co-ed';
  food_included: boolean;
  ac_available: boolean;
  attached_bathroom: boolean;
  wifi: boolean;
  laundry: boolean;
  ro_water: boolean;
  cctv: boolean;
  power_backup: boolean;
  images: string[];
  availability_status: 'Available' | 'Full';
  owner_name: string;
  owner_phone: string;
  map_location: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  featured: boolean;
  views: number;
}

export interface Review {
  id: string;
  pg_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  pg_id: string;
  session_id: string;
  created_at: string;
}

export interface Enquiry {
  id: string;
  pg_id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  visit_date: string | null;
  created_at: string;
}

export interface PGFilters {
  area?: string;
  gender_type?: string;
  min_rent?: number;
  max_rent?: number;
  food_included?: boolean;
  ac_available?: boolean;
  attached_bathroom?: boolean;
}

export interface PGFormData {
  name: string;
  area: string;
  address: string;
  rent_single: number | null;
  rent_double: number | null;
  rent_triple: number | null;
  security_deposit: number | null;
  gender_type: 'Boys' | 'Girls' | 'Co-ed';
  food_included: boolean;
  ac_available: boolean;
  attached_bathroom: boolean;
  wifi: boolean;
  laundry: boolean;
  ro_water: boolean;
  cctv: boolean;
  power_backup: boolean;
  owner_name: string;
  owner_phone: string;
  map_location: string;
  description: string;
}
