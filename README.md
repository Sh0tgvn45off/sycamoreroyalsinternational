# Sycamore Royals International

Website for Sycamore Royals International, a Christian community-based organisation in Wera, Amuria District, Uganda. *Scaling the Heights.*

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Framer Motion, and deployed on Vercel.

## Pages

| Route | What's there |
| --- | --- |
| `/` | The home hero: welcome, mission line and the sycamore tree |
| `/about` | Who we are, vision and mission, values, approach, founders, programmes, footprint map, history, gallery |
| `/events` | Current programmes, the annual children's camp, the 2025 calendar, future plans |
| `/get-involved` | Six ways to help, the application form, contact details, sharing |
| `/donate` | Mobile money, PayPal and bank transfer, impact and receipts |

Search opens from the magnifier, or with <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> or <kbd>/</kbd>.

## Editing content

All copy lives in `lib/content/`, one file per page. Change the text there and the page and site search update together.

- Organisation details (email, phone, address): `lib/site.ts`
- Payment details: `lib/content/donate.ts`. To offer card payments, create a PayPal Donate button and paste its link into `paypal.donateUrl`.
- Photos: `public/images/`. Keep new photos under about 1600px on the long edge.

## Development

Requires Node.js 24.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Environment variables

All optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public address, e.g. `https://www.example.org`. Used for canonical links, the sitemap and link previews. On Vercel it defaults to the project's production domain. |
| `APPLY_WEBHOOK_URL` | Where `/api/apply` sends applications. Defaults to the Google Apps Script that records them in the Google Sheet. |

## Deployment

Vercel builds every push. `main` is production; other branches get preview URLs. `vercel.json` pins the Next.js framework preset.
