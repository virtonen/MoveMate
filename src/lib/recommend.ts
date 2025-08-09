import { DB, Listing, User, db } from "./db";

function budgetToRange(b: string): [number, number] | null {
  const map: Record<string, [number, number]> = {
    "Under $1,000": [0, 999],
    "$1,000–$1,500": [1000, 1500],
    "$1,500–$2,000": [1500, 2000],
    "$2,000–$2,500": [2000, 2500],
    "Over $2,500": [2501, 100000],
  };
  return map[b] ?? null;
}

export function scoreListings(user: User, dbi: DB = db()): { listing: Listing; score: number; reason: string }[] {
  const nById = new Map(dbi.neighborhoods.map((n) => [n.neighborhood_id, n] as const));
  const [min, max] = budgetToRange(user.budget_range) ?? [0, 100000];
  const hasCar = !!user.owns_car;

  const results = dbi.listings
    .filter((l) => {
      const n = nById.get(l.neighborhood_id)!;
      return n.city === user.location_intent; // city match only for demo
    })
    .map((l) => {
      const n = nById.get(l.neighborhood_id)!;
      let score = 0;
      const reasons: string[] = [];

      // Budget fit
      if (l.price >= min && l.price <= max) {
        score += 3;
        reasons.push("Fits your budget");
      } else if (Math.abs(l.price - Math.max(min, Math.min(max, l.price))) < 300) {
        score += 1.5;
        reasons.push("Near your budget");
      }

      // Interests vs amenities/neighborhood
      const low = user.interests.map((i) => i.toLowerCase());
      const amen = (l.amenities || []).map((a) => a.toLowerCase());
      if (low.some((i) => amen.some((a) => a.includes(i.split(" ")[0])))) {
        score += 2;
        reasons.push("Matches your interests");
      }

      // Walkability / transit preference signal from interests
      if (low.some((i) => ["running", "arts", "museum", "nightlife"].some((k) => i.includes(k)))) {
        score += n.walkability_score / 10;
      }

      // Parking for car owners
      if (hasCar && l.parking_available) {
        score += 1.5;
        reasons.push("Has parking");
      }

      // Freshness
      score += 0.5;

      return { listing: l, score, reason: reasons.join(", ") };
    })
    .sort((a, b) => b.score - a.score);

  return results;
}
