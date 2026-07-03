-- ============================================================================
-- FORO-01: Create saved_competitions table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.saved_competitions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  competition_id UUID NOT NULL REFERENCES public.competitions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, competition_id)
);

COMMENT ON TABLE public.saved_competitions IS 'Junction table for user-saved competitions.';
COMMENT ON COLUMN public.saved_competitions.user_id IS 'References auth.users(id).';
COMMENT ON COLUMN public.saved_competitions.competition_id IS 'References public.competitions(id).';

-- ============================================================================
-- FORO-02: Enable RLS on all public tables
-- ============================================================================
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_competitions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- FORO-02: RLS Policies – competitions
-- ============================================================================

-- Anyone (anon or authenticated) can read competitions
DROP POLICY IF EXISTS "Anyone can read competitions" ON public.competitions;
CREATE POLICY "Anyone can read competitions"
  ON public.competitions
  FOR SELECT
  USING (true);

-- Only authenticated users can insert competitions (for the admin upload page)
DROP POLICY IF EXISTS "Authenticated users can insert competitions" ON public.competitions;
CREATE POLICY "Authenticated users can insert competitions"
  ON public.competitions
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- FORO-02: RLS Policies – profiles
-- ============================================================================

-- Users can only read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (signup flow)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- FORO-02: RLS Policies – saved_competitions
-- ============================================================================

-- Users can only see their own saved competitions
DROP POLICY IF EXISTS "Users can read own saved competitions" ON public.saved_competitions;
CREATE POLICY "Users can read own saved competitions"
  ON public.saved_competitions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only save competitions for themselves
DROP POLICY IF EXISTS "Users can insert own saved competitions" ON public.saved_competitions;
CREATE POLICY "Users can insert own saved competitions"
  ON public.saved_competitions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only unsave their own competitions
DROP POLICY IF EXISTS "Users can delete own saved competitions" ON public.saved_competitions;
CREATE POLICY "Users can delete own saved competitions"
  ON public.saved_competitions
  FOR DELETE
  USING (auth.uid() = user_id);
