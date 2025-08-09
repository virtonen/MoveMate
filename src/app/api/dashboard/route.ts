import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  if (!user_id) return NextResponse.json({ error: "missing user_id" }, { status: 400 });

  const d = db();
  const user = d.users.find((u) => u.user_id === user_id);
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });

  const recs = d.recommendations.filter((r) => r.user_id === user_id).sort((a, b) => b.score - a.score);
  const listingIds = new Set(recs.map((r) => r.listing_id));
  const listings = d.listings.filter((l) => listingIds.has(l.listing_id));
  const events = d.city_events.filter((e) => e.city === user.location_intent);

  return NextResponse.json({ user, listings, events });
}
