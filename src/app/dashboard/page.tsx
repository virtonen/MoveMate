"use client";
import useSWR from "swr";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { Listing } from "@/lib/db";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Event = {
  event_id: string;
  event_name: string;
  event_type: string;
  event_date: string;
  event_location: string;
  event_description: string;
};

type UserSummary = { location_intent: string };

export default function DashboardPage() {
  const sp = useSearchParams();
  const userId = sp.get("user_id");
  const { data, error } = useSWR(userId ? `/api/dashboard?user_id=${userId}` : null, fetcher);

  if (!userId) return <main className="mx-auto max-w-3xl px-4 py-10 text-zinc-300">Missing user ID.</main>;
  if (error) return <main className="mx-auto max-w-3xl px-4 py-10 text-zinc-300">Failed to load.</main>;
  if (!data) return <main className="mx-auto max-w-3xl px-4 py-10 text-zinc-300">Loading dashboard…</main>;

  const { user, listings, events }: { user: UserSummary; listings: Listing[]; events: Event[] } = data;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image src="/uploads/MoveMate.jpg" alt="MoveMate" fill className="object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Your MoveMate Dashboard</h1>
          <p className="text-sm text-zinc-400">Top picks for {user.location_intent}</p>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Top Listings</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {listings.map((l: Listing) => (
            <article key={l.listing_id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <h3 className="font-medium">{l.address}</h3>
              <p className="mt-1 text-sm text-zinc-400">${""}{l.price} • {l.num_bedrooms} bd / {l.num_bathrooms} ba</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {l.amenities.slice(0, 4).map((a: string) => (
                  <span key={a} className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300">{a}</span>
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-500">Source: {l.listing_source}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Upcoming in {user.location_intent}</h2>
        <ul className="mt-3 space-y-3">
          {events.map((e) => (
            <li key={e.event_id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{e.event_name}</p>
                  <p className="text-sm text-zinc-400">{e.event_type} • {e.event_date} • {e.event_location}</p>
                </div>
                <span className="rounded-md bg-[#44065f] px-2 py-1 text-xs text-white">{user.location_intent}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">{e.event_description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
