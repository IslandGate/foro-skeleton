-- ============================================================================
-- FORO-03: Fix competition_formats column type (TEXT → TEXT[])
-- The signup flow sends a string array, but the column was defined as TEXT.
-- ============================================================================
ALTER TABLE public.profiles
  ALTER COLUMN competition_formats TYPE TEXT[]
  USING CASE
    WHEN competition_formats IS NULL THEN NULL
    ELSE ARRAY[competition_formats]
  END;

-- ============================================================================
-- FORO-04: Fix experience_levels column type (TEXT → JSONB)
-- The signup flow sends a Record<string, string> object, but the column was
-- defined as TEXT, causing "[object Object]" to be stored.
-- ============================================================================
DO $$
BEGIN
  BEGIN
    ALTER TABLE public.profiles
      ALTER COLUMN experience_levels TYPE JSONB
      USING experience_levels::jsonb;
  EXCEPTION WHEN others THEN
    -- If any existing rows contain invalid JSON (e.g. "[object Object]"),
    -- nullify them before retrying the type change.
    UPDATE public.profiles SET experience_levels = NULL
      WHERE experience_levels IS NOT NULL;
    ALTER TABLE public.profiles
      ALTER COLUMN experience_levels TYPE JSONB
      USING experience_levels::jsonb;
  END;
END $$;
