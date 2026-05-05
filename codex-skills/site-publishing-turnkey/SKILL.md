---
name: site-publishing-turnkey
description: Use this skill when working on the user's marketing site or landing pages end-to-end: apply design/content edits, keep lead forms working, validate public-facing copy, push to GitHub, and publish through Vercel with a production-ready checklist.
---

# Site Publishing Turnkey

Use this skill for end-to-end work on the user's public website or landing pages when the goal is not only to edit files, but to ship a working update.

## What this skill covers

- public landing page edits
- responsive UI cleanup
- CTA and lead-form wiring
- Vercel-compatible frontend and API updates
- GitHub push and production publish flow
- final public QA checklist

## Working assumptions for this project

- main repo lives in `/Users/krek/Downloads/system-mlm-git`
- production deploys through GitHub → Vercel
- public production URL is based on the connected Vercel project
- lead forms use `/api/lead`
- Telegram delivery requires:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`

## Default workflow

1. Inspect the current public page and identify:
   - visual bugs
   - mobile issues
   - broken CTA logic
   - any internal or draft-only copy that leaked into production

2. Patch the repo directly:
   - HTML
   - CSS
   - JS
   - Vercel API functions if needed

3. Validate before publish:
   - no draft/designer copy remains
   - CTA labels are production-safe
   - forms point to working logic
   - mobile spacing is clean
   - no dashboard/internal links remain on public sales pages unless explicitly wanted

4. Commit with a specific message.

5. Push to:
   - `git -C /Users/krek/Downloads/system-mlm-git push origin main`

6. After push, always report:
   - what changed
   - commit hash
   - public URL to check
   - whether any environment variables still need to be configured

## Lead form rules

- Never leave production forms in “copy to clipboard only” mode unless it is an intentional fallback.
- Prefer Vercel serverless endpoints for lead delivery.
- If Telegram delivery is used:
  - keep bot token server-side only
  - use Vercel env vars
  - never embed secrets in frontend code

## Public-page cleanup rules

- Remove designer notes, technical labels, style names, and spec language from public pages.
- Avoid internal navigation like dashboard links on sales pages unless explicitly required.
- If a user points out “sticky” or “glued” UI, fix spacing before adding new decoration.

## Final response format

After each publish, respond with:

1. what changed
2. live page URL
3. commit hash
4. anything still needed from the user, only if blocking
