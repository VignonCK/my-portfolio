/**
 * src/data/projets.ts
 * Définit l'interface de l'entité Projet et exporte la liste statique des projets.
 * Ce fichier est la source unique de vérité pour le module Galerie (4) et Fiche détail (5).
 */
export interface Projet {
  identifiant: string;
  titre: string;
  categorie: string[];
  etiquetteCategorie: string; // Gardé pour l'affichage court du domaine principal
  resume: string;
  descriptionLongue: string;
  technologies: string[];
  image: string;
  urlGithub?: string;
  urlDemo?: string;
  misEnAvant: boolean;
  dateRealisation: string;
  resultats?: string;
}

export const PROJETS: Projet[] = [
  {
    identifiant: 'best-building-web-platform',
    titre: 'Plateforme Web Best Building',
    categorie: ['Développement Web'],
    etiquetteCategorie: 'Next.js / Tailwind',
    resume: "Plateforme web moderne pour une entreprise de construction.",
    descriptionLongue:
      "Conception d'une interface complète pour une entreprise de construction, avec gestion des projets, présentation des réalisations, formulaire de contact et génération de devis en ligne.",
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Vercel'],
    image: '/images/projects/best-building.jpg',
    urlGithub: 'https://github.com/username/best-building-web-platform',
    misEnAvant: true,
    dateRealisation: '2023-08-15',
    resultats: 'Augmentation de 42 % des demandes de service et réduction de 30 % du temps de réponse commerciale.',
  },
  {
    identifiant: 'infrastructure-dmz-securisee-cisco',
    titre: 'Infrastructure & DMZ Sécurisée Cisco',
    categorie: ['Réseaux & Infra'],
    etiquetteCategorie: 'Cisco IOS / ASA',
    resume: "Maquette réseau d'entreprise avec interconnexion VLAN et DMZ sécurisée.",
    descriptionLongue:
      "Mise en place d'une architecture réseau d'entreprise avec segmentation VLAN, routage inter-VLAN et DMZ protégée par pare-feu Cisco ASA, garantissant une isolation stricte des services exposés.",
    technologies: ['Cisco IOS', 'Cisco ASA', 'VLAN', 'OSPF', 'ACL', 'NAT'],
    image: '/images/projects/infrastructure-cisco.jpg',
    urlGithub: 'https://github.com/username/infrastructure-dmz-securisee-cisco',
    misEnAvant: true,
    dateRealisation: '2023-11-20',
    resultats: 'Amélioration de la sécurité réseau et conformité aux meilleures pratiques de segmentation et filtrage.',
  },
  {
    identifiant: 'moteur-algebre-lineaire-ml',
    titre: 'Moteur d\'Algèbre Linéaire pour ML',
    categorie: ['Machine Learning', 'Développement Logiciel'],
    etiquetteCategorie: 'Python / NumPy',
    resume: "Outil d'analyse vectorielle et matricielle pour la data science.",
    descriptionLongue:
      "Développement d'un moteur d'algèbre linéaire optimisé pour les workflows de machine learning, avec traitements de matrices, projections vectorielles et mesures de similarité pour l'analyse de données.",
    technologies: ['Python', 'NumPy', 'Pandas', 'SciPy', 'Jupyter'],
    image: '/images/projects/moteur-ml.jpg',
    urlGithub: 'https://github.com/username/moteur-algebre-lineaire-ml',
    misEnAvant: false,
    dateRealisation: '2024-02-10',
    resultats: 'Gains de performance de 60 % sur les calculs matriciels par rapport à des scripts Python conventionnels.',
  },
];
