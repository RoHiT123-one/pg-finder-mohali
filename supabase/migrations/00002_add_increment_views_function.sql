-- Create function to increment PG views
CREATE OR REPLACE FUNCTION increment_pg_views(pg_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE pgs SET views = views + 1 WHERE id = pg_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;