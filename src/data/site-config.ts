/**
 * src/data/site-config.ts
 *
 * Source unique de vérité pour les paramètres globaux du site.
 * Utilisé par la Navbar, Hero, Contact et Footer pour éviter toute
 * duplication de données (liens sociaux, URL du CV, identité du candidat).
 *
 * Décision clé : cvUrl pointe vers public/ — remplacer le fichier dans
 * public/ sans changer ce chemin garantit qu'aucun lien envoyé dans un
 * dossier de candidature ne devient mort (règle de gestion, module 8).
 */
export const siteConfig = {
  /** Identité du candidat — affichée dans la navbar et les métadonnées */
  nomCandidat: 'Vignon KANLINHANON',
  titreProfessionnel: 'Élève-Ingénieur Réseaux & Internet',

  /**
   * Chemin vers le CV dans public/.
   * Remplacer uniquement le fichier PDF, jamais ce chemin,
   * pour ne pas casser les liens déjà envoyés dans des candidatures.
   */
  cvUrl: '/cv_vignon_kanlinhanon_stages.pdf',
  cvNomFichier: 'CV_Vignon_Kanlinhanon_Stages.pdf',

  /** Liens sociaux — centralisés ici pour éviter la duplication Hero/Contact */
  liensSociaux: {
    github: 'https://github.com/username',
    linkedin: 'https://www.linkedin.com/in/username',
    email: 'contact@example.com',
  },
} as const;
