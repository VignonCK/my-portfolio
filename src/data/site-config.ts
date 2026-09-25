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
  titreProfessionnel: "Élève-Ingénieur en Réseau Informatique et Internet à l'EPAC (Bénin)",

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
    linkedin: 'https://www.linkedin.com/in/vignon-cadnel-k-9021272b6?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    email: 'vignonkanlinhanon5@gmail.com',
  },

  /** Textes de la section Hero */
  hero: {
    badge: "Élève-Ingénieur en Réseau Informatique et Internet à l'EPAC (Bénin)",
    accroche: "Bâtir aujourd'hui les fondations scientifiques de l'intelligence artificielle de demain.",
    description: "Actuellement en 2e année du Cycle Ingénieur en réseaux informatiques et internet, je vise à intégrer la R&D des grandes entreprises technologiques mondiales en tant que Research Scientist en intelligence artificielle : une trajectoire que je construis avec curiosité et rigueur, projet après projet.",
  },

  /** ----------------------------------------------------------------
   * Section « À propos » — Module 3
   * ---------------------------------------------------------------- */
  apropos: {
    titre: 'À propos de moi',
    sousTitre: 'Découvrez la personne derrière le parcours.',

    bio: {
      photoUrl: '/photo-apropos.jpeg',
      citation: '« L\'excellence technique n\'est pas une destination, c\'est une discipline quotidienne. »',
      paragraphes: [
        "Actuellement en stage académique de fin de 3e année, je m'apprête à intégrer la 2e année du Cycle Ingénieur en Génie Informatique et Télécommunication à l'EPAC, où je me spécialise en réseaux informatiques et internet. Mon parcours, ponctué d'une Mention Très Bien au Baccalauréat (16,45/20) et d'une moyenne de 15,20/20 en 1ère année du cycle ingénieur, reflète une exigence académique constante et une volonté d'excellence que je traduis concrètement à travers mes projets techniques.",
        "Ma passion pour l'intelligence artificielle est née d'un déclic : l'École d'Été en Intelligence Artificielle (EEIA 2025) de la Fondation Vallet, où j'ai découvert le Machine Learning et une vision claire de ce que je veux devenir : Research Scientist en intelligence artificielle au sein de la R&D des grandes entreprises technologiques mondiales, avec l'ambition, à terme, d'évoluer vers la direction stratégique de l'IA (Director of AI / Technical Product Manager). Depuis, je construis chaque projet, réseau ou logiciel, comme une étape vers cette trajectoire.",
        "Curieux, je m'appuie sur la recherche avant de me lancer ; rigoureux, j'analyse les exigences avant de concevoir ; autonome, je mène mes projets de bout en bout, de la conception à l'implémentation. Cette même exigence, je la mets au service du collectif : Secrétaire Général de l'Organe de Contrôle du H3CP par le passé, j'y ai appliqué la même rigueur à la coordination de mes pairs qu'à mes projets techniques. En dehors des projets techniques, sport et lecture m'aident à garder l'esprit vif. Mon objectif est de décrocher une bourse d'excellence pour poursuivre une formation d'ingénieur de haut niveau, avant d'intégrer la R&D d'une grande entreprise technologique mondiale en tant que Research Scientist en intelligence artificielle avec, à long terme, l'ambition d'évoluer vers la direction stratégique de l'IA, puis de créer des startups à fort impact en Afrique.",
      ],
      qualites: ['Curieux', 'Rigoureux', 'Autonome', 'Méthodique', 'Persévérant', 'Esprit d\'équipe'],
    },

    certifications: {
      titre: 'Certifications',
      sousTitre: "Parce que la formation ne s'arrête pas aux cours magistraux.",
      liste: [
        /**
         * FORMAT À REMPLIR POUR CHAQUE ÉLÉMENT
         *
         * Pourquoi `lien` est optionnel ?
         * - Certaines attestations n'ont pas de page publique de vérification.
         * - Vous pouvez tout de même les afficher sans lien, puis ajouter la preuve plus tard.
         * - Si vous voulez un bouton "Voir", renseignez ici un lien public.
         *
         * {
         *   id: 'identifiant-unique-kebab-case',
         *   type: 'Certification' as const, // ou 'Attestation' as const
         *   titre: 'Nom exact de la certification ou attestation',
         *   organisme: 'Nom de l’organisme émetteur',
         *   date: 'Août 2026',
         *   statut: 'Obtenue' as const, // ou 'En cours' as const
         *   description: 'Résumé court, factuel et vérifiable de ce que valide la certification.',
         *   apercu: '/certifications/apercus/mon-certificat-page1.jpg', // aperçu principal affiché sur la carte
         *   galerie: [
         *     '/certifications/apercus/mon-certificat-page1.jpg',
         *     '/certifications/apercus/mon-certificat-page2.jpg',
         *   ], // optionnel : images affichées dans la modale si le document a plusieurs pages
         *   lien: 'https://...', // optionnel : lien public de consultation / vérification
         * },
         */
        {
          id: 'eeia-vallet-2025',
          type: 'Attestation' as const,
          titre: "Attestation de participation à l'École d'Été sur l'Intelligence Artificielle de la Fondation Vallet (EEIA 2025)",
          organisme: 'Bénin Excellence – Fondation Vallet',
          date: '21 juillet – 16 août 2025',
          dateTri: '2025-08-16',
          statut: 'Obtenue' as const,
          description: "Programme intensif en programmation, Machine Learning et robotique, clôturé par la conception en équipe d'un système de reconnaissance faciale.",
          apercu: '/certifications/apercus/eeia_2025_p1.png',
          galerie: [
            '/certifications/apercus/eeia_2025_p1.png',
            '/certifications/apercus/eeia_2025_p2.png',
          ],
          lien: '',
        },
        {
          id: 'indabax-benin-2026',
          type: 'Attestation' as const,
          titre: 'Attestation de participation au Deep Learning IndabaX Bénin 2026',
          organisme: 'Deep Learning IndabaX Benin Republic',
          date: '10 – 12 septembre 2026',
          dateTri: '2026-09-12',
          statut: 'Obtenue' as const,
          description: "IndabaX Bénin 2026 : Participation à l'événement de la communauté africaine d'intelligence artificielle (Deep Learning IndabaX), incluant un hackathon où notre équipe a conçu un outil d'aide à la décision pour réduire les pertes post-récolte de tomates sur le corridor de Dantokpa.",
          apercu: '/certifications/apercus/indabax_benin_2026.jpeg',
          galerie: ['/certifications/apercus/indabax_benin_2026.jpeg'],
          lien: '',
        },
      ],

      /**
       * Groupes de certifications — plusieurs attestations d'un même
       * organisme regroupées visuellement en une seule carte. Au clic,
       * la modale s'ouvre en mode carrousel et permet de naviguer entre
       * chaque certificat du groupe (image + titre + description propres
       * à chaque élément, contrairement à `galerie` qui partage une seule
       * description pour toutes les images).
       *
       * FORMAT À REMPLIR POUR CHAQUE ÉLÉMENT DE `items`
       * {
       *   id: 'identifiant-unique-kebab-case',
       *   titre: 'Nom exact du certificat',
       *   date: 'Date d’obtention',
       *   description: 'Résumé court de ce que valide le certificat.',
       *   apercu: '/certifications/apercus/mon-certificat.png',
       * },
       */
      groupes: [
        {
          id: 'datatour',
          type: 'Attestation' as const,
          titre: 'Coupe d’Afrique des Nations en Science des Données',
          organisme: 'Data Afrique Hub',
          dateTri: '2026-07-04',
          statut: 'Obtenue' as const,
          resume: '3 participations, phases nationale et internationale.',
          items: [
            {
              id: 'datatour-national-2025',
              titre: 'Phase nationale 2025 : credit scoring',
              date: '11 octobre – 1er novembre 2025',
              description: "Modélisation d'un système de credit scoring : feature engineering par client à partir des historiques de prêts, puis entraînement d'un CatBoostClassifier évalué par ROC-AUC pour prédire le risque de défaut de paiement.",
              apercu: '/certifications/apercus/datatour_2025_national.png',
            },
            {
              id: 'datatour-international-2025',
              titre: 'Phase internationale 2025 : recommandation vidéo',
              date: '21 novembre – 18 décembre 2025',
              description: "Défi de recommandation vidéo : conception d'un système intelligent de personnalisation de contenus, filtrage collaboratif (ALS) combiné à un LightGBMClassifier sur caractéristiques enrichies, puis stacking par régression logistique, évalué par ROC-AUC en validation croisée temporelle.",
              apercu: '/certifications/apercus/datatour_2025_international.png',
            },
            {
              id: 'datatour-national-2026',
              titre: 'Phase nationale 2026 : détection de fraude',
              date: '13 juin – 4 juillet 2026',
              description: "Participation avec l'équipe Team EPAC à la phase nationale : conception d'un modèle de détection de fraude visant à identifier automatiquement les transactions financières suspectes.",
              apercu: '/certifications/apercus/certificat-participation-Team EPAC.png',
            },
          ],
        },
        {
          id: 'kaggle',
          type: 'Certification' as const,
          titre: 'Certifications Kaggle',
          organisme: 'Kaggle',
          dateTri: '2025-09-15',
          statut: 'Obtenue' as const,
          resume: '4 certificats de complétion en Data Science & Machine Learning.',
          items: [
            {
              id: 'kaggle-pandas',
              titre: 'Certificat de complétion : Pandas',
              date: '25 août 2025',
              description: 'Manipulation et analyse de données tabulaires avec la bibliothèque Pandas : indexation, filtrage, agrégation et jointures de jeux de données.',
              apercu: '/certifications/apercus/pandas.png',
            },
            {
              id: 'kaggle-data-cleaning',
              titre: 'Certificat de complétion : Data Cleaning',
              date: '29 août 2025',
              description: 'Techniques de nettoyage de données : traitement des valeurs manquantes, normalisation des échelles, correction des incohérences de saisie et gestion des encodages.',
              apercu: '/certifications/apercus/data-cleaning.png',
            },
            {
              id: 'kaggle-intro-ml',
              titre: 'Certificat de complétion : Intro to Machine Learning',
              date: '2 septembre 2025',
              description: 'Fondamentaux du Machine Learning : construction et validation de modèles avec scikit-learn, arbres de décision et forêts aléatoires, sous-apprentissage et sur-apprentissage.',
              apercu: '/certifications/apercus/intro-ml.png',
            },
            {
              id: 'kaggle-data-visualization',
              titre: 'Certificat de complétion : Data Visualization',
              date: '15 septembre 2025',
              description: 'Visualisation de données avec Seaborn : graphiques de tendance, de distribution et de relation pour communiquer des résultats d’analyse.',
              apercu: '/certifications/apercus/datavis.png',
            },
          ],
        },
        {
          id: 'autres-formations',
          type: 'Attestation' as const,
          titre: 'Autres formations',
          organisme: 'Domaines extra-techniques',
          dateTri: '2025-09-06',
          statut: 'Obtenue' as const,
          resume: '',
          items: [
            {
              id: 'digitart-aemc',
              titre: "Attestation de participation au programme de formation Digit'Art",
              date: '1er – 6 septembre 2025',
              description: "Programme d'une semaine alliant compétences numériques et créativité : initiation au Pack Office, graphisme (charte graphique, création de visuels), création de contenus et personal branding, ainsi qu'une conférence sur l'intelligence artificielle appliquée à la santé.",
              apercu: '/certifications/apercus/digitart.png',
            },
            {
              id: 'rhema-marketing-reseaux-sociaux',
              titre: 'Certificat de fin de formation en marketing des réseaux sociaux',
              date: '9 juin 2025',
              description: 'Formation en marketing des réseaux sociaux : création de contenus, community management, stratégies de communication digitale et publicité en ligne.',
              apercu: '/certifications/apercus/rhema.png',
            },
          ],
        },
        {
          id: 'maths-science-donnees',
          type: 'Certification' as const,
          titre: 'Spécialisation : Mathématiques pour la science des données',
          organisme: 'Coursera',
          dateTri: '9999-12-31',
          statut: 'En cours' as const,
          resume: '',
          items: [
            {
              id: 'maths-algebre-lineaire',
              titre: 'Linear Algebra for Machine Learning and Data Science',
              date: 'En cours',
              description: "Fondements d'algèbre linéaire appliqués au Machine Learning : vecteurs, matrices, systèmes d'équations linéaires et valeurs propres.",
              apercu: '',
            },
            {
              id: 'maths-calculus',
              titre: 'Calculus for Machine Learning and Data Science',
              date: 'Non commencé',
              description: "Notions de calcul différentiel appliquées à l'optimisation des modèles de Machine Learning : dérivées, gradients et descente de gradient.",
              apercu: '',
            },
            {
              id: 'maths-probabilites-statistiques',
              titre: 'Probability & Statistics for Machine Learning & Data Science',
              date: 'Non commencé',
              description: "Fondements de probabilités et statistiques pour la science des données : distributions, inférence statistique et estimation appliquées au Machine Learning.",
              apercu: '',
            },
          ],
        },
      ],
    },

    timeline: [
      {
        id: 'stage-best-building',
        periode: 'Juil. 2026 – Sept. 2026',
        intitule: 'Stage Académique : Développement Web & Logiciel de Gestion',
        etablissement: 'Groupe Best-Building & Future Buildings',
        type: 'experience' as const,
        detail: 'Conception et mise en ligne de la vitrine web de l’entreprise et développement d’une solution logicielle interne dédiée à la gestion financière et comptable.',
      },
      {
        id: 'cycle-ingenieur',
        periode: 'Sept. 2025 – Juil. 2026',
        intitule: '1ère année du Cycle Ingénieur : Génie Informatique et Télécommunication',
        etablissement: 'EPAC (École Polytechnique d’Abomey-Calavi)',
        type: 'formation' as const,
        detail: "Tronc commun mêlant architecture matérielle, transmission et réseaux, et développement logiciel, complété par un stage en milieu industriel. Moyenne annuelle : 15,20/20.",
      },
      {
        id: 'eeia-vallet',
        periode: 'Juillet 2025',
        intitule: 'École d’Été en Intelligence Artificielle (EEIA, 5ᵉ édition)',
        etablissement: 'Bénin Excellence – Fondation Vallet',
        type: 'experience' as const,
        detail: 'Programme intensif en programmation, Machine Learning et robotique. Conception et développement en équipe d’un système de reconnaissance faciale.',
      },
      {
        id: 'prepa',
        periode: 'Sept. 2023 – Juil. 2025',
        intitule: 'Classes Préparatoires : Systèmes Industriels',
        etablissement: 'EPAC (École Polytechnique d’Abomey-Calavi)',
        type: 'formation' as const,
        detail: 'Formation intensive en mathématiques, physique et sciences de l’ingénieur, socle des compétences analytiques et de rigueur appliquées aux projets techniques.',
      },
      {
        id: 'bac',
        periode: 'Sept. 2022 – Juil. 2023',
        intitule: 'Baccalauréat de l’Enseignement Général, Série C',
        etablissement: 'Lycée',
        type: 'formation' as const,
        detail: 'Spécialités Mathématiques et Sciences Physiques. Mention Très Bien, moyenne : 16,45/20.',
      },
    ],
  },

  /** ----------------------------------------------------------------
   * Section « Contact » — Module 7
   * ---------------------------------------------------------------- */
  contact: {
    titre: 'Entrons en contact',
    sousTitre: 'Disponible pour échanger sur vos opportunités de recherche, de stages ou de bourses d’excellence.',
    email: 'vignonkanlinhanon5@gmail.com',
    localisation: 'AKOGBATO / Cotonou, Bénin',
    statutDisponibilite: 'À l’écoute d’opportunités de stages & bourses d’excellence',
    /**
     * Clé d'accès gratuite Web3Forms (https://web3forms.com).
     * Renseignez votre clé d'accès reçue par email pour activer l'envoi direct en boîte de réception.
     */
    cleWeb3Forms: 'dc3ba7f5-433d-4544-aca8-c3d5625c9e59',
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
