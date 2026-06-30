import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("saved_competitions")
    .select("competition_id");

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Unable to fetch saved competitions." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    savedCompetitionIds: Array.isArray(data)
      ? data.map((row) => row.competition_id).filter(Boolean)
      : [],
  });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const competitionId = body.competitionId;

  if (!competitionId) {
    return NextResponse.json(
      { error: "Missing competitionId." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("saved_competitions").insert({
    competition_id: competitionId,
    user_id: user.id,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Unable to save competition." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const competitionId = body.competitionId;

  if (!competitionId) {
    return NextResponse.json(
      { error: "Missing competitionId." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_competitions")
    .delete()
    .eq("competition_id", competitionId)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Unable to unsave competition." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
