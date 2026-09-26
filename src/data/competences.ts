/**
 * src/data/competences.ts
 *
 * Source unique de vérité pour la section Compétences (Module 6).
 *
 * Entité DomaineCompetences → Competence, conforme au modèle de données §4.1 du CdC.
 *
 * Les compétences et leurs niveaux sont dérivés des technologies réellement
 * utilisées dans les projets de src/data/projets.ts. Les identifiants dans
 * projetsAssocies correspondent aux champs `identifiant` de ce fichier.
 */

export type NiveauCompetence = 'notion' | 'opérationnel' | 'avancé';

export interface Competence {
  id: string;
  nom: string;
  niveau: NiveauCompetence;
  /**
   * Niveau indicatif en pourcentage (0-100) pour l'affichage visuel.
   * Corrélation orientative : notion ≈ 35-45 | opérationnel ≈ 65-75 | avancé ≈ 85-95
   */
  pourcentage: number;
  /** Identifiants des projets de projets.ts qui démontrent cette compétence */
  projetsAssocies: string[];
}

export interface DomaineCompetences {
  id: string;
  nom: string;
  /** Libellé court pour les onglets de navigation */
  labelCourt: string;
  competences: Competence[];
}

export const DOMAINES_COMPETENCES: DomaineCompetences[] = [
  // ── 1. Développement Web ──────────────────────────────────────────────────
  {
    id: 'dev-web',
    nom: 'Développement Web',
    labelCourt: 'Dev Web',
    competences: [
      {
        id: 'react',
        nom: 'React',
        niveau: 'avancé',
        pourcentage: 85,
        projetsAssocies: ['best-building-web-platform', 'unipath-gestion-concours', 'digilib'],
      },
      {
        id: 'nextjs',
        nom: 'Next.js',
        niveau: 'opérationnel',
        pourcentage: 72,
        projetsAssocies: ['best-building-web-platform'],
      },
      {
        id: 'typescript',
        nom: 'TypeScript',
        niveau: 'avancé',
        pourcentage: 82,
        projetsAssocies: ['best-building-web-platform', 'unipath-gestion-concours', 'digilib'],
      },
      {
        id: 'tailwind',
        nom: 'Tailwind CSS',
        niveau: 'avancé',
        pourcentage: 85,
        projetsAssocies: ['best-building-web-platform', 'unipath-gestion-concours', 'blog-lecture'],
      },
      {
        id: 'vite',
        nom: 'Vite',
        niveau: 'opérationnel',
        pourcentage: 70,
        projetsAssocies: ['unipath-gestion-concours', 'blog-lecture', 'digilib'],
      },
      {
        id: 'nodejs-express',
        nom: 'Node.js / Express',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['unipath-gestion-concours'],
      },
      {
        id: 'laravel-php',
        nom: 'Laravel / PHP',
        niveau: 'opérationnel',
        pourcentage: 65,
        projetsAssocies: ['blog-lecture'],
      },
      {
        id: 'django',
        nom: 'Django',
        niveau: 'notion',
        pourcentage: 45,
        projetsAssocies: ['best-building-web-platform'],
      },
      {
        id: 'streamlit',
        nom: 'Streamlit',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['dantokpa-prediction-pourriture'],
      },
    ],
  },

  // ── 2. Data & Intelligence Artificielle ───────────────────────────────────
  {
    id: 'data-ia',
    nom: 'Data & Intelligence Artificielle',
    labelCourt: 'Data & IA',
    competences: [
      {
        id: 'python',
        nom: 'Python',
        niveau: 'avancé',
        pourcentage: 85,
        projetsAssocies: ['dantokpa-prediction-pourriture'],
      },
      {
        id: 'pandas',
        nom: 'pandas',
        niveau: 'opérationnel',
        pourcentage: 72,
        projetsAssocies: ['dantokpa-prediction-pourriture'],
      },
      {
        id: 'numpy',
        nom: 'NumPy',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['dantokpa-prediction-pourriture'],
      },
      {
        id: 'monte-carlo',
        nom: 'Simulation Monte-Carlo',
        niveau: 'opérationnel',
        pourcentage: 65,
        projetsAssocies: ['dantokpa-prediction-pourriture'],
      },
    ],
  },

  // ── 3. Bases de données ───────────────────────────────────────────────────
  {
    id: 'bases-donnees',
    nom: 'Bases de données',
    labelCourt: 'Bases de données',
    competences: [
      {
        id: 'postgresql',
        nom: 'PostgreSQL',
        niveau: 'avancé',
        pourcentage: 80,
        projetsAssocies: ['best-building-web-platform', 'unipath-gestion-concours'],
      },
      {
        id: 'prisma',
        nom: 'Prisma',
        niveau: 'opérationnel',
        pourcentage: 70,
        projetsAssocies: ['unipath-gestion-concours'],
      },
      {
        id: 'supabase',
        nom: 'Supabase',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['unipath-gestion-concours', 'digilib'],
      },
      {
        id: 'mysql',
        nom: 'MySQL',
        niveau: 'opérationnel',
        pourcentage: 65,
        projetsAssocies: ['blog-lecture'],
      },
    ],
  },

  // ── 4. Outils & Déploiement ────────────────────────────────────────────────
  {
    id: 'outils-deploiement',
    nom: 'Outils & Déploiement',
    labelCourt: 'Outils',
    competences: [
      {
        id: 'git-github',
        nom: 'Git / GitHub',
        niveau: 'avancé',
        pourcentage: 82,
        projetsAssocies: ['dantokpa-prediction-pourriture', 'blog-lecture'],
      },
      {
        id: 'vercel',
        nom: 'Vercel',
        niveau: 'opérationnel',
        pourcentage: 72,
        projetsAssocies: ['best-building-web-platform', 'unipath-gestion-concours', 'digilib'],
      },
      {
        id: 'api-externes',
        nom: 'Intégration d\'API externes',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['dantokpa-prediction-pourriture'],
      },
      {
        id: 'flutterwave',
        nom: 'Flutterwave (paiement)',
        niveau: 'notion',
        pourcentage: 42,
        projetsAssocies: ['digilib'],
      },
    ],
  },
];
