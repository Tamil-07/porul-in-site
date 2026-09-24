// Founder-confirmed public WhatsApp contact. Keep one destination for all enquiry paths.
export const whatsappNumber = "918939357690";
export const whatsappDisplay = "+91 89393 57690";
export const whatsappUrl = (message = "") =>
  `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
