/**
 * MVP seed data (lawyers + case studies). Used by CLI `npm run seed` and auto-seed on startup.
 */
const User = require('../models/User');
const Lawyer = require('../models/Lawyer');
const CaseStudy = require('../models/CaseStudy');

const SEED_EMAIL_DOMAIN = '@seed.nyaya-sarthi.test';
const SEED_TAG = 'seed-landmark-mvp';

const LAWYERS = [
  {
    name: 'Adv. Ramesh Sharma',
    email: `ramesh.sharma${SEED_EMAIL_DOMAIN}`,
    barCouncilId: 'SEED/BAR/0001',
    specializations: ['criminal', 'constitutional'],
    languages: ['en', 'hi'],
    city: 'Patna',
    state: 'Bihar',
    coordinates: [85.1376, 25.5941],
    consultationFee: 1500,
    isProBono: true,
    isEmergencyAvailable: true,
    rating: 4.8,
    totalReviews: 42,
    experience: 12,
    education: 'LL.B., Patna Law College',
    bio: 'Practises criminal trial work and constitutional remedies; mentors junior advocates and takes pro bono matters for indigent clients.',
  },
  {
    name: 'Adv. Meera Nair',
    email: `meera.nair${SEED_EMAIL_DOMAIN}`,
    barCouncilId: 'SEED/BAR/0002',
    specializations: ['labour', 'civil'],
    languages: ['en', 'hi', 'kn'],
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: [77.5946, 12.9716],
    consultationFee: 2500,
    isProBono: false,
    isEmergencyAvailable: true,
    rating: 4.9,
    totalReviews: 67,
    experience: 9,
    education: 'LL.M. (Labour Law), NLSIU',
    bio: 'Workplace harassment, POSH compliance, and employment termination disputes for professionals and startups.',
  },
  {
    name: 'Adv. Vikram Singh',
    email: `vikram.singh${SEED_EMAIL_DOMAIN}`,
    barCouncilId: 'SEED/BAR/0003',
    specializations: ['property', 'consumer'],
    languages: ['en', 'hi'],
    city: 'New Delhi',
    state: 'Delhi',
    coordinates: [77.209, 28.6139],
    consultationFee: 3000,
    isProBono: false,
    isEmergencyAvailable: false,
    rating: 4.6,
    totalReviews: 31,
    experience: 15,
    education: 'LL.B., Faculty of Law, Delhi University',
    bio: 'Tenant–landlord disputes, security deposit recovery, and RERA-aligned advice for homebuyers.',
  },
  {
    name: 'Adv. Anita Desai',
    email: `anita.desai${SEED_EMAIL_DOMAIN}`,
    barCouncilId: 'SEED/BAR/0004',
    specializations: ['family', 'civil'],
    languages: ['en', 'hi', 'mr'],
    city: 'Mumbai',
    state: 'Maharashtra',
    coordinates: [72.8777, 19.076],
    consultationFee: 2800,
    isProBono: true,
    isEmergencyAvailable: true,
    rating: 4.7,
    totalReviews: 55,
    experience: 11,
    education: 'LL.M. (Family Law), Mumbai University',
    bio: 'Divorce, maintenance, custody, and protection orders; sensitive handling of domestic crises.',
  },
  {
    name: 'Adv. Kavita Yadav',
    email: `kavita.yadav${SEED_EMAIL_DOMAIN}`,
    barCouncilId: 'SEED/BAR/0005',
    specializations: ['property', 'criminal'],
    languages: ['en', 'hi'],
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    coordinates: [82.9739, 25.3176],
    consultationFee: 1200,
    isProBono: true,
    isEmergencyAvailable: false,
    rating: 4.5,
    totalReviews: 28,
    experience: 8,
    education: 'LL.B., BHU',
    bio: 'Land encroachment, boundary disputes, and allied criminal complaints for rural and semi-urban clients.',
  },
];

const CASE_STUDIES = [
  {
    title: 'Vishaka v. State of Rajasthan (1997)',
    year: 1997,
    court: 'Supreme Court of India',
    legalDomain: 'labour',
    summary:
      'Landmark guidelines on workplace sexual harassment that later shaped the POSH Act framework for safer offices across India.',
    fullExplainer:
      'A group of social workers and NGOs, led by Vishaka, challenged the failure of the State to prevent sexual harassment at work. The Supreme Court held that sexual harassment violates fundamental rights to equality, life, and liberty under Articles 14, 15, 19(1)(g), and 21. Until Parliament enacted detailed law, the Court issued binding Vishaka Guidelines placing duties on employers to prevent harassment, set up complaints committees, and provide remedies. The decision recognised harassment as a structural barrier to women’s participation in the workforce and imported international human rights standards into domestic jurisprudence.',
    impact:
      'Forced institutions to adopt written anti-harassment policies and redress channels; laid the intellectual foundation for the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.',
    relatedLaws: [
      'Constitution of India, 1950 – Articles 14, 15, 19(1)(g), and 21',
      'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    ],
    tags: [SEED_TAG, 'landmark', 'women-rights', 'workplace'],
  },
  {
    title: 'Mohd. Ahmed Khan v. Shah Bano Begum (1985)',
    year: 1985,
    court: 'Supreme Court of India',
    legalDomain: 'family',
    summary:
      'A divorced Muslim woman’s claim for maintenance under the Code of Criminal Procedure sparked a nationwide debate on gender justice and personal laws.',
    fullExplainer:
      'Shah Bano, an elderly woman, sought maintenance under Section 125 CrPC after her husband pronounced irrevocable talaq. The Supreme Court upheld her right to maintenance, interpreting Section 125 as a secular social welfare measure applicable regardless of personal law, absent an enforceable agreement to the contrary. The judgment examined Quranic verses cited by parties and concluded they supported reasonable provision for divorced wives. Politically, the decision triggered legislative responses on Muslim personal law, but legally it remains a touchstone for discussions on intersection of uniform welfare statutes and personal laws.',
    impact:
      'Raised public consciousness about economic vulnerability after divorce and influenced later statutory reforms and litigation strategies on maintenance across communities.',
    relatedLaws: [
      'Code of Criminal Procedure, 1973 – Section 125 (maintenance of wives, children, and parents)',
    ],
    tags: [SEED_TAG, 'landmark', 'maintenance', 'personal-law'],
  },
  {
    title: 'Kesavananda Bharati v. State of Kerala (1973)',
    year: 1973,
    court: 'Supreme Court of India',
    legalDomain: 'constitutional',
    summary:
      'The largest Constitution Bench decision that introduced the “basic structure” doctrine, limiting Parliament’s power to amend core features of the Constitution.',
    fullExplainer:
      'A religious institution challenged land reform laws affecting its property. The Court had to decide how far Parliament could amend fundamental rights. In a fractured but historic majority, the Court held that while Parliament can amend any part of the Constitution under Article 368, it cannot use that power to “damage or destroy” the basic structure or essential features of the Constitution. Judges offered varying lists of what counts as basic structure—including democracy, secularism, judicial review, federalism, and the rule of law—leaving future benches to elaborate case by case.',
    impact:
      'Empowered courts to strike down constitutional amendments that undermine foundational principles, shaping every major constitutional dispute since the Emergency era.',
    relatedLaws: [
      'Constitution of India, 1950 – Article 368 (power to amend) read with judicial review under Articles 32 and 226',
    ],
    tags: [SEED_TAG, 'landmark', 'basic-structure', 'constitutional-law'],
  },
  {
    title: 'Maneka Gandhi v. Union of India (1978)',
    year: 1978,
    court: 'Supreme Court of India',
    legalDomain: 'constitutional',
    summary:
      'Expanded the right to travel abroad into a springboard for “golden triangle” rights, requiring fair procedure whenever the State restricts personal liberty.',
    fullExplainer:
      'The government impounded Maneka Gandhi’s passport under the Passports Act without giving adequate reasons. She challenged the order as violating Articles 14, 19, and 21. The Supreme Court held that any law affecting personal liberty under Article 21 must be just, fair, and reasonable, not merely procedurally valid. It interconnected Articles 14, 19, and 21, ruling that substantive due process–style scrutiny applies. The decision overruled earlier narrow readings of “procedure established by law” and required hearing, reasons, and non-arbitrariness in executive actions curtailing movement and expression.',
    impact:
      'Strengthened civil liberties jurisprudence for passport seizures, detentions, and a wide range of administrative actions touching life and personal liberty.',
    relatedLaws: [
      'Constitution of India, 1950 – Articles 14, 19(1)(a) and (g), and 21',
      'Passports Act, 1967',
    ],
    tags: [SEED_TAG, 'landmark', 'personal-liberty', 'passport'],
  },
  {
    title: 'Justice K.S. Puttaswamy v. Union of India (2017)',
    year: 2017,
    court: 'Supreme Court of India',
    legalDomain: 'constitutional',
    summary:
      'Nine-judge Bench unanimously recognised privacy as a fundamental right, reshaping digital governance, biometrics programmes, and data protection debates.',
    fullExplainer:
      'Senior advocate Puttaswamy challenged the constitutional validity of Aadhaar-era surveillance and data collection practices. The Court declared that privacy is intrinsic to dignity and autonomy under Article 21 and permeates Part III rights. While subsequent Aadhaar judgments balanced state interests and proportionality, Puttaswamy set the analytic framework: any intrusion must pass a three-pronged test of legality, legitimate aim, and proportionality. The ruling catalysed India’s modern data protection legislation discourse and informs litigation on surveillance, biometrics, and informational self-determination.',
    impact:
      'Anchored constitutional challenges to mass data projects, informed the design of statutory privacy safeguards, and empowered citizens to question unchecked state and corporate data practices.',
    relatedLaws: [
      'Constitution of India, 1950 – Article 21 (life and personal liberty) and dignity jurisprudence',
      'Information Technology Act, 2000 – contextual interplay with data security norms',
    ],
    tags: [SEED_TAG, 'landmark', 'privacy', 'aadhaar'],
  },
];

async function wipeSeedData() {
  await Lawyer.deleteMany({ barCouncilId: /^SEED\// });
  await User.deleteMany({ email: /@seed\.nyaya-sarthi\.test$/ });
  await CaseStudy.deleteMany({ tags: SEED_TAG });
}

async function insertLawyersAndCaseStudies() {
  const plainPassword = 'SeedPass123!';

  for (const L of LAWYERS) {
    const user = await User.create({
      name: L.name,
      email: L.email,
      password: plainPassword,
      role: 'lawyer',
      preferredLanguage: 'en',
    });

    await Lawyer.create({
      userId: user._id,
      barCouncilId: L.barCouncilId,
      isVerified: true,
      verifiedAt: new Date(),
      specializations: L.specializations,
      languages: L.languages,
      location: {
        city: L.city,
        state: L.state,
        coordinates: {
          type: 'Point',
          coordinates: L.coordinates,
        },
      },
      consultationFee: L.consultationFee,
      isProBono: L.isProBono,
      isEmergencyAvailable: L.isEmergencyAvailable,
      rating: L.rating,
      totalReviews: L.totalReviews,
      bio: L.bio,
      experience: L.experience,
      education: L.education,
    });
  }

  for (const c of CASE_STUDIES) {
    await CaseStudy.create({
      ...c,
      isPublished: true,
    });
  }
}

/**
 * Full re-seed (CLI): wipes prior seed rows, then inserts.
 */
async function runMvpSeed({ wipe = false } = {}) {
  if (wipe) {
    await wipeSeedData();
  }
  await insertLawyersAndCaseStudies();
  console.log(
    `Seeded ${LAWYERS.length} lawyers and ${CASE_STUDIES.length} case studies${wipe ? ' (wiped previous seed)' : ''}.`
  );
}

/**
 * Startup: if Lawyer collection is empty, insert MVP lawyers + landmark cases (no wipe).
 */
async function seedIfLawyerCollectionEmpty() {
  const n = await Lawyer.countDocuments();
  if (n > 0) {
    return;
  }
  console.log('Lawyer collection empty — running MVP auto-seed…');
  await insertLawyersAndCaseStudies();
  console.log(`Auto-seeded ${LAWYERS.length} lawyers and ${CASE_STUDIES.length} case studies.`);
}

module.exports = {
  runMvpSeed,
  seedIfLawyerCollectionEmpty,
  LAWYERS,
  CASE_STUDIES,
  SEED_TAG,
};
