## Produit / Overview

Portfolio Next.js du candidat, destiné à accompagner des candidatures à des bourses d'excellence (voir le cahier des charges du projet pour le détail fonctionnel par module).

## Stack technique

Next.js 16.3.0 (App Router), React 19.2.8, TypeScript 5 (strict), Tailwind CSS v4, ESLint 9 (`eslint-config-next`). Gestionnaire de paquets : npm (`package-lock.json` fait foi — pas de yarn/pnpm).

## Structure du dépôt

- `app/` est à la racine du repo (pas `src/app/`) : c'est lui qui contient les routes Next.js.
- `src/components/` et `src/data/` contiennent respectivement les composants et les données.
- `tsconfig.json` fait pointer l'alias `@/*` vers la racine du repo, pas vers `src/`. Importer donc `@/src/components/Hero`, jamais `@/components/Hero`.

## Commandes de développement

- `npm run dev` — serveur de développement.
- `npm run lint` — vérifie le code (pas de `--fix` configuré).
- `npm run build` — build de production. Nécessite un accès réseau à `fonts.googleapis.com` (police Geist via `next/font/google`).
- Aucune suite de tests n'existe actuellement : ne pas supposer `npm test` disponible.

## Règles d'architecture

- Toute donnée utilisée à plus d'un endroit (liens sociaux, email de contact, compétences) doit être déplacée dans un fichier typé sous `src/data/`, sur le modèle de `projets.ts`. Aujourd'hui, les liens GitHub/LinkedIn sont dupliqués en dur dans `Hero.tsx` ET `Contact.tsx` — à corriger sur ce principe plutôt qu'en rajoutant une troisième copie. Le contenu réellement unique à une section (ex. : l'accroche du Hero) peut rester écrit directement dans le composant.
- DEMANDER avant de modifier les valeurs de `categorie` dans `projets.ts` ou la liste `filtres` de `Projects.tsx` : les deux doivent rester synchronisés, sinon le filtrage casse silencieusement.

## Conventions de code

Les entités de contenu utilisent des noms de champs en français, en camelCase (voir `src/data/projets.ts`) :

```ts
interface Projet {
  identifiant: string;
  titre: string;
  categorie: string;
  // ...
}
```

Ne pas traduire ces noms en anglais (`id`, `title`, `category`) : rester cohérent avec l'existant.

## Sécurité et confidentialité

NE JAMAIS committer de vraies données personnelles (email réel, tokens, clés). Les placeholders actuels (`username`, `contact@example.com`) doivent être remplacés via une config centralisée, pas écrits en clair dans plusieurs fichiers.

## Fichiers générés et restreints

Le bloc entre `<!-- BEGIN:nextjs-agent-rules -->` et `<!-- END:nextjs-agent-rules -->` est régénéré automatiquement par `next dev`. Ne pas le supprimer ni le modifier manuellement ; ajouter les instructions du projet en dehors de ce bloc.

## Git et pull request

Messages de commit : phrases descriptives en français (ex. : « Ajout du dossier src et mise à jour du layout »). Pas de format Conventional Commits. Aucun template de PR en place.

## Rapport de complétion

TOUJOURS lancer `npm run lint` avant de signaler une tâche terminée et indiquer s'il passe. Résumer les fichiers modifiés et, le cas échéant, signaler si `npm run build` n'a pas pu être vérifié (accès réseau aux polices Google requis).

# AGENTS.md — Règles permanentes du projet

## Contexte

Portfolio interactif (Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion) —
extension officielle du CV pour candidatures à des bourses d'excellence (profil
Élève-Ingénieur Réseaux Informatiques et Internet). Site statique/SSG : pas de backend,
pas de base de données. `data/projects.ts`, `data/skills.ts` et `data/site-config.ts`
sont la source unique de vérité (cahier des charges, sections 4 et 5.1).

## Méthode de travail

- Approche verticale : un module/une fonctionnalité à la fois, jamais plusieurs en
  parallèle.
- Avant tout code : proposer un plan (étapes, fichiers touchés, périmètre exact) et
  attendre une validation explicite avant d'exécuter.
- Ne jamais modifier un fichier en dehors du périmètre annoncé pour la tâche en cours.
- Après le code : lister explicitement les cas limites non gérés, sans attendre qu'on
  les demande.
- Une fonctionnalité n'est considérée terminée que si : test du chemin heureux + cas
  limites + conformité au cahier des charges + rapide non-régression sur 1-2
  fonctionnalités précédentes.

## Commentaires

- Commenter le POURQUOI des décisions (validations, choix d'architecture, cas limites
  gérés), jamais le QUOI évident.
- Ajouter un résumé en en-tête de chaque nouveau fichier non trivial (rôle, entrées,
  sorties, décisions clés).

## Toujours demander avant d'agir

- Toute modification de la structure de `data/projects.ts`, `data/skills.ts` ou
  `data/site-config.ts` déjà en place.
- Tout ajout de dépendance externe, payante ou non.
- Toute décision touchant à la charte graphique de la section 6 du cahier des charges
  (couleurs, typographie) — ne pas improviser de nouvelles couleurs hors des tokens
  définis dans `app/globals.css`.
- Toute suppression de contenu déjà écrit dans `data/`.

## Stack et style imposés

- Next.js App Router, TypeScript strict.
- Tailwind CSS via les tokens définis dans `app/globals.css` — aucune couleur codée en
  dur ailleurs dans les composants.
- Framer Motion pour les animations, toujours en amélioration progressive, jamais au
  détriment de la lisibilité ni de la sobriété académique attendue par un jury.
- Accessibilité WCAG AA non négociable : contrastes suffisants, navigation clavier
  complète, attributs alt sur toutes les images, aucune information encodée uniquement
  par la couleur (badges catégorie/statut = couleur + libellé texte).
- `prefers-reduced-motion` toujours respecté.

## Références

- Cahier des charges fonctionnel détaillé : source de vérité FONCTIONNELLE.
- Maquette Figma (si fournie) : source de vérité VISUELLE ET STRUCTURELLE de l'interface.