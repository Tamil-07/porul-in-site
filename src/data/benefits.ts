// Visible answers and homepage FAQ schema share a single source.
export const benefitsService = {
  name: "MSME benefits review for manufacturers",
  description: "Porul reviews central and state MSME schemes for manufacturing businesses in Tamil Nadu and Karnataka, explaining conditions and next steps to check.",
  path: "/msme-benefits/",
  email: "hello@porul.in",
  serviceType: "MSME benefits scheme review",
  areaServed: ["Tamil Nadu", "Karnataka"]
};

export const benefitsFaqs = [
  { question: "Will you tell me whether I am eligible?", answer: "Porul reviews schemes that may apply and explains conditions and missing information. An enquiry is not an eligibility decision. Final eligibility and approval rest with the relevant authority, under the current scheme rules." },
  { question: "Can I enquire after buying machinery or starting production?", answer: "Yes. Tell us your location and stage. Timing can matter, so include when production started or when machinery was purchased if relevant. We check the applicable official rules before drawing a conclusion; having already purchased machinery does not by itself settle eligibility." },
  { question: "What should I share first?", answer: "Start with what you manufacture, your district and state, and whether you are planning, producing or expanding. Do not send identity numbers, bank documents, passwords or OTPs in your initial enquiry." },
  { question: "Is the first review free?", answer: "No free assessment is promised on this website. We confirm the scope and any fee before an assessment begins. Preparing an enquiry does not book a service or create a payment obligation." },
  { question: "Does an assessment include filing applications?", answer: "No. Filing applications, dealing with departments, appeals and arranging loans are not included in an assessment. Additional work requires a separate capability and scope review; do not assume Porul can undertake it." }
];
