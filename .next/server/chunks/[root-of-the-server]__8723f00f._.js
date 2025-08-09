module.exports = {

"[project]/.next-internal/server/app/api/dashboard/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/lib/db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db),
    "save": (()=>save),
    "uuid": (()=>uuid)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "src", "data");
const FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, "db.json");
let cache = null;
function ensureSeed() {
    if (cache) return cache;
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
        recursive: true
    });
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(FILE)) {
        cache = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(FILE, "utf-8"));
        return cache;
    }
    // Seed minimal demo data
    const sfN = {
        neighborhood_id: uuid(),
        name: "Mission",
        city: "San Francisco",
        amenities: [
            "Parks",
            "Gyms",
            "BART"
        ],
        safety_rating: 7.2,
        walkability_score: 9.1,
        public_transport_score: 8.7,
        average_rent: 2800
    };
    const nyN = {
        neighborhood_id: uuid(),
        name: "Williamsburg",
        city: "New York",
        amenities: [
            "Subway",
            "Parks",
            "Cafes"
        ],
        safety_rating: 7.8,
        walkability_score: 9.4,
        public_transport_score: 9.0,
        average_rent: 3200
    };
    const bosN = {
        neighborhood_id: uuid(),
        name: "Back Bay",
        city: "Boston",
        amenities: [
            "T",
            "Parks",
            "Museums"
        ],
        safety_rating: 8.2,
        walkability_score: 9.0,
        public_transport_score: 8.6,
        average_rent: 2500
    };
    const listings = [
        // SF
        mkListing(sfN, "123 Valencia St, SF", 2550, 1, 1, true, [
            "Gym",
            "Cafe",
            "BART"
        ], "MLS"),
        mkListing(sfN, "456 Dolores St, SF", 2950, 2, 1, false, [
            "Park",
            "Yoga"
        ], "Craigslist"),
        // NY
        mkListing(nyN, "12 Bedford Ave, BK", 3100, 1, 1, false, [
            "Subway",
            "Nightlife"
        ], "StreetEasy"),
        mkListing(nyN, "85 Kent Ave, BK", 3600, 2, 1, true, [
            "Waterfront",
            "Gym"
        ], "Zillow"),
        // Boston
        mkListing(bosN, "77 Boylston St, Boston", 2200, 1, 1, false, [
            "T",
            "Museum"
        ], "Zillow"),
        mkListing(bosN, "14 Commonwealth Ave, Boston", 2600, 2, 1, true, [
            "Parking",
            "Park"
        ], "MLS")
    ];
    const city_events = [
        mkEvent("San Francisco", "Mission Street Fair", 7, "festival", "Food trucks, music, and local makers.", "Mission District"),
        mkEvent("New York", "Brooklyn Tech Meetup", 10, "conference", "Talks and demos from local startups.", "Williamsburg"),
        mkEvent("Boston", "Back Bay Art Walk", 14, "festival", "Neighborhood galleries open house.", "Back Bay")
    ];
    cache = {
        users: [],
        neighborhoods: [
            sfN,
            nyN,
            bosN
        ],
        listings,
        recommendations: [],
        city_events
    };
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(FILE, JSON.stringify(cache, null, 2));
    return cache;
}
function mkListing(n, address, price, beds, baths, parking, amenities, src) {
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
        last_updated: new Date().toISOString()
    };
}
function mkEvent(city, name, inDays, type, desc, loc) {
    const d = new Date();
    d.setDate(d.getDate() + inDays);
    return {
        event_id: uuid(),
        city,
        event_name: name,
        event_date: d.toISOString().slice(0, 10),
        event_type: type,
        event_description: desc,
        event_location: loc
    };
}
function uuid() {
    // Use randomUUID when available; fall back to simple
    if ('randomUUID' in __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"] && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID === 'function') {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID();
    }
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}
function db() {
    return ensureSeed();
}
function save() {
    if ("TURBOPACK compile-time truthy", 1) {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
            recursive: true
        });
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(FILE, JSON.stringify(cache, null, 2));
    }
}
}}),
"[project]/src/app/api/dashboard/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    if (!user_id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "missing user_id"
    }, {
        status: 400
    });
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"])();
    const user = d.users.find((u)=>u.user_id === user_id);
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "user not found"
    }, {
        status: 404
    });
    const recs = d.recommendations.filter((r)=>r.user_id === user_id).sort((a, b)=>b.score - a.score);
    const listingIds = new Set(recs.map((r)=>r.listing_id));
    const listings = d.listings.filter((l)=>listingIds.has(l.listing_id));
    const events = d.city_events.filter((e)=>e.city === user.location_intent);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        user,
        listings,
        events
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__8723f00f._.js.map