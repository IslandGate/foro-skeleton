-- ============================================================================
-- Schema Cleanup: Fix ALL column type mismatches + add documentation
--
-- Run this AFTER 00001 through 00004.
-- Every statement is wrapped in a DO block so it is safe to re-run even if
-- earlier migrations (e.g. 00002) have already been applied.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Helper: safely alter a column from text → text[]
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION __migrate_text_to_text_array(
  tbl regclass,
  col text
) RETURNS void AS $$
DECLARE
  current_type text;
BEGIN
  SELECT data_type INTO current_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = tbl::text
      AND column_name = col;

  IF current_type = 'ARRAY' THEN
    RAISE NOTICE '%.% is already an array — skipping.', tbl, col;
    RETURN;
  END IF;

  EXECUTE format(
    'ALTER TABLE %I ALTER COLUMN %I TYPE text[] USING CASE WHEN %I IS NULL OR %I = '''' THEN ''{}''::text[] WHEN %I LIKE ''{%%}'' THEN %I::text[] ELSE ARRAY[%I] END',
    tbl, col, col, col, col, col, col
  );
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- competitions
-- ----------------------------------------------------------------------------

SELECT __migrate_text_to_text_array('competitions', 'tags');
COMMENT ON COLUMN public.competitions.tags IS 'Badge/classification tags (e.g. Popular, Elite, New).';

SELECT __migrate_text_to_text_array('competitions', 'subjects');
COMMENT ON COLUMN public.competitions.subjects IS 'Academic subjects covered (e.g. Chemistry, Physics, Maths).';

ALTER TABLE public.competitions
  ALTER COLUMN tags SET DEFAULT '{}'::text[],
  ALTER COLUMN subjects SET DEFAULT '{}'::text[],
  ALTER COLUMN students_count SET DEFAULT 0,
  ALTER COLUMN created_at SET DEFAULT now();

-- ----------------------------------------------------------------------------
-- profiles
-- ----------------------------------------------------------------------------

SELECT __migrate_text_to_text_array('profiles', 'interests');
COMMENT ON COLUMN public.profiles.interests IS 'User-selected interest areas (e.g. Science, Technology, Medicine).';

SELECT __migrate_text_to_text_array('profiles', 'competition_formats');
COMMENT ON COLUMN public.profiles.competition_formats IS 'Preferred competition formats (Online, In-Person).';

SELECT __migrate_text_to_text_array('profiles', 'team_preferences');
COMMENT ON COLUMN public.profiles.team_preferences IS 'Preferred team sizes (Solo, 2-Person, 3-Person, 4-Person, 4+ Person).';

SELECT __migrate_text_to_text_array('profiles', 'motivations');
COMMENT ON COLUMN public.profiles.motivations IS 'Reasons for participating (Prizes, Learning, Socializing, Career Growth, Challenge, Recognition).';

-- willing_to_travel: text → boolean (code already sends boolean as of FORO-05)
DO $$
DECLARE
  current_type text;
BEGIN
  SELECT data_type INTO current_type
    FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'willing_to_travel';

  IF current_type = 'boolean' THEN
    RAISE NOTICE 'profiles.willing_to_travel is already boolean — skipping.';
  ELSE
    ALTER TABLE public.profiles
      ALTER COLUMN willing_to_travel TYPE boolean
      USING CASE
        WHEN willing_to_travel IS NULL THEN false
        WHEN willing_to_travel ILIKE 'yes%' OR willing_to_travel ILIKE 'within%' THEN true
        ELSE false
      END;
  END IF;
END $$;

ALTER TABLE public.profiles ALTER COLUMN willing_to_travel SET DEFAULT false;
COMMENT ON COLUMN public.profiles.willing_to_travel IS 'Whether the user is willing to travel for competitions.';

-- Defaults for array columns
ALTER TABLE public.profiles
  ALTER COLUMN interests SET DEFAULT '{}'::text[],
  ALTER COLUMN competition_formats SET DEFAULT '{}'::text[],
  ALTER COLUMN team_preferences SET DEFAULT '{}'::text[],
  ALTER COLUMN motivations SET DEFAULT '{}'::text[],
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now();

-- ----------------------------------------------------------------------------
-- Drop the helper function — no longer needed
-- ----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS __migrate_text_to_text_array(regclass, text);

-- ============================================================================
-- Documentation: table and column comments
-- ============================================================================

COMMENT ON TABLE public.competitions IS 'Academic competition listings — the core catalog of the Foro platform.';
COMMENT ON TABLE public.profiles IS 'Extended user profile data (1:1 with auth.users). Populated on signup; stub created automatically via trigger (00004).';
COMMENT ON TABLE public.saved_competitions IS 'Junction table tracking which competitions each user has bookmarked.';

COMMENT ON COLUMN public.competitions.id IS 'Primary key (UUID).';
COMMENT ON COLUMN public.competitions.title IS 'Competition name/title.';
COMMENT ON COLUMN public.competitions.image IS 'URL to the competition cover image.';
COMMENT ON COLUMN public.competitions.register_deadline IS 'Registration deadline date.';
COMMENT ON COLUMN public.competitions.location IS 'Competition location (city, region, or Online).';
COMMENT ON COLUMN public.competitions.prize_type IS 'Prize description (e.g. $500 Cash, Certificate, Scholarship).';
COMMENT ON COLUMN public.competitions.group_size IS 'Team size classification (Individual, Duo (2 members), Team (3-5 members)).';
COMMENT ON COLUMN public.competitions.information IS 'Full description / details about the competition.';
COMMENT ON COLUMN public.competitions.students_count IS 'Number of students currently registered.';
COMMENT ON COLUMN public.competitions.competition_website IS 'External URL to the official competition page.';
COMMENT ON COLUMN public.competitions.created_at IS 'Timestamp when the competition was added.';

COMMENT ON COLUMN public.profiles.id IS 'References auth.users(id) — 1:1 relationship.';
COMMENT ON COLUMN public.profiles.username IS 'Unique display name chosen by the user.';
COMMENT ON COLUMN public.profiles.first_name IS 'First name (also stored in auth.users user_metadata).';
COMMENT ON COLUMN public.profiles.last_name IS 'Last name (also stored in auth.users user_metadata).';
COMMENT ON COLUMN public.profiles.age IS 'User age in years.';
COMMENT ON COLUMN public.profiles.grade_level IS 'Current grade level (e.g. Grade 11).';
COMMENT ON COLUMN public.profiles.location IS 'User location (city/region).';
COMMENT ON COLUMN public.profiles.experience_levels IS 'JSON object mapping interest → skill level (e.g. {"Chemistry": "Beginner"}).';
COMMENT ON COLUMN public.profiles.previous_participation IS 'Free-text description of prior competition experience.';
COMMENT ON COLUMN public.profiles.additional_interests IS 'Free-text field for interests not covered by the predefined options.';
COMMENT ON COLUMN public.profiles.profile_image_url IS 'URL to the user profile picture (stored in Supabase Storage).';
COMMENT ON COLUMN public.profiles.created_at IS 'Timestamp when the profile was created.';
COMMENT ON COLUMN public.profiles.updated_at IS 'Timestamp when the profile was last updated.';

COMMENT ON COLUMN public.saved_competitions.id IS 'Auto-incrementing primary key.';
COMMENT ON COLUMN public.saved_competitions.user_id IS 'References auth.users(id) — the user who saved.';
COMMENT ON COLUMN public.saved_competitions.competition_id IS 'References public.competitions(id) — the saved competition.';
COMMENT ON COLUMN public.saved_competitions.created_at IS 'Timestamp when the competition was saved.';

