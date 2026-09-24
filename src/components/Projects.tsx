'use client';

/**
 * src/components/Projects.tsx — Module 4 (Galerie de projets — Cœur du portfolio)
 *
 * Entrées : PROJETS, filtrerProjets (src/data/projets.ts)
 * Sorties  : <section id="projets"> avec :
 *   1. En-tête de section
 *   2. Filtre par outil interactif (clic sur un tag technologique)
 *   3. Grille de cartes au design direct fidèle à la maquette cible :
 *      - Image d'aperçu de l'interface
 *      - Titre + Badge statut ("✓ Terminé")
 *      - Description brève (2 lignes)
 *      - Tags technologiques cliquables pour filtrage
 *      - Boutons directs d'action : "Voir le projet" (cyan) + "Code" (ou "Code privé")
 */

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import {
  TbExternalLink,
  TbCircleCheck,
  TbClock,
  TbFilter,
  TbX,
  TbCode,
} from 'react-icons/tb';
import {
  type Projet,
  filtrerProjets,
} from '@/src/data/projets';

// ─── Sous-composant : Aperçu visuel de l'interface ───────────────────────────

function ImageProjet({ projet }: { projet: Projet }) {
  const [imageErreur, setImageErreur] = useState(false);

  if (imageErreur) {
    return (
      <div className="relative flex aspect-[16/9.5] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5">
        {/* Barre de fenêtre style navigateur */}
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-[10px] text-slate-500">{projet.etiquetteCategorie}</span>
        </div>

        <div className="my-auto flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <TbCode size={26} />
          </div>
          <span className="text-sm font-bold text-white">{projet.titre}</span>
          <span className="text-xs text-slate-400">Aperçu interactif</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>{projet.technologies.slice(0, 3).join(' • ')}</span>
          <span className="text-cyan-400/80">Projet en ligne</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
      <Image
        src={projet.image}
        alt={`Capture d'écran de l'interface ${projet.titre}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setImageErreur(true)}
      />
    </div>
  );
}

// ─── Sous-composant : Carte Projet ───────────────────────────────────────────

function CarteProjet({
  projet,
  filtreTech,
  onSelectTech,
  shouldReduceMotion,
}: {
  projet: Projet;
  filtreTech: string | null;
  onSelectTech: (tech: string) => void;
  shouldReduceMotion: boolean;
}) {
  const estTermine = projet.statut === 'Terminé';

  return (
    <motion.article
      layout={!shouldReduceMotion ? 'position' : false}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        layout: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 hover:border-cyan-500/40 hover:shadow-[0_20px_40px_-15px_rgba(2,132,199,0.3)] sm:p-6"
    >
      <div>
        {/* ── 1. Image de l'interface ───────────────────────────── */}
        <ImageProjet projet={projet} />

        {/* ── 2. Ligne Titre + Badge Statut (Terminé / En cours) ── */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-white tracking-tight sm:text-2xl">
            {projet.titre}
          </h3>

          {estTermine ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
              <TbCircleCheck size={14} className="stroke-[2.2]" aria-hidden="true" />
              <span>Terminé</span>
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
              <TbClock size={14} className="stroke-[2.2]" aria-hidden="true" />
              <span>En cours</span>
            </span>
          )}
        </div>

        {/* ── 3. Description brève ──────────────────────────────── */}
        <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
          {projet.resume}
        </p>

        {/* ── 4. Tags des technologies / outils ─────────────────── */}
        <div className="mt-5 flex flex-wrap gap-2">
          {projet.technologies.map((tech) => {
            const isSelected = filtreTech?.toLowerCase() === tech.toLowerCase();
            return (
              <button
                key={tech}
                type="button"
                onClick={() => onSelectTech(tech)}
                aria-label={`Filtrer par l'outil ${tech}`}
                title={`Cliquer pour filtrer tous les projets utilisant ${tech}`}
                className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 5. Liens d'action : Voir le projet + Code (Toujours affichés) ──── */}
      <div className="mt-7 flex items-center gap-3">
        {/* Bouton Voir le projet (actif ou grisé) */}
        {projet.urlDemo ? (
          <a
            href={projet.urlDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-500 py-2.5 px-5 text-sm font-bold text-slate-950 shadow-[0_0_16px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_22px_rgba(6,182,212,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label={`Voir le projet déployé ${projet.titre}`}
          >
            <TbExternalLink size={16} aria-hidden="true" />
            <span>Voir le projet</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Démonstration non déployée pour ce projet"
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 py-2.5 px-5 text-sm font-semibold text-cyan-500/40"
          >
            <TbExternalLink size={16} aria-hidden="true" />
            <span>Voir le projet</span>
          </button>
        )}

        {/* Bouton Code (actif ou grisé avec icône GitHub) */}
        {projet.urlGithub && projet.codeVisible ? (
          <a
            href={projet.urlGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 px-5 text-sm font-medium text-slate-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`Voir le code source de ${projet.titre} sur GitHub`}
          >
            <SiGithub size={15} aria-hidden="true" />
            <span>Code</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Code source privé / propriétaire"
            className="flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/5 bg-transparent py-2.5 px-5 text-sm font-medium text-slate-600"
          >
            <SiGithub size={15} aria-hidden="true" />
            <span>Code</span>
          </button>
        )}
      </div>
    </motion.article>
  );
}

// ─── Composant principal : Galerie de projets ─────────────────────────────────

export default function Projects() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [filtreTech, setFiltreTech] = useState<string | null>(null);

  /**
   * Filtrage dynamique des projets par tag technologique
   */
  const projetsAffiches = filtrerProjets(filtreTech);

  const handleSelectTech = (tech: string) => {
    setFiltreTech((prev) => (prev?.toLowerCase() === tech.toLowerCase() ? null : tech));
  };

  return (
    <section
      id="projets"
      aria-labelledby="titre-projets"
      className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10"
    >
      {/* ── En-tête de section ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-12"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Galerie de réalisations
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="titre-projets"
              className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
            >
              Projets & Réalisations.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Ce que j&apos;ai construit en dit plus long que ce que je pourrais écrire — voici mes réalisations.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Indicateur de filtre par technologie active ─────────── */}
      {filtreTech && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.08, ease: 'easeOut' }}
          className="mb-8 flex items-center gap-2"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
            <TbFilter size={12} />
            <span>Outil : <strong>{filtreTech}</strong></span>
            <button
              type="button"
              onClick={() => setFiltreTech(null)}
              aria-label="Effacer le filtre par technologie"
              className="ml-1 rounded-full p-0.5 hover:bg-cyan-400/20"
            >
              <TbX size={13} />
            </button>
          </span>
        </motion.div>
      )}

      {/* ── Grille de projets avec transitions Framer Motion ─────── */}
      <motion.div
        layout="position"
        className="grid gap-6 md:grid-cols-2"
      >
        <AnimatePresence>
          {projetsAffiches.length > 0 ? (
            projetsAffiches.map((projet) => (
              <CarteProjet
                key={projet.identifiant}
                projet={projet}
                filtreTech={filtreTech}
                onSelectTech={handleSelectTech}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center"
            >
              <p className="text-base text-[var(--text-secondary)]">
                Aucun projet ne correspond aux critères sélectionnés.
              </p>
              <button
                type="button"
                onClick={() => setFiltreTech(null)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
              >
                <TbX size={14} />
                <span>Réinitialiser les filtres</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
