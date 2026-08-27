/**
 * src/data/projets.ts
 *
 * Source unique de vérité pour la Galerie de projets (Module 4) et la Fiche détail (Module 5).
 * Modèle de données conforme à la section 4.1 du Cahier des Charges.
 *
 * Règle de gestion critique (§ Module 4) :
 *   Un projet sans lien GitHub ni démonstration valide ne peut pas être publié.
 *   Chaque entrée doit comporter au moins une preuve tangible et consultable.
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
  technologies: string[]; // Liste des technologies/outils utilisés
  image: string; // Chemin de l'image / aperçu de l'interface
  urlGithub?: string; // Lien vers le dépôt de code source
  urlDemo?: string; // Lien vers la démonstration en ligne
  misEnAvant: boolean; // Flag "À la une" pour affichage prioritaire
  statut: StatutProjet; // Statut du projet (ex: Terminé)
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
      "Conception et développement d'une plateforme de lecture et de gestion de bibliothèque numérique en ligne avec recherche multicritère, catégorisation thématique et interface fluide.",
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image: '/images/projects/digilib.jpg',
    urlGithub: 'https://github.com/username/digilib',
    urlDemo: 'https://digilib-demo.vercel.app',
    misEnAvant: true,
    statut: 'Terminé',
    dateRealisation: '2024-01',
    resultats: 'Catalogue indexant plus de 5 000 références avec temps de chargement inférieur à 1s.',
  },
  {
    identifiant: 'supermarche-autour-de-vous',
    titre: 'Supermarchés autour de vous',
    categorie: ['Développement Web'],
    etiquetteCategorie: 'JS / Cartographie',
    resume:
      'Une interface légère et rapide pour géolocaliser instantanément les enseignes autour de vous, idéale pour trouver le magasin le plus proche.',
    descriptionLongue:
      "Application web de géolocalisation exploitant des API cartographiques pour identifier les points de vente et supermarchés à proximité en temps réel selon la position de l'utilisateur.",
    technologies: ['Html', 'Css', 'JavaScript', 'Leaflet / Maps API'],
    image: '/images/projects/supermarches.jpg',
    urlGithub: 'https://github.com/username/supermarche-autour-de-vous',
    urlDemo: 'https://supermarches-demo.vercel.app',
    misEnAvant: true,
    statut: 'Terminé',
    dateRealisation: '2023-10',
    resultats: 'Géolocalisation précise et calcul d’itinéraires en temps réel sans latence.',
  },
  {
    identifiant: 'infrastructure-dmz-securisee-cisco',
    titre: 'Infrastructure & DMZ Sécurisée Cisco',
    categorie: ['Réseaux & Infra'],
    etiquetteCategorie: 'Cisco IOS / ASA',
    resume:
      'Maquette réseau d’entreprise avec segmentation VLAN, routage OSPF dynamique et DMZ protégée par pare-feu ASA.',
    descriptionLongue:
      "Mise en place d'une architecture réseau d'entreprise avec segmentation VLAN, routage inter-VLAN et DMZ protégée par pare-feu Cisco ASA, garantissant une isolation stricte des services exposés.",
    technologies: ['Cisco IOS', 'Cisco ASA', 'VLAN', 'OSPF', 'ACL', 'NAT'],
    image: '/images/projects/infrastructure-cisco.jpg',
    urlGithub: 'https://github.com/username/infrastructure-dmz-securisee-cisco',
    misEnAvant: true,
    statut: 'Terminé',
    dateRealisation: '2023-11',
    resultats:
      'Isolation étanche des flux critiques et conformité aux standards de filtrage périmétrique.',
  },
  {
    identifiant: 'moteur-algebre-lineaire-ml',
    titre: 'Moteur d’Algèbre Linéaire pour ML',
    categorie: ['Machine Learning', 'Développement Logiciel'],
    etiquetteCategorie: 'Python / NumPy',
    resume:
      'Moteur d’optimisation vectorielle et matricielle haute performance pour pipelines de données et algorithmes de machine learning.',
    descriptionLongue:
      "Développement d'un moteur d'algèbre linéaire optimisé pour les workflows de machine learning, avec traitements de matrices, projections vectorielles et mesures de similarité pour l'analyse de données.",
    technologies: ['Python', 'NumPy', 'Pandas', 'SciPy', 'Jupyter'],
    image: '/images/projects/moteur-ml.jpg',
    urlGithub: 'https://github.com/username/moteur-algebre-lineaire-ml',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2024-02',
    resultats:
      'Gains de calcul de 60 % sur les opérations matricielles par rapport aux implémentations Python non vectorisées.',
  },
];

/* Règle de gestion module 4 — détection précoce en développement */
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
