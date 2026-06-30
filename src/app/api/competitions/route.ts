import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

function normalizeRow(row: Record<string, any>) {
  return {
    id: row.id,
    title: row.title,
    image: row.image,
    tags: row.tags ?? [],
    subjects: row.subjects ?? [],
    registerDeadline: row.register_deadline ?? row.registerDeadline,
    location: row.location,
    prizeType: row.prize_type ?? row.prizeType,
    groupSize: row.group_size ?? row.groupSize,
    information: row.information,
    studentsCount: row.students_count ?? row.studentsCount,
    competitionWebsite: row.competition_website ?? row.competitionWebsite,
  };
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('competitions').select('*');

  if (error) {
    return NextResponse.json(
      { error: error.message ?? 'Unable to fetch competitions.' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    (data ?? []).map((row) => normalizeRow(row)),
  );
}
