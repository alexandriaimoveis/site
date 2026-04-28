import { BsWhatsapp } from "react-icons/bs";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5535987131293"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:bg-[#1ebe5c]"
      aria-label="Abrir WhatsApp"
    >
      <BsWhatsapp className="text-2xl" />
    </a>
  );
}
