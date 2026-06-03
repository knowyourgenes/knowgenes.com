/**
 * Single source of truth for knowgenes.com content.
 *
 * Used two ways:
 *   1. As the build-time fallback when Sanity is not configured (sanity/fetch.ts).
 *   2. As the payload pushed into Sanity by `pnpm seed` (sanity/seed.ts).
 *
 * Content transcribed from KYG · Domain Copy · Batch 03 - Site 03, knowgenes.com.
 * The first line of every answer is written to be the exact text a featured
 * snippet or AI assistant would lift directly.
 */

export type CategoryKey = "basics" | "inheritance" | "testing" | "traits-health" | "myths";

export type HomepageContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  searchPlaceholders: string[];
  editorialTitle: string;
  editorialBody: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterSmallprint: string;
  footerMission: string;
};

export type Category = {
  key: CategoryKey;
  slug: string;
  title: string;
  blurb: string;
  order: number;
};

export type FaqItem = {
  slug: string;
  question: string;
  shortAnswer: string;
  explanation: string[];
  category: CategoryKey;
  starter: boolean;
  order: number;
  lastReviewed: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  example: string;
  category: CategoryKey;
  order: number;
};

export type GeneMyth = {
  slug: string;
  myth: string;
  verdict: "Trash" | "Mostly trash" | "Half true" | "True";
  truth: string;
  order: number;
};

const REVIEWED = "2026-05-29";

export const homepageContent: HomepageContent = {
  heroEyebrow: "Start here. Genetics from the beginning.",
  heroHeadline: "Genes, explained in five minutes.",
  heroSubhead:
    "No PhD required. No jargon. The most-asked questions about genes, DNA, inheritance, and genetic testing - answered as plainly as we can manage, reviewed by people who actually know. Free for everyone, forever.",
  heroPrimaryCta: "Browse the basics",
  heroSecondaryCta: "Jump to the glossary",
  searchPlaceholders: ["What is a gene?", "What is DNA made of?", "Can genes change?"],
  editorialTitle: "Editorial standards",
  editorialBody:
    "Every answer here is researched against trusted sources, written in plain language, and reviewed by someone with genetics training before it goes live. We cite where it matters, we update when the science updates, and we say so when something is still unknown. The date of last review appears under each answer.",
  newsletterTitle: "One clearly-explained genetics question, every Friday.",
  newsletterBody:
    "Five minutes. No jargon. The kind of thing you will want to forward to your group chat.",
  newsletterSmallprint: "No ads. No selling. Unsubscribe anytime.",
  footerMission:
    "Plain-language genetics for the curious and the brand-new - reviewed by people who know, free for everyone.",
};

export const categories: Category[] = [
  {
    key: "basics",
    slug: "basics",
    title: "The absolute basics",
    blurb: "Genes, DNA, chromosomes, the genome.",
    order: 1,
  },
  {
    key: "inheritance",
    slug: "inheritance",
    title: "How inheritance works",
    blurb: "What gets passed down, and how.",
    order: 2,
  },
  {
    key: "testing",
    slug: "testing",
    title: "Genetic testing 101",
    blurb: "What a test is, what it can and can't do.",
    order: 3,
  },
  {
    key: "traits-health",
    slug: "traits-health",
    title: "Traits & health",
    blurb: "What genes influence, and how much.",
    order: 4,
  },
  {
    key: "myths",
    slug: "myths",
    title: "Myths & misunderstandings",
    blurb: "What's true, what isn't.",
    order: 5,
  },
];

export const faqItems: FaqItem[] = [
  {
    slug: "what-is-a-gene",
    question: "What is a gene?",
    shortAnswer:
      "A gene is a short stretch of DNA that carries the instructions for one specific job in your body - usually, building a particular protein.",
    explanation: [
      "Think of your DNA as a very long recipe book. A gene is a single recipe in it. Each recipe tells your cells how to make one thing - an enzyme that digests milk, a protein that builds muscle, a pigment that colours your eyes.",
      "Humans have around 20,000 of these protein-coding recipes. Most of your DNA, interestingly, is not recipes at all; it does other regulatory work or has jobs we are still figuring out.",
    ],
    category: "basics",
    starter: true,
    order: 1,
    lastReviewed: REVIEWED,
  },
  {
    slug: "are-genes-and-dna-the-same-thing",
    question: "Are genes and DNA the same thing?",
    shortAnswer:
      "No. DNA is the material; a gene is a section of it. All genes are made of DNA, but not all DNA is genes.",
    explanation: [
      "DNA is the long chemical chain that carries genetic information in every one of your cells. A gene is just a meaningful segment of that chain - one instruction within the whole.",
      "Using the recipe-book picture: DNA is the paper and ink the whole book is printed on, and a gene is one recipe printed on it. The book also contains page numbers, notes, and blank space that are not recipes - much of your DNA is like that.",
    ],
    category: "basics",
    starter: true,
    order: 2,
    lastReviewed: REVIEWED,
  },
  {
    slug: "how-do-genes-actually-work",
    question: "How do genes actually work?",
    shortAnswer:
      "Genes work by telling your cells which proteins to make, and proteins do almost all the real work of keeping you alive.",
    explanation: [
      "When a cell needs a particular protein, it reads the matching gene and uses those instructions to assemble the protein from building blocks. Proteins then do the work - digesting food, carrying oxygen, building tissue, fighting infection.",
      "So a gene rarely 'does' something directly. It is more like a manager handing out instructions, while proteins are the workers who carry them out.",
    ],
    category: "basics",
    starter: true,
    order: 3,
    lastReviewed: REVIEWED,
  },
  {
    slug: "can-my-genes-change-during-my-life",
    question: "Can my genes change during my life?",
    shortAnswer:
      "Your core DNA sequence stays essentially the same for life, but which genes are switched on or off changes constantly.",
    explanation: [
      "You cannot rewrite the instructions you were born with - that sequence is stable. But genes can be turned up, turned down, silenced, or activated depending on your diet, sleep, stress, age, and environment. This dimmer-switch system is called epigenetics.",
      "It is why two people with similar DNA, or even identical twins, can end up with different health over time. The recipe stays the same; how often you cook each dish changes.",
    ],
    category: "traits-health",
    starter: true,
    order: 4,
    lastReviewed: REVIEWED,
  },
  {
    slug: "are-all-my-traits-decided-by-genes",
    question: "Are all my traits decided by genes?",
    shortAnswer:
      "No. Genes influence almost everything about you, but for most traits the environment matters just as much.",
    explanation: [
      "Some traits are strongly genetic - eye colour, blood type, certain diseases. Most everyday traits, like height, weight, personality, and risk for common illnesses, are a mix of many genes plus your environment and choices.",
      "Height, for example, is largely genetic but still depends on childhood nutrition. The honest summary for most traits: genes load the dice, life rolls them.",
    ],
    category: "traits-health",
    starter: true,
    order: 5,
    lastReviewed: REVIEWED,
  },
  {
    slug: "what-is-a-gene-variant",
    question: "What is a gene variant?",
    shortAnswer:
      "A gene variant is a small difference in a gene's spelling that makes one person's version slightly different from another's.",
    explanation: [
      "Everyone has the same set of genes, but the exact spelling differs in tiny ways from person to person. These small differences are called variants. Most are harmless and simply make us individuals - different eye colour, different caffeine tolerance.",
      "A few variants raise or lower the risk of certain conditions. When a genetic test 'finds something', it has usually found a specific variant whose effect has been studied.",
    ],
    category: "inheritance",
    starter: true,
    order: 6,
    lastReviewed: REVIEWED,
  },
  {
    slug: "how-is-a-gene-test-actually-done",
    question: "How is a gene test actually done?",
    shortAnswer:
      "You give a saliva or blood sample, a lab reads specific points in your DNA, and a report tells you what those points say.",
    explanation: [
      "Your sample contains cells, and cells contain your DNA. The lab extracts that DNA and reads it - either checking hundreds of thousands of specific spots (the common consumer approach) or reading whole genes in depth (the clinical approach).",
      "The reading is then compared against research to produce your report. You give the sample once; the DNA itself does not change, so the raw data can be re-read as science advances.",
    ],
    category: "testing",
    starter: true,
    order: 7,
    lastReviewed: REVIEWED,
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "dna",
    term: "DNA",
    definition:
      "The molecule that stores your genetic instructions, written in four letters: A, T, G, C.",
    example: "The 'paper and ink' your whole genetic recipe book is printed on.",
    category: "basics",
    order: 1,
  },
  {
    slug: "gene",
    term: "Gene",
    definition:
      "A section of DNA that carries instructions for one specific job, usually making a protein.",
    example: "One recipe in the book.",
    category: "basics",
    order: 2,
  },
  {
    slug: "genome",
    term: "Genome",
    definition: "Your complete set of DNA - all your genes and everything in between.",
    example: "The entire recipe book, cover to cover.",
    category: "basics",
    order: 3,
  },
  {
    slug: "chromosome",
    term: "Chromosome",
    definition: "A package that stores your DNA; humans have 23 pairs.",
    example: "The chapters the recipes are bound into.",
    category: "basics",
    order: 4,
  },
  {
    slug: "variant",
    term: "Variant",
    definition: "A small difference in a gene's spelling between people.",
    example: "Why you handle coffee differently from a friend.",
    category: "inheritance",
    order: 5,
  },
  {
    slug: "snp",
    term: "SNP",
    definition:
      "A one-letter difference in DNA at a single position; the most common kind of variant.",
    example: "Pronounced 'snip'; the dots a DNA test reads.",
    category: "testing",
    order: 6,
  },
  {
    slug: "allele",
    term: "Allele",
    definition: "One of the alternative versions of a gene you can carry.",
    example: "Brown-eye version vs blue-eye version.",
    category: "inheritance",
    order: 7,
  },
  {
    slug: "protein",
    term: "Protein",
    definition: "The molecule genes instruct your cells to build; proteins do the body's work.",
    example: "The dish the recipe produces.",
    category: "basics",
    order: 8,
  },
  {
    slug: "mutation",
    term: "Mutation",
    definition:
      "A change in DNA; can be inherited or newly arising, harmful, harmless, or helpful.",
    example: "A typo in a recipe - usually trivial, occasionally important.",
    category: "basics",
    order: 9,
  },
  {
    slug: "inheritance",
    term: "Inheritance",
    definition: "How genetic information passes from parents to children.",
    example: "Why you have your mother's eyes.",
    category: "inheritance",
    order: 10,
  },
  {
    slug: "dominant",
    term: "Dominant",
    definition: "A variant that shows its effect even if you carry only one copy.",
    example: "One copy is enough to see the trait.",
    category: "inheritance",
    order: 11,
  },
  {
    slug: "recessive",
    term: "Recessive",
    definition: "A variant that shows its effect only if you carry two copies.",
    example: "Needs a copy from each parent to appear.",
    category: "inheritance",
    order: 12,
  },
  {
    slug: "carrier",
    term: "Carrier",
    definition: "Someone with one copy of a recessive variant who is usually healthy themselves.",
    example: "Can pass it on without having the condition.",
    category: "inheritance",
    order: 13,
  },
  {
    slug: "epigenetics",
    term: "Epigenetics",
    definition: "Changes in which genes are switched on or off, without changing the DNA itself.",
    example: "The dimmer switches on your genes.",
    category: "traits-health",
    order: 14,
  },
  {
    slug: "heritability",
    term: "Heritability",
    definition: "How much of the variation in a trait across people is explained by genes.",
    example: "Height is roughly 80% heritable.",
    category: "traits-health",
    order: 15,
  },
  {
    slug: "polygenic",
    term: "Polygenic",
    definition: "A trait or risk shaped by many genes together, each with a small effect.",
    example: "Height and most common diseases.",
    category: "traits-health",
    order: 16,
  },
  {
    slug: "polygenic-risk-score",
    term: "Polygenic risk score",
    definition:
      "A number summing many small genetic effects to estimate your risk for a condition.",
    example: "'Above or below average', not a diagnosis.",
    category: "testing",
    order: 17,
  },
  {
    slug: "genotype",
    term: "Genotype",
    definition: "The specific set of variants you actually carry.",
    example: "Your version of the recipe book.",
    category: "basics",
    order: 18,
  },
  {
    slug: "phenotype",
    term: "Phenotype",
    definition: "The observable result - your traits, how the genes actually show up.",
    example: "How the dish turns out on the plate.",
    category: "traits-health",
    order: 19,
  },
  {
    slug: "microarray",
    term: "Microarray",
    definition: "A chip that reads hundreds of thousands of DNA spots at once.",
    example: "The standard tool behind most consumer tests.",
    category: "testing",
    order: 20,
  },
];

export const geneMyths: GeneMyth[] = [
  {
    slug: "genes-are-your-destiny",
    myth: "Your genes are your destiny.",
    verdict: "Trash",
    truth:
      "For most traits and common diseases, genes set a tendency, not an outcome. Lifestyle, environment, and chance often matter as much or more. A high genetic risk for type 2 diabetes, for instance, can be roughly halved by diet and activity.",
    order: 1,
  },
  {
    slug: "we-use-most-of-our-dna-to-make-proteins",
    myth: "We use most of our DNA to make proteins.",
    verdict: "Trash",
    truth:
      "Only about 1 to 2 percent of your DNA codes for proteins. The rest does regulatory work, has other functions, or has roles science is still uncovering. 'Junk DNA' turned out to be a misleading nickname.",
    order: 2,
  },
  {
    slug: "theres-a-single-gene-for-intelligence",
    myth: "There's a single gene for intelligence, happiness, or athletic ability.",
    verdict: "Trash",
    truth:
      "These traits are polygenic - shaped by hundreds or thousands of genes, each with a tiny effect, plus heavy environmental influence. Any headline announcing 'the gene for X behaviour' is almost always overstating one small study.",
    order: 3,
  },
  {
    slug: "identical-twins-are-genetically-identical-for-life",
    myth: "Identical twins are genetically identical for life.",
    verdict: "Mostly trash",
    truth:
      "They start with the same DNA, but accumulate small differences over time, and crucially, different genes get switched on and off through life. By adulthood, identical twins are very similar but not perfectly identical at the molecular level.",
    order: 4,
  },
  {
    slug: "a-consumer-dna-test-can-diagnose-diseases",
    myth: "A consumer DNA test can diagnose diseases.",
    verdict: "Trash",
    truth:
      "Consumer tests estimate risk and report traits; they do not diagnose. A flagged risk should be confirmed with a proper clinical test before anyone acts on it medically. They are useful for context, not for diagnosis.",
    order: 5,
  },
  {
    slug: "baldness-comes-only-from-your-mothers-side",
    myth: "Baldness comes only from your mother's side.",
    verdict: "Half true",
    truth:
      "A major hair-loss variant does sit on the X chromosome, which men inherit from their mothers - so the old rule captures something real. But over 200 markers across many chromosomes contribute, and they can come from either parent. Both sides count.",
    order: 6,
  },
  {
    slug: "if-a-disease-isnt-in-your-family-you-cant-get-the-genetic-form",
    myth: "If a disease isn't in your family, you can't get the genetic form.",
    verdict: "Trash",
    truth:
      "Conditions can appear from new mutations, from recessive variants both healthy parents quietly carry, or simply because family history records are incomplete. 'No family history' lowers the odds but does not rule out risk.",
    order: 7,
  },
  {
    slug: "your-ancestry-percentages-are-exact-facts",
    myth: "Your ancestry percentages are exact facts.",
    verdict: "Trash",
    truth:
      "They are statistical estimates with confidence ranges, compared against reference databases that keep changing. The same DNA can read differently across companies and across years. Treat the percentages as broad strokes, not precise truths.",
    order: 8,
  },
];
