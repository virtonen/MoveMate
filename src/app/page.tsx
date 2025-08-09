"use client";

import Image from "next/image";
import { useState } from "react";

const INTERESTS = [
  "Running",
  "Arts & Culture",
  "Foodie Adventures",
  "Nightlife",
  "Wellness & Yoga",
  "Quiet & Study-Friendly",
  "Pet-Friendly Spaces",
  "Gaming & Tech",
];

const CITIES = ["San Francisco", "New York", "Boston"] as const;
const BUDGETS = [
  "Under $1,000",
  "$1,000–$1,500",
  "$1,500–$2,000",
  "$2,000–$2,500",
  "Over $2,500",
] as const;
const LEASE_LENGTHS = ["6 months", "12 months", "18 months", "24 months", "Other"] as const;
const PEOPLE = ["1", "2", "3", "4+", "Family"] as const;

export default function Home() {
  const [interests, setInterests] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [lease, setLease] = useState<string>("");
  const [leaseOther, setLeaseOther] = useState<string>("");
  const [people, setPeople] = useState<string>("");
  const [car, setCar] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ ok: boolean; payload: unknown } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleInterest(v: string) {
    setInterests((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (interests.length === 0) e.interests = "Select at least one interest";
    if (!city) e.city = "Choose a location";
    if (!budget) e.budget = "Select a budget";
    try {
      if (!profile) throw new Error("Provide a profile URL");
      const u = new URL(profile);
      if (!u.protocol.startsWith("http")) throw new Error("Invalid URL");
    } catch (err: unknown) {
      e.profile = err instanceof Error ? err.message : "Enter a valid URL";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      interests,
      city,
      budget,
      profile,
      lease: lease === "Other" ? leaseOther : lease,
      people,
      car,
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok: boolean; payload: unknown; redirect?: string } = await res.json();
      if (data.redirect) {
        window.location.href = data.redirect;
        return;
      }
      setSubmitted(data);
    } catch (_err: unknown) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <header className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image src="/uploads/MoveMate.jpg" alt="MoveMate" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">MoveMate</h1>
            <p className="text-sm text-zinc-400">Your personalized moving dashboard</p>
          </div>
        </header>
        <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-lg font-medium">Thanks! Your dashboard is being prepared.</h2>
          <p className="mt-2 text-sm text-zinc-400">Here’s a summary of your preferences.</p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-black/40 p-4 text-xs text-zinc-300">{JSON.stringify(submitted.payload, null, 2)}</pre>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image src="/uploads/MoveMate.jpg" alt="MoveMate" fill className="object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">MoveMate</h1>
          <p className="text-sm text-zinc-400">Effortlessly create your custom moving dashboard</p>
        </div>
      </header>

      <p className="mt-4 text-sm text-zinc-400">Guiding you through neighborhood insights, housing listings, and application processes.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-6 pb-28">
        <Section title="1. Personal Interests" hint="Select activities you enjoy" error={errors.interests}>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => toggleInterest(i)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${interests.includes(i) ? "border-[#44065f] bg-[#44065f]/20 text-zinc-100" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"}`}
              >
                {i}
              </button>
            ))}
          </div>
        </Section>

        <Section title="2. Desired Location" hint="Where are you planning to move?" error={errors.city}>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm focus:border-[#6a1b9a] focus:outline-none">
            <option value="">Select a city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Section>

        <Section title="3. Budget Range" hint="What is your monthly rent budget?" error={errors.budget}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUDGETS.map((b) => (
              <label key={b} className={`cursor-pointer rounded-md border px-3 py-2 text-sm transition ${budget === b ? "border-[#44065f] bg-[#44065f]/20" : "border-zinc-700 hover:border-zinc-500"}`}>
                <input type="radio" name="budget" value={b} className="hidden" onChange={() => setBudget(b)} />
                {b}
              </label>
            ))}
          </div>
        </Section>

        <Section title="4. Social Media Profile" hint="Public link to personalize recommendations" error={errors.profile}>
          <input value={profile} onChange={(e) => setProfile(e.target.value)} placeholder="https://..." className="w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm focus:border-[#6a1b9a] focus:outline-none" />
        </Section>

        <Section title="5. Lease Length (Optional)" hint="How long do you plan to lease?">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {LEASE_LENGTHS.map((l) => (
              <label key={l} className={`cursor-pointer rounded-md border px-3 py-2 text-sm transition ${lease === l ? "border-[#44065f] bg-[#44065f]/20" : "border-zinc-700 hover:border-zinc-500"}`}>
                <input type="radio" name="lease" value={l} className="hidden" onChange={() => setLease(l)} />
                {l}
              </label>
            ))}
          </div>
          {lease === "Other" && (
            <input value={leaseOther} onChange={(e) => setLeaseOther(e.target.value)} placeholder="Enter lease length" className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm focus:border-[#6a1b9a] focus:outline-none" />
          )}
        </Section>

        <Section title="6. Number of People (Optional)" hint="How many people will be moving with you?">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {PEOPLE.map((p) => (
              <label key={p} className={`cursor-pointer rounded-md border px-3 py-2 text-center text-sm transition ${people === p ? "border-[#44065f] bg-[#44065f]/20" : "border-zinc-700 hover:border-zinc-500"}`}>
                <input type="radio" name="people" value={p} className="hidden" onChange={() => setPeople(p)} />
                {p}
              </label>
            ))}
          </div>
        </Section>

        <Section title="7. Car Ownership (Optional)" hint="Do you own a car?">
          <div className="grid grid-cols-2 gap-2">
            {["Yes", "No"].map((v) => (
              <label key={v} className={`cursor-pointer rounded-md border px-3 py-2 text-center text-sm transition ${car === v ? "border-[#44065f] bg-[#44065f]/20" : "border-zinc-700 hover:border-zinc-500"}`}>
                <input type="radio" name="car" value={v} className="hidden" onChange={() => setCar(v)} />
                {v}
              </label>
            ))}
          </div>
        </Section>

        {errors.submit && <p className="text-sm text-red-400">{errors.submit}</p>}

        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-zinc-800 bg-[#0b0618]/80 backdrop-blur">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <button disabled={submitting} className="w-full rounded-lg bg-[#44065f] px-4 py-3 text-center text-sm font-medium text-white shadow-md shadow-[#44065f]/30 transition hover:brightness-110 disabled:opacity-60">
              {submitting ? "Preparing your dashboard..." : "Help Me Move"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

function Section({ title, hint, error, children }: { title: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-base font-medium">{title}</h2>
        {hint && <p className="text-xs text-zinc-400">{hint}</p>}
      </div>
      <div>{children}</div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </section>
  );
}
