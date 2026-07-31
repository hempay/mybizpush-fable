/**
 * Vercel serverless function that handles consultation / quote / contact requests.
 *
 * It sends two emails through Resend:
 *   1. An acknowledgement to the person who filled the form.
 *   2. A notification to the MyBizPush inbox (with reply-to set to the enquirer).
 *
 * Required env vars (set them in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   - your Resend API key
 * Optional:
 *   RESEND_FROM      - verified sender, e.g. "MyBizPush Solutions <noreply@mybizpush.com.ng>"
 *   CONTACT_TO_EMAIL - where notifications land (default info@mybizpush.com.ng)
 *   WHATSAPP_PHONE   - WhatsApp number in international format, digits only
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const FROM = process.env.RESEND_FROM || 'MyBizPush Solutions <noreply@mybizpush.com>';
const NOTIFY_TO = process.env.CONTACT_TO_EMAIL || 'info@mybizpush.com';
const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '2347079084071';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildWhatsAppLink({ fullName, email, message }) {
  const text = `Hello, i am making an inquiry.\n\nName: ${fullName}\nEmail: ${email}\n\n${message}`;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
}

async function sendEmail(payload) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, ...payload }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.message || `Resend responded with ${response.status}`);
  }

  return body;
}

function acknowledgementHtml({ fullName, message, whatsappUrl }) {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f6f7fb;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #ececf3;">
      <div style="background:linear-gradient(90deg,#7c3aed,#2563eb);padding:28px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">MyBizPush Solutions Limited</h1>
      </div>
      <div style="padding:32px;color:#1f2333;line-height:1.6;font-size:15px;">
        <p style="margin:0 0 16px;">Hi ${escapeHtml(fullName)},</p>
        <p style="margin:0 0 16px;">
          Thank you for reaching out. We have received your inquiry and a member of our team
          will be in touch with you within 24 hours.
        </p>
        <p style="margin:0 0 8px;font-weight:600;">Here is what you sent us:</p>
        <blockquote style="margin:0 0 24px;padding:14px 18px;background:#f6f7fb;border-left:3px solid #7c3aed;border-radius:6px;color:#4a4f63;white-space:pre-wrap;">${escapeHtml(message)}</blockquote>
        <p style="margin:0 0 20px;">If you would like a faster response, chat with us directly on WhatsApp:</p>
        <p style="margin:0 0 28px;">
          <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600;">Chat on WhatsApp</a>
        </p>
        <p style="margin:0;color:#6b7080;font-size:13px;">
          Warm regards,<br />The MyBizPush Solutions Team<br />
          Suite 300, 3rd Floor, Copper House, Plot 4 Street, Wuse Zone 5, Abuja
        </p>
      </div>
    </div>
  </div>`;
}

function notificationHtml({ fullName, email, phoneNumber, message, whatsappUrl, timestamp }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:8px 0;color:#6b7080;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:#1f2333;">${value}</td>
    </tr>`;

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;padding:24px;color:#1f2333;">
    <h2 style="margin:0 0 16px;font-size:18px;">New inquiry from the website</h2>
    <table style="border-collapse:collapse;font-size:14px;width:100%;max-width:560px;">
      ${row('Name', escapeHtml(fullName))}
      ${row('Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`)}
      ${row('Phone', escapeHtml(phoneNumber || '—'))}
      ${row('Submitted', escapeHtml(timestamp))}
      ${row('Message', `<span style="white-space:pre-wrap;">${escapeHtml(message)}</span>`)}
      ${row('WhatsApp', `<a href="${whatsappUrl}">Open this inquiry in WhatsApp</a>`)}
    </table>
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const fullName = String(body?.fullName || '').trim();
  const email = String(body?.email || '').trim();
  const phoneNumber = String(body?.phoneNumber || '').trim();
  const message = String(body?.message || '').trim();

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Full name, email and message are required' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  if (fullName.length > 120 || email.length > 200 || phoneNumber.length > 40 || message.length > 5000) {
    return res.status(400).json({ error: 'One of the fields is too long' });
  }

  const whatsappUrl = buildWhatsAppLink({ fullName, email, message });
  const timestamp = new Date().toISOString();

  try {
    // The acknowledgement to the enquirer is the one that must not fail silently.
    await sendEmail({
      to: [email],
      subject: 'We have received your inquiry — MyBizPush Solutions',
      html: acknowledgementHtml({ fullName, message, whatsappUrl }),
      text:
        `Hi ${fullName},\n\n` +
        'Thank you for reaching out. We have received your inquiry and a member of our team will be in touch within 24 hours.\n\n' +
        `Your message:\n${message}\n\n` +
        `Prefer WhatsApp? ${whatsappUrl}\n\n` +
        'Warm regards,\nThe MyBizPush Solutions Team',
      reply_to: NOTIFY_TO,
    });

    // Internal notification — a failure here should not break the user's flow.
    try {
      await sendEmail({
        to: [NOTIFY_TO],
        subject: `New inquiry: ${fullName}`,
        html: notificationHtml({ fullName, email, phoneNumber, message, whatsappUrl, timestamp }),
        reply_to: email,
      });
    } catch (notifyError) {
      console.error('Failed to send internal notification:', notifyError);
    }

    return res.status(200).json({ success: true, whatsappUrl });
  } catch (error) {
    console.error('Failed to send consultation emails:', error);
    return res.status(502).json({ error: 'We could not send your inquiry. Please try WhatsApp instead.', whatsappUrl });
  }
}
