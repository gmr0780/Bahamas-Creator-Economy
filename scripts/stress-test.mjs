#!/usr/bin/env node

/**
 * Registration Stress Test
 * Creates 160 test registrations via admin API, measures performance, then cleans up.
 */

const BASE_URL = "https://242creators.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOTAL = 160;
const CONCURRENCY = 20; // requests in flight at once

if (!ADMIN_PASSWORD) {
  console.error("Usage: ADMIN_PASSWORD=xxx node scripts/stress-test.mjs");
  process.exit(1);
}

const PLATFORMS = ["YouTube", "TikTok", "Instagram", "Twitch", "X/Twitter", "Facebook"];
const FOLLOWERS = ["Under 1K", "1K-10K", "10K-50K", "50K-100K", "100K-500K"];
const NICHES = ["Finance/Investing", "Business", "Technology", "Entertainment", "Lifestyle"];
const MONETIZATION = ["Not yet earning", "Earning under $500/mo", "Earning $500-2000/mo"];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function makeRegistration(i) {
  const n = String(i).padStart(3, "0");
  return {
    fullName: `Stress Test User ${n}`,
    email: `stresstest-${n}@test.242creators.com`,
    phone: `242-555-${n}`,
    platform: pick(PLATFORMS),
    handle: `stresstest${n}`,
    followers: pick(FOLLOWERS),
    niche: pick(NICHES),
    monetization: pick(MONETIZATION),
    topics: ["Testing"],
    sendEmail: false,
  };
}

// ── Login ────────────────────────────────────────────
async function login() {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: ADMIN_PASSWORD }),
    redirect: "manual",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Login failed (${res.status}): ${body}`);
  }

  const setCookie = res.headers.getSetCookie?.() ?? [];
  const tokenCookie = setCookie.find(c => c.startsWith("admin_token="));
  if (!tokenCookie) throw new Error("No admin_token cookie in login response");

  return tokenCookie.split(";")[0]; // "admin_token=xxx"
}

// ── Create registration ──────────────────────────────
async function createOne(cookie, registration) {
  const start = performance.now();
  const res = await fetch(`${BASE_URL}/api/admin/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(registration),
  });
  const elapsed = performance.now() - start;
  const body = await res.json();
  return { status: res.status, elapsed, body, email: registration.email };
}

// ── Delete registration ──────────────────────────────
async function deleteOne(cookie, id) {
  const res = await fetch(`${BASE_URL}/api/admin/registrations/${id}`, {
    method: "DELETE",
    headers: { Cookie: cookie },
  });
  return res.ok;
}

// ── Find test registrations ──────────────────────────
async function findTestRegistrations(cookie) {
  const ids = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `${BASE_URL}/api/admin/registrations?search=stresstest&limit=100&page=${page}`,
      { headers: { Cookie: cookie } }
    );
    const data = await res.json();
    for (const r of data.registrations ?? []) {
      if (r.email?.includes("@test.242creators.com")) {
        ids.push(r.id);
      }
    }
    if (page >= (data.totalPages ?? 1)) break;
    page++;
  }
  return ids;
}

// ── Run in batches ───────────────────────────────────
async function runBatches(cookie, registrations) {
  const results = [];
  for (let i = 0; i < registrations.length; i += CONCURRENCY) {
    const batch = registrations.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(r => createOne(cookie, r))
    );
    results.push(...batchResults);

    const succeeded = batchResults.filter(r => r.status === 201).length;
    const failed = batchResults.length - succeeded;
    const avgMs = (batchResults.reduce((s, r) => s + r.elapsed, 0) / batchResults.length).toFixed(0);
    console.log(
      `  Batch ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(registrations.length / CONCURRENCY)}: ` +
      `${succeeded} ok, ${failed} failed, avg ${avgMs}ms`
    );
  }
  return results;
}

// ── Main ─────────────────────────────────────────────
async function main() {
  console.log(`\n🔐 Logging in to ${BASE_URL}...`);
  const cookie = await login();
  console.log("✅ Logged in\n");

  // Build registrations
  const registrations = [];
  for (let i = 1; i <= TOTAL; i++) {
    registrations.push(makeRegistration(i));
  }

  // Phase 1: Create
  console.log(`📝 Creating ${TOTAL} registrations (concurrency: ${CONCURRENCY})...\n`);
  const startCreate = performance.now();
  const results = await runBatches(cookie, registrations);
  const createTime = ((performance.now() - startCreate) / 1000).toFixed(1);

  // Stats
  const succeeded = results.filter(r => r.status === 201);
  const failed = results.filter(r => r.status !== 201);
  const times = results.map(r => r.elapsed).sort((a, b) => a - b);
  const p50 = times[Math.floor(times.length * 0.5)].toFixed(0);
  const p95 = times[Math.floor(times.length * 0.95)].toFixed(0);
  const p99 = times[Math.floor(times.length * 0.99)].toFixed(0);
  const maxMs = times[times.length - 1].toFixed(0);
  const minMs = times[0].toFixed(0);

  console.log(`\n${"═".repeat(50)}`);
  console.log(`  STRESS TEST RESULTS`);
  console.log(`${"═".repeat(50)}`);
  console.log(`  Total requests:  ${TOTAL}`);
  console.log(`  Concurrency:     ${CONCURRENCY}`);
  console.log(`  Succeeded:       ${succeeded.length}`);
  console.log(`  Failed:          ${failed.length}`);
  console.log(`  Total time:      ${createTime}s`);
  console.log(`  Throughput:      ${(succeeded.length / parseFloat(createTime)).toFixed(1)} req/s`);
  console.log(`  Latency (ms):    min=${minMs}  p50=${p50}  p95=${p95}  p99=${p99}  max=${maxMs}`);
  console.log(`${"═".repeat(50)}`);

  if (failed.length > 0) {
    console.log(`\n❌ Failed requests:`);
    const errorCounts = {};
    for (const f of failed) {
      const msg = f.body?.error ?? `HTTP ${f.status}`;
      errorCounts[msg] = (errorCounts[msg] ?? 0) + 1;
    }
    for (const [msg, count] of Object.entries(errorCounts)) {
      console.log(`   ${count}x: ${msg}`);
    }
  }

  // Phase 2: Cleanup
  console.log(`\n🧹 Cleaning up test registrations...`);
  const testIds = await findTestRegistrations(cookie);
  console.log(`   Found ${testIds.length} test registrations to delete`);

  let deleted = 0;
  for (let i = 0; i < testIds.length; i += CONCURRENCY) {
    const batch = testIds.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(id => deleteOne(cookie, id)));
    deleted += results.filter(Boolean).length;
  }
  console.log(`   Deleted ${deleted}/${testIds.length}`);
  console.log(`\n✅ Stress test complete. Production data is clean.\n`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
