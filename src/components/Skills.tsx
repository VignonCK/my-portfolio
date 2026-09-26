'use client';

/**
 * src/components/Skills.tsx — Module 6 (Anneaux SVG + Icônes d'outils + Cartes avec ombre encadrée au survol)
 *
 * Entrées : DOMAINES_COMPETENCES (src/data/competences.ts)
 * Sorties  : <section id="competences"> avec :
 *   1. En-tête de section
 *   2. Barre d'onglets colorés par domaine (Dev Web / Data & IA / Bases de données / Outils)
 *   3. Grille de cartes élégantes avec anneau de progression SVG, icônes d'outils (react-icons),
 *      et effet d'ombre/cadre lumineux au survol.
 */

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiLaravel,
  SiDjango,
  SiStreamlit,
  SiPython,
  SiPandas,
  SiNumpy,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiMysql,
  SiGit,
  SiVercel,
} from 'react-icons/si';
import {
  TbChartHistogram,
  TbCloudDataConnection,
  TbCurrencyDollar,
} from 'react-icons/tb';
import { DOMAINES_COMPETENCES, type Competence } from '@/src/data/competences';

// ─── Constantes SVG ───────────────────────────────────────────────────────────

/** Rayon de l'anneau dans un viewBox 100×100 */
const RADIUS = 38;
/** Épaisseur du trait de l'anneau */
const STROKE_W = 6;
/** Périmètre complet = 2π × r ≈ 238.76 */
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ─── Config couleurs par domaine ──────────────────────────────────────────────

const COULEURS: Record<
  string,
  {
    hex: string;
    ongletActif: string;
    ongletHover: string;
    glowRgba: string;
  }
> = {
  'dev-web': {
    hex: '#22d3ee',
    ongletActif:
      'border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.35)]',
    ongletHover: 'hover:border-cyan-400/40 hover:text-cyan-400/70',
    glowRgba: 'rgba(34, 211, 238, 0.3)',
  },
  'data-ia': {
    hex: '#fb923c',
    ongletActif:
      'border-orange-400 bg-orange-400/10 text-orange-300 shadow-[0_0_14px_rgba(251,146,60,0.35)]',
    ongletHover: 'hover:border-orange-400/40 hover:text-orange-400/70',
    glowRgba: 'rgba(251, 146, 60, 0.3)',
  },
  'bases-donnees': {
    hex: '#a78bfa',
    ongletActif:
      'border-violet-400 bg-violet-400/10 text-violet-300 shadow-[0_0_14px_rgba(167,139,250,0.35)]',
    ongletHover: 'hover:border-violet-400/40 hover:text-violet-400/70',
    glowRgba: 'rgba(167, 139, 250, 0.3)',
  },
  'outils-deploiement': {
    hex: '#34d399',
    ongletActif:
      'border-emerald-400 bg-emerald-400/10 text-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.35)]',
    ongletHover: 'hover:border-emerald-400/40 hover:text-emerald-400/70',
    glowRgba: 'rgba(52, 211, 153, 0.3)',
  },
};

// ─── Mapping des icônes par compétence ────────────────────────────────────────

const ICONS: Record<string, IconType> = {
  // Développement Web
  'react': SiReact,
  'nextjs': SiNextdotjs,
  'typescript': SiTypescript,
  'tailwind': SiTailwindcss,
  'vite': SiVite,
  'nodejs-express': SiNodedotjs,
  'laravel-php': SiLaravel,
  'django': SiDjango,
  'streamlit': SiStreamlit,
  // Data & IA
  'python': SiPython,
  'pandas': SiPandas,
  'numpy': SiNumpy,
  'monte-carlo': TbChartHistogram,
  // Bases de données
  'postgresql': SiPostgresql,
  'prisma': SiPrisma,
  'supabase': SiSupabase,
  'mysql': SiMysql,
  // Outils & Déploiement
  'git-github': SiGit,
  'vercel': SiVercel,
  'api-externes': TbCloudDataConnection,
  'flutterwave': TbCurrencyDollar,
};

// ─── Sous-composant : Carte de compétence avec Anneau SVG & Icône ─────────────

function CarteCompetence({
  competence,
  couleur,
  glowRgba,
  index,
  shouldReduceMotion,
}: {
  competence: Competence;
  couleur: string;
  glowRgba: string;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const targetOffset = CIRCUMFERENCE * (1 - competence.pourcentage / 100);
  const Icon = ICONS[competence.id];
  const delai = shouldReduceMotion ? 0 : index * 0.07;

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.35, delay: delai, ease: 'easeOut' }}
      className="group relative flex w-36 flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-slate-800/60 sm:w-40 sm:p-5"
      style={{
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 14px 30px -5px rgba(0, 0, 0, 0.6), 0 0 22px 2px ${glowRgba}`;
        e.currentTarget.style.borderColor = `${couleur}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.35)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* SVG Anneau */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          {/* Piste de fond */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={STROKE_W}
          />

          {/* Arc de progression avec glow */}
          <g style={{ filter: `drop-shadow(0 0 7px ${couleur})` }}>
            <motion.circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={couleur}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{
                strokeDashoffset: shouldReduceMotion ? targetOffset : CIRCUMFERENCE,
              }}
              animate={{ strokeDashoffset: targetOffset }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: delai,
              }}
            />
          </g>
        </svg>

        {/* Contenu centré : Icône + Pourcentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
          {Icon ? (
            <Icon
              className="text-xl transition-transform duration-300 group-hover:scale-110 sm:text-2xl lg:text-[28px]"
              style={{
                color: couleur,
                filter: `drop-shadow(0 0 8px ${couleur}70)`,
              }}
              aria-hidden="true"
            />
          ) : (
            <span
              className="text-xs font-extrabold tracking-wide sm:text-sm"
              style={{ color: couleur }}
            >
              {competence.nom.slice(0, 3).toUpperCase()}
            </span>
          )}
          <span
            className="text-[10px] font-bold tracking-tight sm:text-[11px]"
            style={{ color: couleur }}
          >
            {competence.pourcentage}%
          </span>
        </div>
      </div>

      {/* Nom de la compétence */}
      <span className="text-center text-xs font-semibold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-white sm:text-[13px]">
        {competence.nom}
      </span>
    </motion.div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function Skills() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  /**
   * Onglet actif — initialisé sur le premier domaine.
   */
  const [activeTab, setActiveTab] = useState(DOMAINES_COMPETENCES[0].id);

  const domaineActif = DOMAINES_COMPETENCES.find((d) => d.id === activeTab)!;
  const configActif = COULEURS[activeTab] ?? COULEURS['dev-web'];

  return (
    <section
      id="competences"
      aria-labelledby="titre-competences"
      className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10"
    >
      {/* ── En-tête ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-14 text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          Compétences
        </p>
        <h2
          id="titre-competences"
          className="mt-2 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
        >
          Expertise technique & Savoir-faire.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          Technologies maîtrisées et outils utilisés au quotidien.
        </p>
      </motion.div>

      {/* ── Barre d'onglets ─────────────────────────────────────── */}
      <motion.div
        role="tablist"
        aria-label="Domaines de compétences"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.08, ease: 'easeOut' }}
        className="mb-14 flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {DOMAINES_COMPETENCES.map((domaine) => {
          const estActif = activeTab === domaine.id;
          const conf = COULEURS[domaine.id];
          return (
            <button
              key={domaine.id}
              role="tab"
              aria-selected={estActif}
              aria-controls={`panel-${domaine.id}`}
              id={`tab-${domaine.id}`}
              onClick={() => setActiveTab(domaine.id)}
              className={`rounded-full border px-5 py-1.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                estActif
                  ? conf.ongletActif
                  : `border-white/15 text-[var(--text-secondary)] ${conf.ongletHover}`
              }`}
            >
              {domaine.labelCourt}
            </button>
          );
        })}
      </motion.div>

      {/* ── Grille des cartes avec transition ───────────────────── */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex flex-wrap justify-center gap-5 sm:gap-6 lg:gap-8"
          >
            {domaineActif.competences.map((comp, i) => (
              <CarteCompetence
                key={`${activeTab}-${comp.id}`}
                competence={comp}
                couleur={configActif.hex}
                glowRgba={configActif.glowRgba}
                index={i}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
