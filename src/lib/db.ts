import fs from "fs";
import path from "path";
import crypto from "crypto";

export type UUID = string;

export type User = {
  user_id: UUID;
  name?: string;
  email?: string;
  profile_url: string;
  location_intent: string;
  budget_range: string;
  lease_length?: string;
  num_occupants?: number;
  owns_car?: boolean;
  preferences?: unknown;
  interests: string[];
};

export type Neighborhood = {
  neighborhood_id: UUID;
  name: string;
  city: string;
  amenities: string[];
  safety_rating: number;
  walkability_score: number;
  public_transport_score: number;
  average_rent: number;
};

export type Listing = {
  listing_id: UUID;
  address: string;
  neighborhood_id: UUID;
  price: number;
  lease_length: string;
  num_bedrooms: number;
  num_bathrooms: number;
  parking_available: boolean;
  move_in_date: string; // ISO date
  amenities: string[];
  listing_source: string;
  last_updated: string; // ISO
};

export type Recommendation = {
  recommendation_id: UUID;
  user_id: UUID;
  listing_id: UUID;
  score: number;
  recommendation_reason: string;
};

export type CityEvent = {
  event_id: UUID;
  city: string;
  event_name: string;
  event_date: string; // ISO
  event_type: string;
  event_description: string;
  event_location: string;
};

export type DB = {
  users: User[];
  neighborhoods: Neighborhood[];
  listings: Listing[];
  recommendations: Recommendation[];
  city_events: CityEvent[];
};

const DATA_DIR = path.join(process.cwd(), "src", "data");
const FILE = path.join(DATA_DIR, "db.json");

let cache: DB | null = null;

function ensureSeed(): DB {
  if (cache) return cache;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(FILE)) {
    cache = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    return cache!;
  }
  // Seed minimal demo data
  const sfN: Neighborhood = {
    neighborhood_id: uuid(),
    name: "Mission",
    city: "San Francisco",
    amenities: ["Parks", "Gyms", "BART"],
    safety_rating: 7.2,
    walkability_score: 9.1,
    public_transport_score: 8.7,
    average_rent: 2800,
  };
  const nyN: Neighborhood = {
    neighborhood_id: uuid(),
    name: "Williamsburg",
    city: "New York",
    amenities: ["Subway", "Parks", "Cafes"],
    safety_rating: 7.8,
    walkability_score: 9.4,
    public_transport_score: 9.0,
    average_rent: 3200,
  };
  const bosN: Neighborhood = {
    neighborhood_id: uuid(),
    name: "Back Bay",
    city: "Boston",
    amenities: ["T", "Parks", "Museums"],
    safety_rating: 8.2,
    walkability_score: 9.0,
    public_transport_score: 8.6,
    average_rent: 2500,
  };

  const listings: Listing[] = [
    // SF
    mkListing(sfN, "123 Valencia St, SF", 2550, 1, 1, true, ["Gym", "Cafe", "BART"], "MLS"),
    mkListing(sfN, "456 Dolores St, SF", 2950, 2, 1, false, ["Park", "Yoga"], "Craigslist"),
    // NY
    mkListing(nyN, "12 Bedford Ave, BK", 3100, 1, 1, false, ["Subway", "Nightlife"], "StreetEasy"),
    mkListing(nyN, "85 Kent Ave, BK", 3600, 2, 1, true, ["Waterfront", "Gym"], "Zillow"),
    // Boston
    mkListing(bosN, "77 Boylston St, Boston", 2200, 1, 1, false, ["T", "Museum"], "Zillow"),
    mkListing(bosN, "14 Commonwealth Ave, Boston", 2600, 2, 1, true, ["Parking", "Park"], "MLS"),
  ];

  const city_events: CityEvent[] = [
    mkEvent("San Francisco", "Mission Street Fair", 7, "festival", "Food trucks, music, and local makers.", "Mission District"),
    mkEvent("New York", "Brooklyn Tech Meetup", 10, "conference", "Talks and demos from local startups.", "Williamsburg"),
    mkEvent("Boston", "Back Bay Art Walk", 14, "festival", "Neighborhood galleries open house.", "Back Bay"),
  ];

  cache = { users: [], neighborhoods: [sfN, nyN, bosN], listings, recommendations: [], city_events };
  fs.writeFileSync(FILE, JSON.stringify(cache, null, 2));
  return cache!;
}

function mkListing(n: Neighborhood, address: string, price: number, beds: number, baths: number, parking: boolean, amenities: string[], src: string): Listing {
  return {
    listing_id: uuid(),
    address,
    neighborhood_id: n.neighborhood_id,
    price,
    lease_length: "12 months",
    num_bedrooms: beds,
    num_bathrooms: baths,
    parking_available: parking,
    move_in_date: new Date().toISOString().slice(0, 10),
    amenities,
    listing_source: src,
    last_updated: new Date().toISOString(),
  };
}

function mkEvent(city: string, name: string, inDays: number, type: string, desc: string, loc: string): CityEvent {
  const d = new Date();
  d.setDate(d.getDate() + inDays);
  return { event_id: uuid(), city, event_name: name, event_date: d.toISOString().slice(0, 10), event_type: type, event_description: desc, event_location: loc };
}

export function uuid(): UUID {
  // Use randomUUID when available; fall back to simple
  if ('randomUUID' in crypto && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export function db(): DB {
  return ensureSeed();
}

export function save() {
  if (process.env.NODE_ENV !== "production") {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(cache, null, 2));
  }
}
