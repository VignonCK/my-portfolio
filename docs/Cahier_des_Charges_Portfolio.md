# Cahier des Charges — Portfolio

**Projet de Développement Sur-Mesure | Profil Ingénieur & Candidature Bourse d'Excellence**

## 1. Contextualisation & Objectifs Stratégiques

**Contexte :** Dans le cadre des candidatures aux bourses d'excellence suite au diplôme d'ingénieur en réseau informatique et internet, le CV est strictement restreint à 2 pages. Ce portfolio interactif sert d'extension officielle au CV.

**Objectif principal :** Présenter l'exhaustivité des réalisations académiques et personnelles (infrastructures réseaux, modèles de Machine Learning, applications web/mobile) avec des preuves tangibles (code source, démonstrations, documentations).

**Public cible :** Comités d'attribution de bourses (professeurs, chercheurs, experts techniques et responsables académiques).

## 2. Architecture & Expérience Utilisateur

Le site est structuré sous forme de **Single-Page Application (SPA)** interactive, fluide et vivante, découpée en 6 sections principales :

| Section | Description & Composants |
|---|---|
| **1. Navigation** | Barre fixe avec logo/nom, ancres fluides vers les sections et bouton de téléchargement du CV au format PDF. |
| **2. Hero Section** | Accroche percutante et enthousiaste sur le profil d'Élève-Ingénieur, avec CTA vers les projets. |
| **3. À Propos** | Synthèse du parcours académique, des aspirations de recherche/ingénierie et de la méthodologie. |
| **4. Projets (Cœur)** | Galerie dynamique filtrable (Tous, Réseaux, ML/Data, Dev Web). Cartes détaillées avec badges, résumé, stack et liens GitHub/Démos. |
| **5. Compétences** | Matrice des savoir-faire regroupée par domaines d'expertise (Infrastructure, IA, Software, DevOps). |
| **6. Contact & Footer** | Liens institutionnels et professionnels (LinkedIn, GitHub, Email universitaire/pro). |

## 3. Identité Visuelle & Direction Artistique

**Ambiance générale :** Épurée, très claire, dynamique et professionnelle.

- **Arrière-plan principal :** Blanc cassé / Gris très clair (`#F8FAFC`) offrant une lisibilité et un confort visuel optimaux.
- **Couleur de structure (Texte & Titres) :** Bleu Nuit Deep (`#0F172A`) incarnant le sérieux et la rigueur académique.
- **Couleur d'accentuation :** Bleu Électrique / Cyan (`#0284C7`) apportant dynamisme et évoquant les réseaux et le flux de données.

**Thématiques illustrées :** Réseaux & Infra · Machine Learning · Développement Web

## 4. Spécifications Techniques & Stack

- **Framework Frontend :** Next.js (App Router) — performances maximales et SEO optimal.
- **Stylisation :** Tailwind CSS — intégration d'un design responsive et moderne.
- **Animations :** Framer Motion — micro-interactions fluides et dynamisme visuel au scroll.
- **Gestion des données :** Fichier typé `projects.ts` centralisé permettant un ajout rapide de nouveaux projets sans altérer la codebase.
- **Hébergement & Déploiement :** Vercel (intégration continue via GitHub).

---
*Document généré automatiquement — Document de cadrage technique pour le développement du Portfolio.*
