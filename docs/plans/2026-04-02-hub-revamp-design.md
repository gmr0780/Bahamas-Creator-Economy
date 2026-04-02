# 242 Creators Hub Revamp — Design Document

**Date:** 2026-04-02
**Status:** Approved

## Context

The 242 Influencers & Creative Conference took place on March 29, 2026 at Baha Mar. Following the event, X (Twitter) committed to hosting a free Masterclass for Bahamian creators. The site needs to shift from a single-event focus to an ongoing creator hub.

## Goals

1. Reposition 242creators.com as an ongoing hub for Bahamian creator opportunities
2. Promote the X Masterclass (April 17, 6pm, with Jamie Bierman)
3. Showcase a contest: attendees who sign up to X are entered to win lifetime X Premium
4. Add a recap of the March 29 conference as social proof
5. Admin-controlled registration toggle for testing before public launch

---

## Implementation Plan

### Step 1: Database — New XMasterclassRegistration model + migration

**File:** `prisma/schema.prisma`

Add new model:

```prisma
model XMasterclassRegistration {
  id        String   @id @default(cuid())
  fullName  String
  email     String   @unique
  phone     String
  island    String
  xHandle   String
  createdAt DateTime @default(now())
}
```

Add Setting entry for registration toggle: key `xMasterclassRegistrationOpen`, value `false`.

Run migration.

### Step 2: API Routes for X Masterclass

**New files:**
- `src/app/api/x-masterclass/register/route.ts` — POST handler for registration
  - Validates all fields (xHandle required)
  - Checks `xMasterclassRegistrationOpen` setting
  - Returns error if registration is closed
  - Stores to `XMasterclassRegistration` table
  - Sends confirmation email via Resend

- `src/app/api/x-masterclass/registrations/route.ts` — GET handler for admin
  - Returns all registrations (admin-authenticated)

- `src/app/api/x-masterclass/count/route.ts` — GET handler for registration count

### Step 3: Homepage Revamp

**File:** `src/app/page.tsx` — Major rewrite

**New structure:**
1. **Hero Section** — Hub positioning
   - Headline: "Empowering Bahamian Creators"
   - Sub: Government-backed initiative creating real opportunities
   - Primary CTA: Links to X Masterclass page

2. **Next Up: X Masterclass Section**
   - Event card: April 17, 6pm, Jamie Bierman
   - Key benefits: Learn to grow/monetize on X
   - Contest callout: Lifetime X Premium subscription
   - CTA: Register / "Coming Soon" based on toggle

3. **Event Recap Section**
   - Highlights from March 29 conference
   - Placeholder for photos, video, stats
   - Quote: "Not just a conversation but real, tangible opportunities"

4. **Keep:** Pillars of support, platform info, learn teasers (updated)
5. **Remove:** Countdown timer, spots counter, old registration CTAs

### Step 4: X Masterclass Page

**New file:** `src/app/x-masterclass/page.tsx`

**Sections:**
1. Event details — April 17, 2026, 6:00 PM, online, Jamie Bierman
2. What you'll learn — grow, monetize, build presence on X
3. Contest details — attend + sign up = entered for lifetime X Premium
4. Registration form (toggled by admin setting):
   - Full name (required)
   - Email (required)
   - Phone (required)
   - Island dropdown (required) — Nassau, Grand Bahama, Abaco, Eleuthera, Exuma, Andros, Long Island, Cat Island, Bimini, Inagua, Berry Islands, Acklins, Crooked Island, Mayaguana, Rum Cay, San Salvador, Ragged Island, Other
   - X Handle (required)
5. When registration closed: "Registration Opening Soon" message
6. Success state: confirmation with share-to-X button

### Step 5: Recap Page

**New file:** `src/app/recap/page.tsx`

- Full writeup of March 29 conference
- Photo gallery placeholder
- Video embed placeholder
- Key stats and highlights placeholder
- Quote blocks from the initiative messaging
- Content to be populated with real media from the user

### Step 6: Navigation Update

**File:** `src/app/components/Navigation.tsx`

**New links:**
- Home (`/`)
- X Masterclass (`/x-masterclass`)
- Recap (`/recap`)
- Learn (`/learn`)
- Platforms (`/platforms`)
- Earn (`/earn`)

**Remove:**
- Event (`/event`)
- My Pass (`/retrieve`)
- Live (`/live`)
- Connect (`/connect`)

### Step 7: Admin Updates

**File:** `src/app/admin/dashboard/page.tsx` (or new admin sub-page)

- Add toggle for X Masterclass registration (open/closed)
- Add section to view X Masterclass registrations
- Add export for X Masterclass registrations

### Step 8: Cleanup

- Remove or unlink retired pages (don't delete, just remove from nav):
  - `/event`
  - `/retrieve`
  - `/live`
  - `/connect`
- Remove countdown component usage from homepage
- Remove spots counter from homepage
- Remove urgency banner

---

## Islands Dropdown Values

1. Nassau / New Providence
2. Grand Bahama
3. Abaco
4. Eleuthera
5. Exuma
6. Andros
7. Long Island
8. Cat Island
9. Bimini
10. Inagua
11. Berry Islands
12. Acklins
13. Crooked Island
14. Mayaguana
15. Rum Cay
16. San Salvador
17. Ragged Island
18. Other

---

## Registration Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | text | Yes | |
| Email | email | Yes | Unique constraint |
| Phone | tel | Yes | |
| Island | select | Yes | Dropdown of 18 options |
| X Handle | text | Yes | Must start with @ or will be prefixed |

---

## Admin Settings

| Key | Default | Purpose |
|-----|---------|---------|
| `xMasterclassRegistrationOpen` | `false` | Toggle masterclass registration on/off |

---

## What Stays Unchanged

- Learn page and guides system
- Platforms page
- Earn page
- Legal pages (disclaimer, privacy, terms)
- Admin authentication system
- Page view analytics
- Existing Registration data (March 29 event)
- Design system (colors, fonts, glass effects)
