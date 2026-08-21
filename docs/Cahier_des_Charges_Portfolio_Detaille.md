**Cahier des charges fonctionnel détaillé**

**Portfolio Interactif --- Profil Ingénieur & Candidature Bourse
d'Excellence**

*Version étendue --- Projet de développement personnel sur-mesure*

Ce document est le cahier des charges fonctionnel complet et détaillé du
portfolio interactif destiné à servir d'extension officielle au CV dans
le cadre des candidatures aux bourses d'excellence. Il reprend et
enrichit considérablement le cadrage initial : chaque fonctionnalité est
décrite avec ses règles de gestion précises, et organisée par module
avec un niveau de priorité (Essentielle / Importante /
Optionnelle-avancée), afin de guider le développement fonctionnalité par
fonctionnalité, sans contrainte de calendrier fixe.

Sommaire des modules

  ---------------------------------------------------------------------------
  **N°**   **Module**                                         **Priorité**
  -------- -------------------------------------------------- ---------------
  1        Navigation et structure générale                   Essentielle

  2        Hero Section (page d'accueil)                     Essentielle

  3        À propos                                           Essentielle

  4        Galerie de projets (cœur du portfolio)             Essentielle

  5        Fiche détail d'un projet                          Essentielle

  6        Compétences                                        Essentielle

  7        Contact et pied de page                            Essentielle

  8        Téléchargement et gestion du CV                    Essentielle

  9        Multilinguisme (FR/EN)                             Importante

  10       SEO et partage social                              Importante

  11       Performance et accessibilité                       Importante

  12       Suivi de consultation (analytics léger)            Importante

  13       Mode clair/sombre                                  Optionnelle

  14       Recommandations et témoignages                     Optionnelle /
                                                              avancée

  15       Articles techniques (mini-blog)                    Optionnelle /
                                                              avancée
  ---------------------------------------------------------------------------

1\. Présentation générale du projet

1.1 Contexte

Dans le cadre des candidatures aux bourses d'excellence faisant suite
au diplôme d'ingénieur en réseaux informatiques et internet, le CV
officiel est strictement restreint à 2 pages. Ce format contraint oblige
à sacrifier de nombreux éléments probants --- code source,
démonstrations techniques, détail méthodologique des projets --- que ce
portfolio interactif vient restituer intégralement, sous une forme
vivante et consultable en ligne. Il constitue l'extension officielle du
CV, destinée à être jointe aux dossiers de candidature.

1.2 Objectif du projet

Développer une application web interactive (Single-Page Application)
permettant de présenter l'exhaustivité des réalisations académiques et
personnelles du candidat --- infrastructures réseaux, modèles de Machine
Learning, applications web/mobile --- avec des preuves tangibles
directement consultables (code source, démonstrations, documentations),
afin d'appuyer objectivement chaque candidature à une bourse
d'excellence.

1.3 Public cible

-   Comités d'attribution de bourses (professeurs, chercheurs, experts
    techniques et responsables académiques), potentiellement non
    francophones ou internationaux.

-   Recruteurs, laboratoires ou partenaires académiques susceptibles de
    consulter le profil du candidat en dehors du contexte strict de la
    bourse.

-   Le candidat lui-même, pour qui le portfolio constitue une vitrine
    professionnelle pérenne au-delà de la campagne de candidatures en
    cours.

1.4 Périmètre du document

Ce cahier des charges couvre l'ensemble des fonctionnalités envisagées
pour le projet, classées par priorité. Le développement avance
fonctionnalité par fonctionnalité en respectant l'ordre logique de
dépendance (voir section 7), sans obligation de développer les modules
optionnels si le temps ou les échéances de candidature ne le permettent
pas --- l'essentiel est la solidité et la complétude des modules
essentiels avant tout envoi de dossier.

2\. Acteurs et rôles du système

  -----------------------------------------------------------------------
  **Rôle**            **Description**             **Permissions
                                                  principales**
  ------------------- --------------------------- -----------------------
  Visiteur / Membre   Toute personne consultant   Consultation libre de
  de comité           le site publiquement, sans  toutes les sections,
                      compte ni authentification  filtrage des projets,
                      requise.                    téléchargement du CV,
                                                  accès aux liens
                                                  externes (GitHub,
                                                  démonstrations).

  Administrateur (le  Seul éditeur du contenu du  Ajout, modification ou
  candidat)           portfolio.                  retrait d'un projet,
                                                  d'une compétence ou
                                                  d'un contenu textuel
                                                  via le fichier de
                                                  données centralisé,
                                                  gestion du déploiement.
  -----------------------------------------------------------------------

*Aucune interface d'administration en ligne n'est prévue dans le
périmètre MVP : la gestion du contenu se fait directement via le fichier
de données typé et le déploiement continu, conformément à la stack
technique définie en section 8.*

3\. Modules fonctionnels détaillés

Module 1 --- Navigation et structure générale

**PRIORITÉ ESSENTIELLE (MVP)**

*Offrir un point d'entrée clair et professionnel, permettant à un
membre de comité de bourse de naviguer instantanément vers la preuve
qu'il recherche, sans confusion ni effort.*

**Fonctionnalités détaillées**

1.  Barre de navigation fixe (sticky)

    -   Logo/nom du candidat toujours visible, cliquable vers le haut de
        page.

    -   Ancres fluides (smooth scroll) vers chacune des sections
        principales (Accueil, À propos, Projets, Compétences, Contact).

    -   Bouton d'action « Télécharger mon CV » toujours visible, y
        compris en version mobile (menu repliable).

2.  Indicateur de section active

    -   Mise en évidence visuelle (couleur d'accentuation #0284C7) de
        l'ancre correspondant à la section actuellement visible au
        scroll.

3.  Navigation mobile

    -   Menu « hamburger » sur petit écran, ouverture en overlay plein
        écran avec les mêmes ancres, fermeture automatique après
        sélection.

**Règles de gestion**

-   La barre de navigation ne doit jamais masquer le contenu au scroll
    (compensation d'offset lors des ancres fluides).

-   Le bouton de téléchargement du CV pointe toujours vers la version la
    plus récente du fichier, sans lien mort possible (vérification au
    build).

Module 2 --- Hero Section (page d'accueil)

**PRIORITÉ ESSENTIELLE (MVP)**

*Capter l'attention du comité dès les premières secondes de
consultation, en résumant en un coup d'œil qui est le candidat et ce
qui le distingue.*

**Fonctionnalités détaillées**

4.  Accroche principale

    -   Titre percutant présentant le profil (nom, titre «
        Élève-Ingénieur en Réseaux Informatiques et Internet »), avec
        une phrase d'accroche sur l'aspiration académique et de
        recherche.

5.  Appels à l'action

    -   Bouton principal « Voir mes projets » (ancre vers le module 4)
        et bouton secondaire « Télécharger mon CV ».

6.  Élément visuel dynamique

    -   Micro-animation d'entrée (Framer Motion) : apparition
        progressive du texte et d'un élément graphique évoquant les
        réseaux et le flux de données, sans nuire au temps de chargement
        perçu.

7.  Indicateur de scroll

    -   Icône discrète invitant à faire défiler vers la section
        suivante, animée en boucle légère.

**Règles de gestion**

-   La Hero Section reste lisible et fonctionnelle même en cas d'échec
    de chargement du JavaScript (contenu essentiel présent dans le HTML
    de base, animations en amélioration progressive).

-   Aucune information changeante non maintenue (statistiques,
    compteurs) ne doit y figurer, pour éviter tout contenu visiblement
    obsolète.

Module 3 --- À propos

**PRIORITÉ ESSENTIELLE (MVP)**

*Donner du contexte humain et académique aux réalisations présentées
plus loin, en expliquant la démarche et les aspirations du candidat.*

**Fonctionnalités détaillées**

8.  Synthèse du parcours académique

    -   Résumé du parcours et de la spécialisation (réseaux/internet),
        rédigé en un à deux paragraphes courts et denses.

9.  Aspirations de recherche et d'ingénierie

    -   Présentation des domaines d'intérêt visés par la bourse
        (réseaux, IA, cybersécurité\...), en cohérence directe avec les
        projets du module 4.

10. Méthodologie de travail

    -   Courte présentation de la manière de travailler du candidat
        (rigueur, autonomie, veille technologique), idéalement appuyée
        par un exemple concret.

**Règles de gestion**

-   Le contenu reste strictement factuel et vérifiable, en cohérence
    totale avec le CV officiel joint --- aucune divergence
    d'information entre les deux supports.

Module 4 --- Galerie de projets (cœur du portfolio)

**PRIORITÉ ESSENTIELLE (MVP)**

*Constituer la pièce maîtresse du portfolio : permettre au comité
d'explorer rapidement l'ensemble des réalisations, filtrées par
domaine d'expertise.*

**Fonctionnalités détaillées**

11. Filtres par catégorie

    -   Quatre filtres actionnables : « Tous », « Réseaux & Infra », «
        Machine Learning », « Développement Web ».

    -   Filtrage côté client, sans rechargement de page, avec transition
        animée (Framer Motion) lors du changement de sélection.

12. Carte de projet

    -   Chaque carte affiche : illustration, titre, badge(s) de
        catégorie, résumé court (2-3 lignes), stack technique, liens
        directs vers le dépôt GitHub et/ou la démonstration en ligne.

    -   Effet de survol (hover) mettant en valeur la carte, cohérent
        avec la direction artistique définie en section 6.

13. Mise en avant

    -   Un projet peut être marqué « à la une » afin d'apparaître en
        premier quel que soit le filtre actif, pour orienter
        l'attention du comité vers les réalisations les plus
        pertinentes pour la bourse visée.

14. Accès à la fiche détaillée

    -   Le clic sur une carte ouvre la fiche détail du projet (module
        5), sans perte du contexte de filtre au retour.

**Règles de gestion**

-   Un projet sans lien GitHub ni démonstration valide ne peut pas être
    publié : chaque entrée doit comporter au moins une preuve tangible
    et consultable.

-   L'ajout d'un nouveau projet ne doit nécessiter que l'ajout d'une
    entrée dans le fichier centralisé \`projects.ts\`, sans modification
    du code des composants d'affichage.

Module 5 --- Fiche détail d'un projet

**PRIORITÉ ESSENTIELLE (MVP)**

*Offrir, pour chaque réalisation, un niveau de détail suffisant pour
qu'un expert technique puisse juger la qualité du travail sans quitter
le portfolio.*

**Fonctionnalités détaillées**

15. Présentation enrichie

    -   Description longue du contexte, des objectifs et du rôle précis
        du candidat (projet individuel ou en équipe).

    -   Liste détaillée de la stack technique utilisée, avec
        justification des choix si pertinent.

16. Preuves tangibles

    -   Captures d'écran ou schémas d'architecture (notamment pour les
        projets réseaux).

    -   Liens directs et vérifiés vers le code source et, le cas
        échéant, une démonstration fonctionnelle en ligne.

17. Résultats et enseignements

    -   Mention des résultats obtenus (métriques pour les projets ML,
        performance pour les projets réseau) et des difficultés
        rencontrées.

18. Navigation contextuelle

    -   Liens « Projet précédent / Projet suivant » au sein de la même
        catégorie, pour favoriser l'exploration continue.

**Règles de gestion**

-   L'affichage se fait en overlay ou en route dédiée, sans jamais
    casser le bouton « retour » du navigateur.

-   Toute affirmation de résultat chiffré doit être vérifiable ou
    nuancée si elle ne peut être justifiée publiquement (ex. : jeu de
    données propriétaire).

Module 6 --- Compétences

**PRIORITÉ ESSENTIELLE (MVP)**

*Donner une vue synthétique et structurée des savoir-faire du candidat,
complémentaire à la preuve par l'exemple apportée par les projets.*

**Fonctionnalités détaillées**

19. Matrice de compétences par domaine

    -   Regroupement par grands domaines : Infrastructure & Réseaux,
        Intelligence Artificielle/Data, Développement Logiciel, DevOps &
        Outils.

    -   Pour chaque domaine, liste des technologies maîtrisées, avec un
        niveau indicatif (notion / opérationnel / avancé).

20. Mise en lien avec les projets

    -   Chaque compétence peut renvoyer vers le ou les projets de la
        galerie qui la démontrent concrètement, pour éviter toute
        compétence déclarative non prouvée.

**Règles de gestion**

-   Aucune compétence affichée avec un niveau « avancé » ne doit être
    dépourvue d'au moins un projet associé dans la galerie, pour
    garantir la crédibilité de la matrice face à un jury expert.

Module 7 --- Contact et pied de page

**PRIORITÉ ESSENTIELLE (MVP)**

*Faciliter une prise de contact directe et professionnelle par un membre
du comité souhaitant approfondir une candidature.*

**Fonctionnalités détaillées**

21. Coordonnées et liens institutionnels

    -   Email universitaire/professionnel, lien LinkedIn, lien GitHub,
        éventuellement profil Google Scholar/ResearchGate si pertinent
        pour la bourse visée.

22. Formulaire de contact (optionnel dans le MVP)

    -   Si implémenté : formulaire simple (nom, email, message) avec
        envoi via un service tiers, sans stockage de données côté
        serveur propre.

23. Pied de page

    -   Rappel des liens principaux, mention de la stack technique
        utilisée, date de dernière mise à jour du portfolio.

**Règles de gestion**

-   Aucune donnée de contact n'est exposée sous une forme directement
    exploitable par des robots de collecte (obfuscation basique des
    adresses email).

Module 8 --- Téléchargement et gestion du CV

**PRIORITÉ ESSENTIELLE (MVP)**

*Garantir qu'à tout moment, le CV officiel de 2 pages reste accessible
en un clic, en cohérence stricte avec le contenu du portfolio.*

**Fonctionnalités détaillées**

24. Fichier centralisé

    -   Le CV est stocké comme un fichier PDF unique, référencé par un
        chemin unique utilisé par tous les boutons de téléchargement
        (navigation, hero, footer).

25. Bouton de téléchargement

    -   Déclenche un téléchargement direct, avec un nom de fichier
        explicite (ex. : \`CV_NomPrenom_IngenieurReseaux.pdf\`).

**Règles de gestion**

-   Toute mise à jour du CV remplace le fichier existant sans changer
    son chemin de référence, pour éviter tout lien mort dans une
    candidature déjà envoyée.

Module 9 --- Multilinguisme (FR/EN)

**PRIORITÉ IMPORTANTE (V2)**

*Lever la barrière de langue pour les comités de bourses internationaux,
qui ne sont pas nécessairement francophones.*

**Fonctionnalités détaillées**

26. Sélecteur de langue

    -   Bouton visible dans la barre de navigation (FR / EN), bascule
        instantanée sans rechargement complet de page.

27. Contenu traduit

    -   Traduction de l'ensemble des textes structurels (navigation,
        sections, descriptions de projets, compétences) ; les noms de
        technologies restent inchangés.

**Règles de gestion**

-   La langue sélectionnée est mémorisée localement et respectée lors
    des visites suivantes.

-   Aucune section ne doit rester partiellement traduite : une langue
    n'est validée que lorsque 100% des textes visibles sont couverts.

Module 10 --- SEO et partage social

**PRIORITÉ IMPORTANTE (V2)**

*Maximiser la visibilité et la crédibilité du lien du portfolio
lorsqu'il est partagé dans un dossier de candidature ou sur LinkedIn.*

**Fonctionnalités détaillées**

28. Métadonnées optimisées

    -   Balises title/description par page (via l'App Router Next.js),
        ciblant des mots-clés pertinents (ingénieur réseaux, machine
        learning, portfolio).

29. Open Graph et aperçu de partage

    -   Image de prévisualisation dédiée (bannière avec nom et titre du
        candidat) s'affichant lors du partage du lien sur LinkedIn,
        email ou messagerie.

30. Indexation

    -   Génération d'un sitemap.xml et d'un robots.txt, soumission
        possible à Google Search Console.

**Règles de gestion**

-   L'image Open Graph doit rester lisible même en miniature (test sur
    au moins deux plateformes avant mise en production).

Module 11 --- Performance et accessibilité

**PRIORITÉ IMPORTANTE (V2)**

*Garantir une expérience fluide et professionnelle, y compris pour un
membre de comité consultant le site depuis un réseau limité ou un outil
d'accessibilité.*

**Fonctionnalités détaillées**

31. Optimisation des performances

    -   Chargement différé (lazy loading) des images de projets,
        optimisation via next/image, score Lighthouse cible ≥ 90 sur
        Performance/SEO/Bonnes pratiques.

32. Accessibilité (WCAG AA)

    -   Contrastes suffisants entre texte et fond, navigation complète
        au clavier, attributs alt sur toutes les images, structure de
        titres cohérente pour les lecteurs d'écran.

**Règles de gestion**

-   Aucune information (catégorie de projet, statut) n'est communiquée
    uniquement par la couleur, conformément aux bonnes pratiques
    d'accessibilité.

Module 12 --- Suivi de consultation (analytics léger)

**PRIORITÉ IMPORTANTE (V2)**

*Permettre au candidat de savoir si son portfolio est effectivement
consulté par les comités après l'envoi d'une candidature, sans
compromettre la vie privée des visiteurs.*

**Fonctionnalités détaillées**

33. Outil d'analyse respectueux de la vie privée

    -   Intégration d'un outil léger et conforme RGPD (ex. : Plausible,
        Vercel Analytics), sans cookies de tracking intrusifs.

34. Indicateurs suivis

    -   Nombre de visites, pages/projets les plus consultés, provenance
        approximative, pour ajuster la mise en avant des projets selon
        la bourse visée.

**Règles de gestion**

-   Aucune donnée personnelle identifiable des visiteurs n'est
    collectée ni stockée.

Module 13 --- Mode clair/sombre

**OPTIONNELLE / AVANCÉE (V3)**

*Offrir un confort de lecture adapté aux préférences du visiteur, sans
dénaturer l'identité visuelle définie en section 6.*

**Fonctionnalités détaillées**

35. Bascule de thème

    -   Bouton dans la navigation, respect de la préférence système par
        défaut, mémorisation du choix explicite de l'utilisateur.

**Règles de gestion**

-   La couleur d'accentuation et la lisibilité des badges de statut
    sont conservées dans les deux thèmes, avec adaptation du fond et du
    texte uniquement.

Module 14 --- Recommandations et témoignages

**OPTIONNELLE / AVANCÉE (V3)**

*Renforcer la crédibilité du dossier par la parole de tiers (encadrants,
enseignants, chefs de projet) validant le sérieux et les compétences du
candidat.*

**Fonctionnalités détaillées**

36. Section témoignages

    -   Citations courtes attribuées (nom, fonction, structure), avec
        accord explicite préalable de la personne citée.

**Règles de gestion**

-   Aucun témoignage n'est publié sans autorisation écrite préalable de
    son auteur, conservée par le candidat hors périmètre technique du
    site.

Module 15 --- Articles techniques (mini-blog)

**OPTIONNELLE / AVANCÉE (V3)**

*Démontrer une capacité de recherche et de vulgarisation technique, un
critère souvent valorisé par les comités de bourses orientées
recherche.*

**Fonctionnalités détaillées**

37. Liste d'articles

    -   Articles courts (retour d'expérience, veille technologique,
        approfondissement d'un projet), rédigés en Markdown, gérés via
        fichiers statiques.

**Règles de gestion**

-   Ce module n'est développé qu'après consolidation complète des
    modules essentiels et importants, conformément à la feuille de route
    (section 7).

4\. Modèle de données

Entités et champs couvrant l'ensemble des modules essentiels et
importants. Les entités liées aux modules optionnels sont indiquées
séparément et peuvent être ajoutées ultérieurement sans remettre en
cause le schéma de base.

4.1 Entités principales

+-------------+--------------------------+----------------------------+
| **Entité**  | **Champs clés**          | **Description**            |
+=============+==========================+============================+
| Project     | id, slug, titre,         | Une réalisation présentée  |
|             | categorie\[\]            | dans la galerie, source    |
|             |                          | unique de vérité pour les  |
|             | resume,                  | modules 4 et 5.            |
|             | descriptionLongue,       |                            |
|             | stack\[\]                |                            |
|             |                          |                            |
|             | image, lienGithub,       |                            |
|             | lienDemo                 |                            |
|             |                          |                            |
|             | misEnAvant,              |                            |
|             | dateRealisation,         |                            |
|             | resultats                |                            |
+-------------+--------------------------+----------------------------+
| SkillDomain | id, nom                  | Regroupement des           |
|             | (Infrastructure/IA/      | savoir-faire par domaine,  |
|             |                          | croisé avec les projets    |
|             | Software/DevOps)         | (module 6).                |
|             |                          |                            |
|             | competences\[\] {nom,    |                            |
|             | niveau,                  |                            |
|             |                          |                            |
|             | projetsAssocies\[\]}     |                            |
+-------------+--------------------------+----------------------------+
| SiteConfig  | cvUrl, langueParDefaut,  | Paramètres globaux         |
|             |                          | centralisés, utilisés par  |
|             | liensSociaux {linkedin,  | les modules 1, 8, 9 et 10. |
|             | github, email},          |                            |
|             |                          |                            |
|             | imageOpenGraph           |                            |
+-------------+--------------------------+----------------------------+

4.2 Entités des modules optionnels

+-------------+--------------------------+----------------------------+
| **Entité**  | **Champs clés**          | **Module associé**         |
+=============+==========================+============================+
| Testimonial | id, auteur, fonction,    | Module 14 ---              |
|             |                          | Recommandations et         |
|             | structure, citation,     | témoignages                |
|             |                          |                            |
|             | dateAutorisation         |                            |
+-------------+--------------------------+----------------------------+
| Article     | id, slug, titre,         | Module 15 --- Articles     |
|             |                          | techniques                 |
|             | datePublication,         |                            |
|             |                          |                            |
|             | contenuMarkdown,         |                            |
|             | tags\[\]                 |                            |
+-------------+--------------------------+----------------------------+

4.3 Schéma relationnel simplifié (description textuelle)

-   Un Project appartient à une ou plusieurs categorie(s) (relation
    simple, pas de table de jointure nécessaire vu le volume attendu).

-   Une Competence référence zéro, un ou plusieurs Project via
    projetsAssocies, pour la mise en lien du module 6.

-   Le fichier \`projects.ts\` constitue la source unique de vérité pour
    Project et alimente à la fois la galerie (module 4), la fiche détail
    (module 5) et la matrice de compétences (module 6), garantissant
    qu'aucune donnée n'est dupliquée entre les composants.

5\. Exigences non fonctionnelles

5.1 Sécurité

-   Aucune donnée sensible ou personnelle de tiers n'est publiée sur le
    site, hormis les témoignages explicitement autorisés (module 14).

-   Le site étant statique/SSG en grande partie, la surface d'attaque
    est réduite ; tout formulaire de contact éventuel passe par un
    service tiers sécurisé plutôt qu'un backend propre.

5.2 Ergonomie et accessibilité

-   Interface pensée mobile-first : un membre de comité peut consulter
    le lien depuis un smartphone entre deux réunions.

-   Vocabulaire clair et intitulés de navigation sans jargon inutile.

5.3 Fiabilité et maintenabilité

-   Toute modification de contenu (nouveau projet, mise à jour du CV)
    est réalisable sans intervention sur le code des composants
    d'affichage, uniquement via \`projects.ts\` et le remplacement du
    fichier CV.

-   Déploiement continu via Vercel : toute modification poussée sur la
    branche principale de GitHub est automatiquement mise en ligne, avec
    prévisualisation possible avant fusion.

5.4 Performance

-   Temps de chargement initial (LCP) cible inférieur à 2,5 secondes sur
    connexion mobile standard.

-   Optimisation des images et des polices pour éviter tout décalage de
    mise en page (CLS) pénalisant l'expérience de lecture.

6\. Charte graphique et identité visuelle

Cette charte fixe les bases visuelles à respecter dès les premières
fonctionnalités développées (dès le Module 1 --- Navigation), pour
garantir une cohérence visuelle tout au long du projet plutôt que de la
corriger a posteriori.

6.1 Palette de couleurs

  -----------------------------------------------------------------------
  **Couleur**               **Usage**                **Signification
                                                     recherchée**
  ------------------------- ------------------------ --------------------
  Blanc cassé / Gris très   Arrière-plan principal   Clarté, sérénité,
  clair --- #F8FAFC         de toutes les sections   lisibilité optimale

  Bleu Nuit Deep ---        Texte courant, titres,   Sérieux, rigueur
  #0F172A                   structure                académique,
                                                     professionnalisme

  Bleu Électrique / Cyan    Accentuation : CTA,      Dynamisme, évocation
  --- #0284C7               liens actifs, badges «   des réseaux et du
                            Réseaux »                flux de données

  Vert de statut (proposé)  Badge « projet abouti /  Confirmation claire,
                            déployé »                aboutissement du
                                                     projet

  Gris neutre (proposé)     Éléments secondaires,    Sobriété, hiérarchie
                            séparateurs, légendes    visuelle
  -----------------------------------------------------------------------

+-----------------------------------------------------------------------+
| **⚠️ Règle d'accessibilité non négociable**                          |
|                                                                       |
| Une catégorie de projet ou un statut ne doit jamais être codé         |
| uniquement par la couleur. Chaque badge doit toujours associer une    |
| couleur à un libellé texte explicite, pour rester lisible par tous    |
| les membres du comité, y compris les personnes daltoniennes.          |
+-----------------------------------------------------------------------+

6.2 Typographie

-   Police sans-serif moderne et lisible, optimisée pour l'écran,
    cohérente avec l'ambiance « épurée, dynamique et professionnelle »
    recherchée.

-   Hiérarchie à trois niveaux : titre de section (grand, Bleu Nuit),
    sous-titre/nom de projet (moyen), texte courant/légende (petit, gris
    neutre).

6.3 Principes d'interface

-   Épuré et aéré : usage généreux des espaces blancs, pour ne jamais
    surcharger visuellement un comité qui consulte rapidement plusieurs
    candidatures.

-   Micro-interactions discrètes (Framer Motion) au scroll et au survol,
    jamais au détriment de la rapidité de lecture ni de la sobriété
    académique attendue.

-   Composants réutilisables entre sections (badges, cartes, boutons)
    pour une cohérence visuelle stricte, fidèle à l'esprit « vivant et
    interactif » recherché sans tomber dans le gadget visuel.

6.4 Exemple de composant type : la carte de projet

Ce composant, appelé à être réutilisé sur la galerie (module 4) et
potentiellement dans d'autres sections, illustre l'application
concrète de cette charte :

-   Illustration/vignette en haut de carte, avec badge de catégorie en
    superposition (couleur d'accentuation).

-   Titre du projet en Bleu Nuit, résumé en 2-3 lignes en gris neutre.

-   Ligne de tags de stack technique (icônes ou libellés courts).

-   Pied de carte avec icônes GitHub/Démo toujours visibles, jamais
    cachées derrière une interaction supplémentaire.

7\. Feuille de route d'évolution

Cette feuille de route n'impose aucun calendrier fixe : elle indique
l'ordre logique de développement, module par fonctionnalité, en
respectant les dépendances techniques et l'urgence liée aux échéances
de candidature.

Vague 1 --- Socle indispensable (modules essentiels)

38. Modélisation complète du fichier de données \`projects.ts\` et des
    types associés, avant toute construction de composant.

39. Module 1 --- Navigation et structure générale.

40. Module 2 --- Hero Section.

41. Module 3 --- À propos.

42. Module 6 --- Compétences.

43. Module 4 --- Galerie de projets.

44. Module 5 --- Fiche détail d'un projet.

45. Module 7 --- Contact et pied de page.

46. Module 8 --- Téléchargement du CV.

Vague 2 --- Portée et crédibilité (modules importants)

47. Module 10 --- SEO et partage social (à considérer comme prioritaire
    dès qu'une échéance de candidature approche).

48. Module 11 --- Performance et accessibilité.

49. Module 9 --- Multilinguisme FR/EN.

50. Module 12 --- Suivi de consultation.

Vague 3 --- Enrichissements optionnels (si le temps le permet)

51. Module 13 --- Mode clair/sombre.

52. Module 14 --- Recommandations et témoignages.

53. Module 15 --- Articles techniques.

+-----------------------------------------------------------------------+
| **💡 Rappel de méthode**                                              |
|                                                                       |
| Chaque module peut être découpé davantage en tâches lors de sa mise   |
| en développement. Le module 10 (SEO et partage social) mérite d'être |
| avancé avant les modules 9 et 12 dès qu'une échéance de candidature  |
| approche, même classé en Vague 2 : un lien de portfolio mal référencé |
| ou sans aperçu de partage perd une partie de son impact au moment     |
| précis où il compte le plus.                                          |
+-----------------------------------------------------------------------+
