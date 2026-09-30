// Shared DSC service facts keep visible FAQs and structured data in sync.
export const dscService = {
  name: "Digital Signature Certificate support for GeM",
  description: "Porul.in helps Tamil Nadu GeM users obtain a Digital Signature Certificate and USB token through its PantaSign and emSigner partner channels.",
  path: "/digital-signature-for-gem/",
  email: "hello@porul.in",
  serviceType: "Digital Signature Certificate for GeM bidding",
  areaServed: ["Tamil Nadu"]
};

export const dscFaqs = [
  {
    question: "Is a DSC mandatory for every GeM seller?",
    answer: "No universal rule should be assumed. GeM's published guidance says documents and transactions can be verified using OTP, eSign or a Digital Signature Certificate. A particular bid, transaction or portal step may require a DSC, so check the current GeM prompt and the bid document before ordering one."
  },
  {
    question: "Can Porul provide a Digital Signature Certificate for GeM bidding?",
    answer: "Yes. Porul works through PantaSign and emSigner partner channels to support DSC issuance for GeM users. Porul confirms the applicant, certificate configuration, validity, USB-token terms, fee and KYC process in writing before payment."
  },
  {
    question: "Which DSC should I buy for GeM?",
    answer: "The right certificate depends on the transaction, the bid instructions, the applicant and the authorised signatory. Porul can review that context before quoting a Class 3 DSC. Do not buy solely from a generic checklist when a live bid specifies different requirements."
  },
  {
    question: "Is a USB token included with the DSC?",
    answer: "Porul has USB tokens available, but the certificate, token, validity and any support included must be stated in the written quote for your order. No standard package price or configuration is published on this page."
  },
  {
    question: "Can I use an existing DSC or token on GeM?",
    answer: "Possibly, if the certificate is valid, belongs to the correct authorised signatory and is compatible with the required workflow. Share the certificate type, expiry date and the portal step or bid requirement; never share the token PIN in an initial enquiry."
  },
  {
    question: "What should I send in the first enquiry?",
    answer: "Send your business name, applicant or authorised-signatory role, whether you already have a DSC or token, the GeM bid link or ID where relevant, and the deadline. Do not send Aadhaar, PAN, passwords, OTPs, DSC PINs or bank records in the initial message."
  },
  {
    question: "Is Porul affiliated with GeM or the government?",
    answer: "No. Porul.in is an independent service provider. GeM decides its portal requirements, and the relevant issuing provider completes certificate issuance after the required verification."
  }
];

export const dscGuideFaqs = [
  {
    question: "Is DSC compulsory for GeM registration?",
    answer: "Do not assume that a DSC is compulsory merely to begin seller registration. GeM's published workflow describes OTP, eSign and DSC verification. Follow the method shown in the current portal for your account and transaction."
  },
  {
    question: "Is DSC compulsory for submitting a GeM bid?",
    answer: "A bid or its additional conditions may require a valid Digital Signature Certificate, while GeM also supports eSign for certain transactions. Read the live bid document and the signing step before deciding which method applies."
  },
  {
    question: "What is the difference between eSign and DSC on GeM?",
    answer: "GeM describes eSign as an online verification route and DSC as certificate-based signing. The available method can depend on the transaction and portal workflow. A USB-token DSC should not be presented as universally necessary when eSign is accepted for the task."
  }
];
