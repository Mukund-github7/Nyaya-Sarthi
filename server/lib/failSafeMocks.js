/**
 * TRD-aligned fallback payloads when OpenAI (or upstream) is unavailable.
 */

function lexbotFailSafeReply(userMessage) {
  const snippet = (userMessage || '').slice(0, 120).trim();
  const reply =
    'Nyaya Sarthi is operating in **assurance mode** while the live AI engine is unavailable. The following is general educational information only.\n\n' +
    '**Advise:** In many **family-law** situations involving cruelty, harassment, or violence in a marriage or shared household, **Section 498A of the Indian Penal Code, 1860** (where facts support it) and reliefs under the **Protection of Women from Domestic Violence Act, 2005** are frequently discussed before police and courts.\n\n' +
    '**Immediate steps:** Prioritise your safety; consider the **Women Helpline (1091)** or **112** in emergencies, preserve evidence safely, and consult a qualified advocate for filing-specific strategy.\n\n' +
    (snippet ? `_(You wrote: “${snippet}…”)_\n\n` : '') +
    'यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है और वकील की सलाह का स्थान नहीं लेती। | This information is for educational purposes only and does not constitute legal advice.';

  const metadata = {
    legalDomain: 'family',
    severityLevel: 'high',
    citedLaws: [
      'Indian Penal Code, 1860 – Section 498A: Cruelty by husband or relatives of husband',
      'Protection of Women from Domestic Violence Act, 2005 – Sections 12, 18–22: Protection and residence orders',
      'Code of Criminal Procedure, 1973 – Section 125: Maintenance of wives, children and parents',
    ],
    suggestedActions: [
      'Document dates, witnesses, and medical or electronic evidence where safe to do so',
      'Book a verified lawyer on Nyaya Sarthi for situation-specific drafting and court strategy',
    ],
    emergencyHelplines: null,
    disclaimer:
      'यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। कृपया एक योग्य अधिवक्ता से परामर्श करें। | This information is for educational purposes only and does not constitute legal advice. Please consult a qualified advocate.',
  };

  return { reply, metadata };
}

function documentFailSafeAnalysis() {
  return {
    documentType: 'general_legal_document',
    overallRisk: 'high',
    summary:
      'Assurance mode: automated document analysis is temporarily unavailable. This report highlights common risk themes in Indian agreements so you can still review priorities with a lawyer.',
    redFlags: [
      {
        clause: 'One-sided termination or extremely short notice to vacate',
        explanation:
          'Such terms may be contested where rent-control or tenancy protections apply; they can also be unconscionable depending on facts.',
        relevantLaw:
          'Transfer of Property Act, 1882 – Sections 105-106; applicable state rent and tenancy statutes',
        severity: 'high',
      },
    ],
    cautionPoints: [
      {
        clause: 'Broad indemnity / waiver of consequential damages',
        explanation:
          'Courts may read unreasonable waivers narrowly, but they can still leave you without practical recovery.',
      },
    ],
    standardClauses: [
      'Clear identification of parties, rent or consideration, and security deposit handling',
      'Dispute resolution clause naming jurisdiction',
    ],
    userAdvice:
      'Re-run analysis when the service is healthy, or paste key clauses into LexBot. Do not sign high-stakes documents without an advocate’s review.',
  };
}

module.exports = { lexbotFailSafeReply, documentFailSafeAnalysis };
