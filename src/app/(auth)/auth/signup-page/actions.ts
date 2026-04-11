'use server';

import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/src/utils/supabase/server';
import type { SignupFormData } from './types';

function profilePayload(userId: string, formData: SignupFormData) {
  return {
    id: userId,
    username: formData.username,
    first_name: formData.firstName,
    last_name: formData.lastName,
    age: formData.age ? parseInt(formData.age) : null,
    grade_level: formData.gradeLevel,
    location: formData.location,
    interests: formData.interests,
    competition_formats: formData.competitionFormats,
    team_preferences: formData.teamPreferences,
    experience_levels: formData.experienceLevels,
    previous_participation: formData.previousParticipation,
    motivations: formData.motivations,
    willing_to_travel: formData.willingToTravel,
    additional_interests: formData.additionalInterests,
  };
}

export async function signUpUser(formData: SignupFormData) {
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );

  const { data, error: signUpError } = await admin.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {
      username: formData.username,
      first_name: formData.firstName,
      last_name: formData.lastName,
    },
  });

  if (signUpError) return { error: signUpError.message };
  if (!data.user) return { error: 'Something went wrong. Please try again.' };

  const { error: profileError } = await admin
    .from('profiles')
    .upsert(profilePayload(data.user.id, formData));

  if (profileError) return { error: profileError.message };

  return { success: true, requiresConfirmation: false };
}

export async function saveOAuthProfile(formData: SignupFormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Not authenticated. Please sign in again.' };

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );

  const { error: profileError } = await admin
    .from('profiles')
    .upsert(profilePayload(user.id, formData));

  if (profileError) return { error: profileError.message };

  return { success: true, requiresConfirmation: false };
}
