/**
 * src/data/projets.ts
 *
 * Source unique de vérité pour la Galerie de projets (Module 4).
 *
 * Règle de gestion critique (§ Module 4) :
 *   - Chaque entrée comporte des preuves tangibles (démo déployée et/ou code source).
 *   - Les affirmations de résultats chiffrés sont claires et factuelles.
 */

export type StatutProjet = 'Terminé' | 'En cours';

export interface Projet {
  identifiant: string;
  titre: string;
  resume: string; // Synthèse courte 2-3 lignes pour la carte
  descriptionLongue: string; // Description détaillée pour la carte
  technologies: string[]; // Liste des technologies/outils utilisés
  image: string; // Chemin de l'image / aperçu de l'interface
  urlGithub?: string; // Lien vers le dépôt de code source (conservé même si non affiché publiquement)
  codeVisible?: boolean; // true pour afficher le bouton "Code" actif ; sinon bouton grisé "Code privé"
  urlDemo?: string; // Lien vers la démonstration en ligne
  misEnAvant: boolean; // Flag "À la une" pour affichage prioritaire
  statut: StatutProjet; // Statut du projet (ex: Terminé, En cours)
  dateRealisation: string; // Format ISO YYYY-MM
  resultats?: string; // Mesures ou impacts tangibles
}

export const PROJETS: Projet[] = [
  {
    identifiant: 'best-building-web-platform',
    titre: 'Création du site web institutionnel de Best Building',
    resume:
      "Conception d'un site web institutionnel pour Best Building, entreprise du BTP, avec un back-office permettant à l'équipe de gérer contenus, réalisations et devis en autonomie.",
    descriptionLongue:
      "Best Building, entreprise spécialisée dans la construction et les travaux publics, ne disposait d'aucune présence numérique structurée, ce qui limitait sa visibilité et sa crédibilité face à une concurrence déjà bien référencée en ligne. Le projet a consisté à concevoir un site vitrine institutionnel complet : présentation de l'entreprise, catalogue de services, portfolio de réalisations, espace carrières et formulaire de demande de devis. Une attention particulière a été portée au back-office, permettant à l'équipe non technique de Best Building de gérer elle-même les contenus, actualités et réalisations du site.",
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Django', 'PostgreSQL'],
    image: '/images/projects/best-building.png',
    urlDemo: 'https://best-building-frontend.vercel.app/',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2026-08',
  },
  {
    identifiant: 'unipath-gestion-concours',
    titre: 'UniPath, Plateforme de Gestion des Concours Universitaires',
    resume:
      "Modélisation et architecture des données d'UniPath, plateforme académique digitalisant l'inscription, l'instruction des dossiers et la validation des concours universitaires.",
    descriptionLongue:
      "Dans le cadre d'un projet académique à l'EPAC, une équipe de 4 étudiants a conçu UniPath, une plateforme digitalisant l'inscription et le suivi des concours universitaires, du dépôt de dossier à la validation finale par la DGES. En tant qu'architecte des données, j'ai conçu le schéma PostgreSQL/Prisma modélisant le workflow complet (Candidat, Commission, Contrôleur, DGES), les rôles d'accès et le système de génération automatique des matricules. Le projet a atteint un stade de production stable, avec une couverture de tests validant la sécurité des routes et la logique métier.",
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Supabase'],
    image: '/images/projects/unipath.png',
    urlDemo: 'https://unipath-mvp-fawn.vercel.app',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2026-07',
  },
  {
    identifiant: 'blog-lecture',
    titre: 'Blog Lecture, Carnet de lecture numérique',
    resume:
      "Un blog personnel où je partage mes fiches de lecture, mes citations préférées et mes réflexions littéraires, avec espace membre et newsletter.",
    descriptionLongue:
      "Blog-lecture est mon carnet de bord numérique dédié à la lecture : fiches de lecture structurées, pensées quotidiennes, citations marquantes et navigation par catégories (romans, philosophie, développement personnel). Le site inclut un système de comptes permettant aux visiteurs connectés de proposer leurs propres citations, ainsi qu'un formulaire de newsletter pour recevoir les nouvelles fiches de lecture. Développé en solo avec Laravel pour le back-end et Vite/Tailwind CSS pour une interface réactive et moderne.",
    technologies: ['Laravel', 'PHP', 'MySQL', 'Vite', 'Tailwind CSS', 'JavaScript'],
    image: '/images/projects/blog-lecture.png',
    urlGithub: 'https://github.com/VignonCK/blog-lecture',
    codeVisible: false,
    urlDemo: 'https://blog-lecture.onrender.com/',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2026-05',
  },
  {
    identifiant: 'dantokpa-prediction-pourriture',
    titre: 'Prédiction de pourriture post-récolte sur le corridor de Dantokpa',
    resume:
      "Conception de l'interface d'un outil d'aide à la décision pour les revendeuses de tomates du marché de Dantokpa. L'outil compare en FCFA trois choix : vendre aujourd'hui, attendre 24 h ou vendre sur un autre marché.",
    descriptionLongue:
      "Projet réalisé en équipe de trois pour le hackathon IndabaX Bénin 2026, afin de réduire les pertes des revendeuses de tomates du corridor de Dantokpa, à Cotonou. L'utilisatrice saisit sa zone, la quantité et l'état de ses tomates. L'application récupère alors la température en direct et les distances de trajet, puis consulte sept ans de relevés de prix du Programme alimentaire mondial. Un moteur de décision simule 2 000 scénarios par option et indique ce que chaque choix rapporterait réellement, sous forme de fourchette et avec un niveau de confiance exprimé en « X fois sur 10 ». J'ai conçu l'interface Streamlit et son déploiement en ligne, en veillant à ce que la vente immédiate reste toujours visible, pour qu'une vendeuse qui a besoin d'argent tout de suite ne soit jamais poussée à attendre.",
    technologies: ['Python', 'Streamlit', 'pandas', 'NumPy', 'Open-Meteo', 'OpenRouteService', 'Monte-Carlo', 'Streamlit Cloud'],
    image: '/images/projects/dantokpa.jpeg',
    urlGithub: 'https://github.com/VignonCK/dantokpa-interface',
    codeVisible: true,
    urlDemo: 'https://dantokpa.streamlit.app/',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2026-09',
  },
  {
    identifiant: 'digilib',
    titre: 'Digilib',
    resume:
      'Application web de bibliothèque numérique avec système de paiement Flutterwave et accès via Google Drive.',
    descriptionLongue:
      "Digilib est une plateforme de bibliothèque numérique permettant aux utilisateurs de découvrir et d'acquérir des ouvrages en ligne. Le paiement est géré via Flutterwave, et les fichiers des ouvrages sont hébergés et distribués via Google Drive. Les données de la bibliothèque et des utilisateurs sont gérées avec Supabase.",
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'Flutterwave', 'Google Drive'],
    image: '/images/projects/digilib.jpeg',
    urlDemo: 'https://digilib-gamma.vercel.app/',
    misEnAvant: false,
    statut: 'Terminé',
    dateRealisation: '2026-01',
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
 * - Filtre par tag technologique sélectionné (optionnel)
 * - Place toujours les projets `misEnAvant: true` en tête de liste
 */
export function filtrerProjets(filtreTechnologie: string | null = null): Projet[] {
  return PROJETS.filter((p) => {
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
