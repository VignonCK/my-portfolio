/**
 * src/data/site-config.ts
 *
 * Source unique de vérité pour les paramètres globaux du site.
 * Utilisé par la Navbar, Hero, About, Skills, Projects, Contact et Footer pour éviter toute
 * duplication de données (liens sociaux, URL du CV, identité du candidat).
 *
 * Décision clé : cvUrl pointe vers public/ — remplacer le fichier dans
 * public/ sans changer ce chemin garantit qu'aucun lien envoyé dans un
 * dossier de candidature ne devient mort (règle de gestion, module 8).
 */

export const siteConfig = {
  /** Identité du candidat — affichée dans la navbar et les métadonnées */
  nomCandidat: 'Vignon KANLINHANON',
  titreProfessionnel: 'Élève-Ingénieur en M1 Réseau Informatique et Internet',

  /**
   * Chemin vers le CV dans public/.
   * Remplacer uniquement le fichier PDF, jamais ce chemin,
   * pour ne pas casser les liens déjà envoyés dans des candidatures.
   */
  cvUrl: '/cv_vignon_kanlinhanon_stages.pdf',
  cvNomFichier: 'CV_Vignon_Kanlinhanon_Stages.pdf',

  /**
   * Chemin de la photo de profil dans public/ (ex: '/photo-profil.jpg').
   * Laisser vide "" pour utiliser la silhouette temporaire par défaut.
   */
  photoUrl: '/photo-profil.jpeg',

  /** Liens sociaux — centralisés ici pour éviter la duplication Hero/Contact */
  liensSociaux: {
    github: 'https://github.com/VignonCK',
    linkedin: 'https://www.linkedin.com/in/vignon-kanlinhanon',
    email: 'contact@example.com',
  },

  /** Textes de la section Hero */
  hero: {
    badge: 'Élève-Ingénieur en M1 Réseau Informatique et Internet',
    accroche: 'Bâtir des infrastructures réseaux résilientes et des architectures logicielles centrées sur la donnée.',
    description: 'Passionné par la convergence des infrastructures réseaux, de l’intelligence artificielle et du développement web. Je conçois des solutions performantes, sécurisées et adaptées aux exigences académiques et industrielles.',
  },

  /** ----------------------------------------------------------------
   * Section « À propos » — Module 3
   * ---------------------------------------------------------------- */
  apropos: {
    titre: 'À propos de moi',
    sousTitre: 'Ingénierie, réseaux et ambition — le portrait d\'un candidat à la bourse d\'excellence.',

    bio: {
      photoUrl: '/photo-apropos.jpeg',
      citation: '« L\'excellence technique n\'est pas une destination — c\'est une discipline quotidienne. »',
      paragraphes: [
        'Élève-Ingénieur en 1ère année du Cycle Ingénieur en Génie Informatique et Télécommunication à l\'EPAC, je me spécialise en réseaux informatiques et internet. Mon parcours — ponctué d\'une Mention Très Bien au Baccalauréat (16,45/20) et d\'une moyenne de 15,30/20 en cycle ingénieur — reflète une exigence académique constante et une volonté d\'excellence que je traduis concrètement à travers mes projets techniques.',
        'Ma passion se situe à la convergence des infrastructures réseaux, de l\'intelligence artificielle et de la cybersécurité. Convaincu que les ingénieurs de demain doivent maîtriser non seulement les protocoles et les architectures, mais aussi les outils d\'IA qui transforment la gestion des réseaux, je construis une vision transversale que chacune de mes réalisations vient illustrer.',
        'Curieux, rigoureux et autonome, j\'aborde chaque projet avec une démarche structurée : analyse des exigences, recherche bibliographique, conception avant implémentation. Mon objectif est de rejoindre un programme de bourse d\'excellence pour contribuer à des travaux de recherche à fort impact dans le domaine des réseaux et des systèmes distribués.',
      ],
      qualites: ['Curieux', 'Rigoureux', 'Autonome', 'Méthodique', 'Persévérant', 'Esprit d\'équipe'],
    },

    timeline: [
      {
        id: 'stage-best-building',
        periode: 'Juil. 2026 – Août 2026',
        intitule: 'Stage Académique — Développement Web & Logiciel de Gestion',
        etablissement: 'Best-Building',
        type: 'experience' as const,
        detail: 'Conception et mise en ligne de la vitrine web de l’entreprise et développement d’une solution logicielle interne dédiée à la gestion financière et comptable.',
      },
      {
        id: 'cycle-ingenieur',
        periode: 'Sept. 2025 – Juil. 2026',
        intitule: '1ère année du Cycle Ingénieur — Génie Informatique et Télécommunication',
        etablissement: 'EPAC (École Polytechnique d’Abomey-Calavi)',
        type: 'formation' as const,
        detail: 'Spécialisation en réseaux, systèmes embarqués et sécurité informatique. Moyenne annuelle : 15,30/20.',
      },
      {
        id: 'eeia-vallet',
        periode: 'Juillet 2025',
        intitule: 'École d’Été en Intelligence Artificielle (EEIA — 5ᵉ édition)',
        etablissement: 'Bénin Excellence – Fondation Vallet',
        type: 'experience' as const,
        detail: 'Programme intensif en programmation, Machine Learning et robotique. Conception et développement en équipe d’un système de reconnaissance faciale.',
      },
      {
        id: 'prepa',
        periode: 'Sept. 2023 – Juil. 2025',
        intitule: 'Classes Préparatoires — Systèmes Industriels',
        etablissement: 'EPAC (École Polytechnique d’Abomey-Calavi)',
        type: 'formation' as const,
        detail: 'Formation intensive en mathématiques, physique et sciences de l’ingénieur, socle des compétences analytiques et de rigueur appliquées aux projets techniques.',
      },
      {
        id: 'bac',
        periode: 'Sept. 2022 – Juil. 2023',
        intitule: 'Baccalauréat de l’Enseignement Général — Série C',
        etablissement: 'Lycée',
        type: 'formation' as const,
        detail: 'Spécialités Mathématiques et Sciences Physiques. Mention Très Bien — Moyenne : 16,45/20.',
      },
    ],
  },

  /** ----------------------------------------------------------------
   * Section « Contact » — Module 7
   * ---------------------------------------------------------------- */
  contact: {
    titre: 'Entrons en contact',
    sousTitre: 'Disponible pour échanger sur vos opportunités de recherche, de stages ou de bourses d’excellence.',
    email: 'contact@example.com',
    localisation: 'Abomey-Calavi / Cotonou, Bénin',
    statutDisponibilite: 'À l’écoute d’opportunités de recherche & bourses d’excellence',
  },

  /** ----------------------------------------------------------------
   * Section « Pied de page » (Footer) — Module 7
   * ---------------------------------------------------------------- */
  footer: {
    createur: 'Vignon KANLINHANON',
    mentionDroits: 'Tous droits réservés.',
    dateDerniereMaj: 'Août 2026',
    liensNavigation: [
      { label: 'Accueil', href: '#hero' },
      { label: 'À propos', href: '#apropos' },
      { label: 'Projets', href: '#projets' },
      { label: 'Compétences', href: '#competences' },
      { label: 'Contact', href: '#contact' },
    ],
  },
} as const;
