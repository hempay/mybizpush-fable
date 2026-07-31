/**
 * Helpers for building WhatsApp deep links.
 *
 * The phone number lives in VITE_WHATSAPP_PHONE (international format, digits only)
 * and falls back to the company line.
 */

export const WHATSAPP_PHONE =
  import.meta.env.VITE_WHATSAPP_PHONE || '2347079084071';

const BASE_URL = 'https://api.whatsapp.com/send';

export interface WhatsAppInquiry {
  fullName?: string;
  email?: string;
  message?: string;
}

/**
 * Builds the WhatsApp link, pre-filling the message with whatever the visitor
 * typed into the form. With no details it degrades to a plain "making an inquiry".
 */
export function buildWhatsAppLink(inquiry: WhatsAppInquiry = {}): string {
  const fullName = inquiry.fullName?.trim();
  const email = inquiry.email?.trim();
  const message = inquiry.message?.trim();

  const lines = ['Hello, i am making an inquiry.'];

  if (fullName || email) {
    lines.push('');
    if (fullName) lines.push(`Name: ${fullName}`);
    if (email) lines.push(`Email: ${email}`);
  }

  if (message) {
    lines.push('');
    lines.push(message);
  }

  return `${BASE_URL}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join('\n'))}`;
}

/** Opens the WhatsApp chat in a new tab. */
export function openWhatsApp(inquiry: WhatsAppInquiry = {}): void {
  window.open(buildWhatsAppLink(inquiry), '_blank', 'noopener,noreferrer');
}
