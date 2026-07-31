# Contact / Quote form — email + WhatsApp setup

Every "Get Free Consultation" / "Start a Project" / Contact entry point opens the same modal
([ConsultationModal.tsx](src/components/ConsultationModal.tsx)). On submit it posts to
[api/consultation.js](api/consultation.js), a Vercel serverless function that sends two emails
through the Resend API:

1. **To the visitor** — confirmation that we received their inquiry, with a WhatsApp button.
2. **To us** — the full inquiry, with `reply-to` set to the enquirer's email.

There is also a dedicated WhatsApp route at **`/whatsapp`**
([WhatsAppContact.tsx](src/pages/WhatsAppContact.tsx)): it collects full name, email and inquiry,
builds `https://api.whatsapp.com/send?phone=…&text=…` from those values (see
[src/lib/whatsapp.ts](src/lib/whatsapp.ts)), opens the chat, and emails the confirmation in the
background. A floating "Chat with us" button links to it from every page.

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and locally in `.env`,
copied from [.env.example](.env.example)):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key (https://resend.com/api-keys) |
| `RESEND_FROM` | no | Verified sender, default `MyBizPush Solutions <noreply@mybizpush.com>` |
| `CONTACT_TO_EMAIL` | no | Inbox for notifications, default `info@mybizpush.com` |
| `WHATSAPP_PHONE` | no | Number used in emailed WhatsApp links, default `2347079084071` |
| `VITE_WHATSAPP_PHONE` | no | Same number, used by the browser |

⚠️ **The sending domain must be verified in Resend** (https://resend.com/domains) or delivery
fails. Until `mybizpush.com` is verified, set
`RESEND_FROM="MyBizPush Solutions <onboarding@resend.dev>"` — Resend's test sender only delivers
to the address that owns the Resend account.

## Local development

`npm run dev` serves the API function too (see the `dev-api-routes` plugin in
[vite.config.ts](vite.config.ts)), so the form works end to end at `http://localhost:8088`
once `RESEND_API_KEY` is set in `.env`.

```bash
curl -X POST http://localhost:8088/api/consultation \
  -H 'Content-Type: application/json' \
  -d '{"fullName":"Test User","email":"you@example.com","phoneNumber":"08012345678","message":"Testing"}'
```

## Failure behaviour

- Submissions are always mirrored to `localStorage` (visible at `/admin/consultations`).
- If Resend fails, the visitor still gets the WhatsApp hand-off instead of a dead end.
- A failure of the *internal* notification never blocks the visitor's confirmation.
