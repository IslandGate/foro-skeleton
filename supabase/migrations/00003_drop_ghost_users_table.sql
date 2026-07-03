-- ============================================================================
-- FORO-07: Drop ghost public.users table
-- This table is a duplicate of public.profiles created earlier in development.
-- All application code references public.profiles exclusively.
-- ============================================================================
DROP TABLE IF EXISTS public.users;
