import { Link, useLocation } from "react-router-dom";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Persistent WhatsApp entry point. It routes to /whatsapp so we can collect the
 * visitor's name, email and inquiry before handing them to the chat.
 */
export function WhatsAppFloatingButton() {
  const { pathname } = useLocation();

  // Don't shadow the page it links to, or clutter the admin screen.
  if (pathname === "/whatsapp" || pathname.startsWith("/admin")) return null;

  return (
    <Link
      to="/whatsapp"
      data-cursor
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-[9992] flex items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5 py-3.5 text-white shadow-[0_10px_40px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform duration-300"
    >
      <WhatsAppIcon size={22} />
      <span className="hidden sm:inline font-display font-bold text-sm tracking-wide">
        Chat with us
      </span>
    </Link>
  );
}
