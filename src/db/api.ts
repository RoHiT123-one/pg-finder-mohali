import { supabase } from './supabase';
import type { PG, Review, Favorite, Enquiry, PGFilters, PGFormData } from '@/types';

// PG Operations
export async function getPGs(filters?: PGFilters, limit = 20, offset = 0) {
  let query = supabase
    .from('pg_listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.area) {
    query = query.eq('area', filters.area);
  }

  if (filters?.gender_type) {
    query = query.eq('gender_type', filters.gender_type);
  }

  if (filters?.food_included !== undefined) {
    query = query.eq('food_included', filters.food_included);
  }

  if (filters?.ac_available !== undefined) {
    query = query.eq('ac_available', filters.ac_available);
  }

  if (filters?.attached_bathroom !== undefined) {
    query = query.eq('attached_bathroom', filters.attached_bathroom);
  }

  if (filters?.min_rent || filters?.max_rent) {
    // Filter by any room type rent within range
    const minRent = filters.min_rent || 0;
    const maxRent = filters.max_rent || 999999;
    
    query = query.or(
      `rent_single.gte.${minRent},rent_double.gte.${minRent},rent_triple.gte.${minRent}`
    ).or(
      `rent_single.lte.${maxRent},rent_double.lte.${maxRent},rent_triple.lte.${maxRent}`
    );
  }

  const { data, error } = await query.range(offset, offset + limit - 1);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getFeaturedPGs(limit = 6) {
  const { data, error } = await supabase
    .from('pg_listings')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getRecentPGs(limit = 6) {
  const { data, error } = await supabase
    .from('pg_listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

// export async function getPGById(id: string) {
//   const { data, error } = await supabase
//     .from('pg_listings')
//     .select('*')
//     .eq('pg_id', id)
//     .maybeSingle();

//   if (error) throw error;
//   return data;
// }
export async function getPGById(id: string) {
  console.log("FETCHING PG WITH ID:", id);

  const { data, error } = await supabase
    .from('pg_listings')
    .select('*')
    .eq('id', id)
    .single();

  console.log("SUPABASE RESPONSE:", data);
  console.log("SUPABASE ERROR:", error);

  if (error) {
    throw error;
  }

  return data;
}

export async function createPG(pgData: PGFormData, images: string[]) {
  const { data, error } = await supabase
    .from('pg_listings')
    .insert([{
      ...pgData,
      image_urls: images,
      rent_single: pgData.rent_single || null,
      rent_double: pgData.rent_double || null,
      rent_triple: pgData.rent_triple || null,
      security_deposit: pgData.security_deposit || null,
      map_location: pgData.map_location || null,
      description: pgData.description || null,
    }])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function incrementPGViews(id: string) {
  // const { error } = await supabase.rpc('increment_pg_views', { pg_id: id });
  // if (error) console.error('Error incrementing views:', error);
  return;
}

// Review Operations
export async function getReviewsByPGId(pgId: string) {
  // const { data, error } = await supabase
  //   .from('reviews')
  //   .select('*')
  //   .eq('pg_id', pgId)
  //   .order('created_at', { ascending: false });

  // if (error) throw error;
  // return Array.isArray(data) ? data : [];
  return [];
}

export async function createReview(review: Omit<Review, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAverageRating(pgId: string) {
  // const { data, error } = await supabase
  //   .from('reviews')
  //   .select('rating')
  //   .eq('pg_id', pgId);

  // if (error) throw error;
  
  // if (!data || data.length === 0) return 0;
  
  // const sum = data.reduce((acc, review) => acc + review.rating, 0);
  // return sum / data.length;
  return 0;
}

// Favorite Operations
export async function getFavorites(sessionId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('*, pgs(*)')
    .eq('session_id', sessionId);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function addFavorite(pgId: string, sessionId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ pg_id: pgId, session_id: sessionId })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function removeFavorite(pgId: string, sessionId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('pg_id', pgId)
    .eq('session_id', sessionId);

  if (error) throw error;
}

export async function isFavorite(pgId: string, sessionId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('pg_id', pgId)
    .eq('session_id', sessionId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// Enquiry Operations
export async function createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('enquiries')
    .insert({
      ...enquiry,
      email: enquiry.email || null,
      message: enquiry.message || null,
      visit_date: enquiry.visit_date || null,
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Utility function to get or create session ID
export function getSessionId() {
  let sessionId = localStorage.getItem('pg_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('pg_session_id', sessionId);
  }
  return sessionId;
}
