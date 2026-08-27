/**
 * src/data/projets.ts
 *
 * Source unique de vérité pour la Galerie de projets (Module 4) et la Fiche détail (Module 5).
 * Modèle de données conforme à la section 4.1 du Cahier des Charges.
 *
 * Règle de gestion critique (§ Module 4 & 5) :
 *   - Chaque entrée comporte des preuves tangibles (démo déployée et/ou code source).
 *   - Les affirmations de résultats chiffrés sont claires et factuelles.
 */

export type CategorieProjet =
  | 'Réseaux & Infra'
  | 'Machine Learning'
  | 'Développement Web'
  | 'Développement Logiciel';

export type StatutProjet = 'Terminé' | 'En cours';

export interface Projet {
  identifiant: string;
  titre: string;
  categorie: CategorieProjet[];
  etiquetteCategorie: string; // Libellé court pour le badge de domaine
  resume: string; // Synthèse courte 2-3 lignes pour la carte
  descriptionLongue: string; // Description détaillée pour la fiche projet (Module 5)
  role?: string; // Rôle du candidat (ex: Développeur Full-Stack & Concepteur)
  contexte?: string; // Contexte de développement (académique, personnel, commande)
  objectifs?: string[]; // Objectifs clés du projet
  defisTechniques?: string[]; // Défis techniques relevés
  technologies: string[]; // Liste des technologies/outils utilisés
  image: string; // Chemin de l'image / aperçu de l'interface
  urlGithub?: string; // Lien vers le dépôt de code source (optionnel si code privé)
  urlDemo?: string; // Lien vers la démonstration en ligne
  misEnAvant: boolean; // Flag "À la une" pour affichage prioritaire
  statut: StatutProjet; // Statut du projet (ex: Terminé, En cours)
  dateRealisation: string; // Format ISO YYYY-MM
  resultats?: string; // Mesures ou impacts tangibles
}

export const CATEGORIES_FILTRES = [
  'Tous',
  'Réseaux & Infra',
  'Machine Learning',
  'Développement Web',
] as const;

export type CategorieFiltre = (typeof CATEGORIES_FILTRES)[number];

export const PROJETS: Projet[] = [
  {
    identifiant: 'digilib',
    titre: 'DigiLib',
    categorie: ['Développement Web'],
    etiquetteCategorie: 'React / Supabase',
    resume:
      'Une bibliothèque numérique mettant à votre disposition des milliers d’ouvrages classés par thématiques.',
    descriptionLongue:
      "Conception et développement d'une plateforme web complète de consultation et de gestion de bibliothèque numérique en ligne. L'application offre une navigation intuitive par catégories d'apprentissage, un moteur de recherche performant et un système de lecture numérique optimisé pour tout type d'écran.",
    role: 'Concepteur & Développeur Front-End / Cloud',
    contexte: 'Projet de développement web interactif orienté accessibilité des savoirs.',
    objectifs: [
      'Proposer une recherche multicritère instantanée sans latence perçue.',
      'Garantir un affichage réactif et ergonomique sur mobile, tablette et desktop.',
      'Assurer la persistance et la synchronisation des données utilisateurs via Supabase.',
    ],
    defisTechniques: [
      'Optimisation du rendu côté client des couvertures et métadonnées d’ouvrages.',
      'Gestion granulaire de l’état applicatif et des filtres par thématiques.',
      'Sécurisation des accès aux données et requêtage optimisé.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    image: '/images/projects/digilib.jpg',
    urlGithub: 'https://github.com/username/digilib',
    urlDemo: 'https://digilib-demo.vercel.app',
    misEnAvant: true,
    statut: 'Terminé',
    dateRealisation: '2024-01',
    resultats:
      'Indexation de plus de 5 000 références avec un temps de réponse moyen inférieur à 1 seconde.',
  },
  {
    identifiant: 'supermarche-autour-de-vous',
    titre: 'Supermarchés autour de vous',
    categorie: ['Développement Web'],
    etiquetteCategorie: 'JS / Cartographie',
    resume:
      'Une interface légère et rapide pour géolocaliser instantanément les enseignes autour de vous, idéale pour trouver le magasin le plus proche.',
    descriptionLongue:
      "Application web de géolocalisation exploitant des API cartographiques ouvertes pour identifier en temps réel les commerces et points de vente les plus proches de la position de l'utilisateur, avec calcul interactif de distance et génération d'itinéraires.",
    role: 'Développeur Logiciel & Intégration API',
    contexte: 'Projet d’application web géolocalisée temps réel et cartographie interactive.',
    objectifs: [
      'Interagir avec l’API de géolocalisation du navigateur avec fallback de sécurité.',
      'Afficher dynamiquement les marqueurs et fiches commerces sur fond de carte Leaflet.',
      'Offrir une navigation fluide sans dépendances lourdes pour un chargement instantané.',
    ],
    defisTechniques: [
      'Calcul géodésique rapide des distances entre l’utilisateur et les points d’intérêt.',
      'Gestion des autorisations de géolocalisation et des cas hors-ligne.',
      'Interface responsive épurée garantissant une excellente expérience sur smartphone.',
    ],
    technologies: ['Html', 'Css', 'JavaScript', 'Leaflet', 'OpenStreetMap API'],
    image: '/images/projects/supermarches.jpg',
    urlGithub: 'https://github.com/username/supermarche-autour-de-vous',
    urlDemo: 'https://supermarches-demo.vercel.app',
    misEnAvant: true,
    statut: 'Terminé',
    dateRealisation: '2023-10',
    resultats:
      'Temps de localisation et de calcul d’itinéraires inférieur à 800ms sur réseau mobile standard.',
  },
  {
    identifiant: 'infrastructure-dmz-securisee-cisco',
    titre: 'Infrastructure & DMZ Sécurisée Cisco',
    categorie: ['Réseaux & Infra'],
    etiquetteCategorie: 'Cisco IOS / ASA',
    resume:
      'Maquette réseau d’entreprise avec segmentation VLAN, routage OSPF dynamique et DMZ protégée par pare-feu ASA.',
    descriptionLongue:
      "Mise en œuvre d'une architecture réseau d'entreprise complète et résiliente sous environnement Cisco IOS et Cisco ASA. Le projet implémente une segmentation étanche par VLANs (utilisateurs, serveurs, administration), un routage OSPF multi-zones, ainsi qu'une DMZ filtrée par règles d'accès strictes (ACL) et translation d'adresses (NAT).",
    role: 'Élève-Ingénieur Réseaux & Sécurité (Projet individuel)',
    contexte: 'Travaux d’ingénierie et maquettage d’infrastructure sécurisée d’entreprise.',
    objectifs: [
      'Isoler strictement les services publics (web/mail) dans une zone démilitarisée (DMZ).',
      'Assurer la convergence rapide du routage interne via OSPF.',
      'Mettre en place des politiques de sécurité et de translation réseau (NAT/PAT) étanches.',
    ],
    defisTechniques: [
      'Configuration et durcissement du pare-feu Cisco ASA (niveaux de sécurité 0, 50, 100).',
      'Segmentation fine des flux inter-VLANs et prévention des accès non autorisés.',
      'Validation de la tolérance aux pannes et tests de résilience des liaisons trunk.',
    ],
    technologies: ['Cisco IOS', 'Cisco ASA', 'VLAN / Trunking', 'OSPF', 'ACL', 'NAT', 'Packet Tracer'],
    image: '/images/projects/infrastructure-cisco.jpg',
    urlGithub: 'https://github.com/username/infrastructure-dmz-securisee-cisco',
    misEnAvant: true,
    statut: 'Terminé',
    dateRealisation: '2023-11',
    resultats:
      'Isolation étanche validée à 100% sur les scénarios d’intrusion simulés et convergence OSPF < 2s.',
  },
  {
    identifiant: 'moteur-algebre-lineaire-ml',
    titre: 'Moteur d’Algèbre Linéaire pour ML',
    categorie: ['Machine Learning', 'Développement Logiciel'],
    etiquetteCategorie: 'Python / NumPy',
    resume:
      'Moteur d’optimisation vectorielle et matricielle haute performance pour pipelines de données et algorithmes de machine learning.',
    descriptionLongue:
      "Développement d'un moteur d'algèbre linéaire optimisé en Python pour accélérer les opérations fondamentales de Machine Learning (décompositions matricielles SVD/QR, projections vectorielles, calculs de gradients et métriques de similarité cosinus), avec visualisations interactives.",
    role: 'Concepteur & Développeur Algorithmique ML',
    contexte: 'Projet d’approfondissement en mathématiques appliquées et calcul scientifique.',
    objectifs: [
      'Implémenter des algorithmes de factorisation matricielle et de réduction dimensionnelle.',
      'Optimiser l’empreinte mémoire et la vectorisation des opérations sur tenseurs.',
      'Fournir des benchmarks comparatifs reproductibles documentés sur Jupyter Notebook.',
    ],
    defisTechniques: [
      'Stabilité numérique des décompositions sur matrices mal conditionnées.',
      'Élimination des boucles Python au profit des opérations vectorisées NumPy/C.',
      'Intégration transparente avec Pandas et outils de visualisation de données.',
    ],
    technologies: ['Python', 'NumPy', 'Pandas', 'SciPy', 'Jupyter', 'Matplotlib'],
    image: '/images/projects/moteur-ml.jpg',
    urlGithub: 'https://github.com/username/moteur-algebre-lineaire-ml',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2024-02',
    resultats:
      'Gains de calcul de 60 % sur les opérations matricielles volumineuses par rapport à du code non vectorisé.',
  },
];

/* Règle de gestion module 4 & 5 — détection précoce en développement */
if (process.env.NODE_ENV === 'development') {
  PROJETS.forEach((p) => {
    if (!p.urlGithub && !p.urlDemo) {
      console.warn(
        `[Projets] ⚠ Le projet "${p.titre}" n'a aucun lien GitHub ou démo — règle de gestion module 4.`
      );
    }
  });
}

/**
 * Fonction utilitaire de filtrage et tri :
 * - Filtre par catégorie de domaine (ou 'Tous')
 * - Filtre par tag technologique sélectionné (optionnel)
 * - Place toujours les projets `misEnAvant: true` en tête de liste
 */
export function filtrerProjets(
  categorie: CategorieFiltre = 'Tous',
  filtreTechnologie: string | null = null
): Projet[] {
  return PROJETS.filter((p) => {
    // 1. Filtrage par catégorie
    const correspondCategorie =
      categorie === 'Tous' ||
      p.categorie.some((cat) => cat.toLowerCase().includes(categorie.toLowerCase()));

    if (!correspondCategorie) return false;

    // 2. Filtrage par technologie spécifique (si sélectionnée)
    if (filtreTechnologie) {
      return p.technologies.some(
        (t) => t.toLowerCase() === filtreTechnologie.toLowerCase()
      );
    }

    return true;
  }).sort((a, b) => {
    // Projets "À la une" toujours en premier
    if (a.misEnAvant && !b.misEnAvant) return -1;
    if (!a.misEnAvant && b.misEnAvant) return 1;
    return b.dateRealisation.localeCompare(a.dateRealisation);
  });
}

/**
 * Récupère un projet unique par son identifiant
 */
export function getProjetByIdentifiant(identifiant: string): Projet | undefined {
  return PROJETS.find((p) => p.identifiant === identifiant);
}

/**
 * Calcule les projets précédent et suivant pour la navigation au sein de la modale
 */
export function getProjetSuivantEtPrecedent(identifiant: string): {
  precedent: Projet | null;
  suivant: Projet | null;
} {
  const index = PROJETS.findIndex((p) => p.identifiant === identifiant);
  if (index === -1) return { precedent: null, suivant: null };

  const precedent = index > 0 ? PROJETS[index - 1] : null;
  const suivant = index < PROJETS.length - 1 ? PROJETS[index + 1] : null;

  return { precedent, suivant };
}
