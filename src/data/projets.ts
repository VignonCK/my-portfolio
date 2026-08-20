export interface Projet {
  identifiant: string;
  titre: string;
  categorie: string;
  etiquetteCategorie: string;
  description: string;
  descriptionLongue: string;
  technologies: string[];
  resultats: string;
  urlGithub: string;
}

export const PROJETS: Projet[] = [
  {
    identifiant: 'best-building-web-platform',
    titre: 'Plateforme Web Best Building',
    categorie: 'Web',
    etiquetteCategorie: 'Next.js / Tailwind',
    description: "Plateforme web moderne pour une entreprise de construction.",
    descriptionLongue:
      "Conception d'une interface complète pour une entreprise de construction, avec gestion des projets, présentation des réalisations, formulaire de contact et génération de devis en ligne.",
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Vercel'],
    resultats: 'Augmentation de 42 % des demandes de service et réduction de 30 % du temps de réponse commerciale.',
    urlGithub: 'https://github.com/username/best-building-web-platform',
  },
  {
    identifiant: 'infrastructure-dmz-securisee-cisco',
    titre: 'Infrastructure & DMZ Sécurisée Cisco',
    categorie: 'Réseaux',
    etiquetteCategorie: 'Cisco IOS / ASA',
    description: "Maquette réseau d'entreprise avec interconnexion VLAN et DMZ sécurisée.",
    descriptionLongue:
      "Mise en place d'une architecture réseau d'entreprise avec segmentation VLAN, routage inter-VLAN et DMZ protégée par pare-feu Cisco ASA, garantissant une isolation stricte des services exposés.",
    technologies: ['Cisco IOS', 'Cisco ASA', 'VLAN', 'OSPF', 'ACL', 'NAT'],
    resultats: 'Amélioration de la sécurité réseau et conformité aux meilleures pratiques de segmentation et filtrage.',
    urlGithub: 'https://github.com/username/infrastructure-dmz-securisee-cisco',
  },
  {
    identifiant: 'moteur-algebre-lineaire-ml',
    titre: 'Moteur d\'Algèbre Linéaire pour ML',
    categorie: 'Données/ML',
    etiquetteCategorie: 'Python / NumPy',
    description: "Outil d'analyse vectorielle et matricielle pour la data science.",
    descriptionLongue:
      "Développement d'un moteur d'algèbre linéaire optimisé pour les workflows de machine learning, avec traitements de matrices, projections vectorielles et mesures de similarité pour l'analyse de données.",
    technologies: ['Python', 'NumPy', 'Pandas', 'SciPy', 'Jupyter'],
    resultats: 'Gains de performance de 60 % sur les calculs matriciels par rapport à des scripts Python conventionnels.',
    urlGithub: 'https://github.com/username/moteur-algebre-lineaire-ml',
  },
];
