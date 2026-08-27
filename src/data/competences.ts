/**
 * src/data/competences.ts
 *
 * Source unique de vérité pour la section Compétences (Module 6).
 *
 * Entité DomaineCompetences → Competence, conforme au modèle de données §4.1 du CdC.
 *
 * Règle de gestion critique (§ Module 6) :
 *   Toute compétence avec niveau 'avancé' DOIT avoir projetsAssocies non vide.
 *   Un console.warn est émis en développement si cette règle est violée (Skills.tsx).
 *
 * [COPYWRITING] — noms, niveaux, pourcentages et projets associés à affiner
 *   lors de la passe finale. Les identifiants dans projetsAssocies correspondent
 *   aux champs `identifiant` de src/data/projets.ts.
 */

export type NiveauCompetence = 'notion' | 'opérationnel' | 'avancé';

export interface Competence {
  id: string;
  nom: string;
  niveau: NiveauCompetence;
  /**
   * Niveau indicatif en pourcentage (0-100) pour l'affichage visuel.
   * Corrélation orientative : notion ≈ 35-45 | opérationnel ≈ 65-75 | avancé ≈ 85-95
   * [COPYWRITING] — à affiner lors de la passe finale.
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
  // ── 1. Infrastructure & Réseaux ──────────────────────────────────────────
  {
    id: 'infra-reseaux',
    nom: 'Infrastructure & Réseaux',
    labelCourt: 'Réseaux',
    competences: [
      {
        id: 'cisco-ios',
        nom: 'Cisco IOS',
        niveau: 'opérationnel',
        pourcentage: 72,
        projetsAssocies: ['infrastructure-dmz-securisee-cisco'],
      },
      {
        id: 'vlan-trunking',
        nom: 'VLAN / Trunking',
        niveau: 'opérationnel',
        pourcentage: 70,
        projetsAssocies: ['infrastructure-dmz-securisee-cisco'],
      },
      {
        id: 'cisco-asa',
        nom: 'Cisco ASA / Pare-feu',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['infrastructure-dmz-securisee-cisco'],
      },
      {
        id: 'ospf-routage',
        nom: 'OSPF / Routage IP',
        niveau: 'opérationnel',
        pourcentage: 65,
        projetsAssocies: ['infrastructure-dmz-securisee-cisco'],
      },
      {
        id: 'nat-acl',
        nom: 'NAT / ACL',
        niveau: 'notion',
        pourcentage: 42,
        projetsAssocies: ['infrastructure-dmz-securisee-cisco'],
      },
    ],
  },

  // ── 2. Intelligence Artificielle / Data ──────────────────────────────────
  {
    id: 'ia-data',
    nom: 'Intelligence Artificielle / Data',
    labelCourt: 'IA & Data',
    competences: [
      {
        id: 'python',
        nom: 'Python',
        niveau: 'opérationnel',
        pourcentage: 72,
        projetsAssocies: ['moteur-algebre-lineaire-ml'],
      },
      {
        id: 'numpy-scipy',
        nom: 'NumPy / SciPy',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['moteur-algebre-lineaire-ml'],
      },
      {
        id: 'algebre-ml',
        nom: 'Algèbre linéaire ML',
        niveau: 'opérationnel',
        pourcentage: 65,
        projetsAssocies: ['moteur-algebre-lineaire-ml'],
      },
      {
        id: 'pandas',
        nom: 'Pandas',
        niveau: 'notion',
        pourcentage: 40,
        projetsAssocies: ['moteur-algebre-lineaire-ml'],
      },
      {
        id: 'jupyter',
        nom: 'Jupyter Notebook',
        niveau: 'notion',
        pourcentage: 38,
        projetsAssocies: ['moteur-algebre-lineaire-ml'],
      },
    ],
  },

  // ── 3. Développement Logiciel ─────────────────────────────────────────────
  {
    id: 'dev-logiciel',
    nom: 'Développement Logiciel',
    labelCourt: 'Dev Web',
    competences: [
      {
        id: 'nextjs-react',
        nom: 'Next.js / React',
        niveau: 'opérationnel',
        pourcentage: 72,
        projetsAssocies: ['best-building-web-platform'],
      },
      {
        id: 'typescript',
        nom: 'TypeScript',
        niveau: 'opérationnel',
        pourcentage: 68,
        projetsAssocies: ['best-building-web-platform'],
      },
      {
        id: 'tailwind',
        nom: 'Tailwind CSS',
        niveau: 'opérationnel',
        pourcentage: 70,
        projetsAssocies: ['best-building-web-platform'],
      },
      {
        id: 'html-css',
        nom: 'HTML5 / CSS3',
        niveau: 'opérationnel',
        pourcentage: 75,
        projetsAssocies: ['best-building-web-platform'],
      },
    ],
  },

  // ── 4. DevOps & Outils ────────────────────────────────────────────────────
  {
    id: 'devops-outils',
    nom: 'DevOps & Outils',
    labelCourt: 'Outils',
    competences: [
      {
        id: 'git-github',
        nom: 'Git / GitHub',
        niveau: 'opérationnel',
        pourcentage: 70,
        projetsAssocies: [],
      },
      {
        id: 'linux',
        nom: 'Linux',
        niveau: 'notion',
        pourcentage: 35,
        projetsAssocies: [],
      },
      {
        id: 'vercel',
        nom: 'Vercel',
        niveau: 'notion',
        pourcentage: 42,
        projetsAssocies: ['best-building-web-platform'],
      },
      {
        id: 'packet-tracer',
        nom: 'Packet Tracer',
        niveau: 'opérationnel',
        pourcentage: 70,
        projetsAssocies: ['infrastructure-dmz-securisee-cisco'],
      },
    ],
  },
];
