/**
 * Centralized FAQ Knowledge Base for Design N Print
 * Used for Schema.org FAQPage generation, AI citations (GEO), and UI components.
 * Written with authentic print shop expertise (Anti-AI-Slop).
 */

export interface PrintFaqItem {
  id: string;
  category: "speed" | "artwork" | "proofs" | "pricing" | "delivery";
  question: string;
  answer: string;
}

export const homePageFaqs: PrintFaqItem[] = [
  {
    id: "turnaround-speed",
    category: "speed",
    question: "What is the turnaround time for commercial print and packaging orders?",
    answer: "Standard commercial print runs such as corporate visiting cards, brochures, flyers, and sticker rolls take 24 to 48 hours from proof approval. Custom packaging mono-cartons, MetPET cartons, hot foil stamping, and embossed presentation folders take 3 to 5 business days. Same-day emergency rush dispatch is available across Ahmedabad industrial estates.",
  },
  {
    id: "artwork-dielines",
    category: "artwork",
    question: "Can Design N Print design our packaging dielines and artwork from scratch?",
    answer: "Yes. Our in-house prepress team and packaging engineers build custom CAD dielines, lock-bottom carton structures, pharmaceutical catch covers, and corporate identity layouts. You will receive calibrated 3D digital mockups to inspect dimensions and folding logic before physical plates are imaged.",
  },
  {
    id: "file-specifications",
    category: "artwork",
    question: "What file formats and print specifications are required for offset printing?",
    answer: "We accept PDF (PDF/X-1a preferred), CorelDraw (CDR with all text converted to curves), Adobe Illustrator (AI), and layered Photoshop (PSD). Artwork must be in CMYK color mode (not RGB), at least 300 DPI resolution at actual print scale, with 3mm external bleed on all trim edges and a 4mm safe margin.",
  },
  {
    id: "proofing-guarantee",
    category: "proofs",
    question: "Do you provide a physical or digital proof before mass plate production?",
    answer: "Yes, we enforce a strict 100% Pre-Print Proof Sign-off policy. Before CTP plates are exposed or spot inks are formulated, we share high-resolution PDF proofs. For custom mono-cartons and rigid boxes, physical unprinted structural dieline dummies can also be inspected at our Naroda GIDC facility.",
  },
  {
    id: "minimum-order-quantities",
    category: "pricing",
    question: "What are your Minimum Order Quantities (MOQ)?",
    answer: "We support both emerging brands and high-volume industrial corporations: Premium business cards start from 100 pcs, customized labels from 500 pcs, and folding mono-cartons from 500 pcs. Substantial economies of scale apply for volume runs of 5,000 to 500,000+ units.",
  },
  {
    id: "delivery-coverage",
    category: "delivery",
    question: "Do you deliver across Ahmedabad industrial zones and other Gujarat districts?",
    answer: "Yes. We offer daily direct logistics delivery across all Ahmedabad GIDC estates including Naroda, Odhav, Vatva, Sanand, Changodar, Kathwada, and Kalol. We also ship express cargo and parcel freight daily to Surat, Vadodara, Rajkot, Jamnagar, Morbi, and nationwide.",
  },
];
