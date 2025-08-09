import { NextResponse } from "next/server";
import { db, save, uuid, User } from "@/lib/db";
import { scoreListings } from "@/lib/recommend";

export async function POST(req: Request) {
  const body = await req.json();
  const d = db();

  const user: User = {
    user_id: uuid(),
    name: body.name ?? "",
    email: body.email ?? "",
    profile_url: body.profile,
    location_intent: body.city,
    budget_range: body.budget,
    lease_length: body.lease || undefined,
    num_occupants: body.people && body.people !== "Family" ? Number(body.people.replace("+", "")) || undefined : undefined,
    owns_car: body.car ? body.car === "Yes" : undefined,
    preferences: {},
    interests: body.interests || [],
  };
  d.users.push(user);

  // Score and save top 3 recommendations
  const scored = scoreListings(user, d).slice(0, 3);
  for (const s of scored) {
    d.recommendations.push({
      recommendation_id: uuid(),
      user_id: user.user_id,
      listing_id: s.listing.listing_id,
      score: Number(s.score.toFixed(2)),
      recommendation_reason: s.reason,
    });
  }

  save();

  return NextResponse.json({ ok: true, redirect: `/dashboard?user_id=${user.user_id}`, payload: body });
}
