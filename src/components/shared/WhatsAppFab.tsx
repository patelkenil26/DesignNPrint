import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppLink } from "@/data/siteConfig";

/** Always-reachable WhatsApp button (bottom-left). Pulses softly; the label slides out on hover / focus. */
export default function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppLink("Hi Design N Print, I would like to know more.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Design N Print on WhatsApp"
      className="group fixed bottom-4 left-4 z-40 flex h-12 items-center sm:bottom-5 sm:left-5 sm:h-14 overflow-hidden rounded-full bg-whatsapp text-ink shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
        <span className="absolute inset-2 animate-ping rounded-full bg-whatsapp opacity-40 motion-reduce:hidden" aria-hidden="true" />
        <FaWhatsapp size={26} className="relative" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:pr-5 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:pr-5 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
