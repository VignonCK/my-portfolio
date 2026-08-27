'use client';

/**
 * src/components/About.tsx
 *
 * Section « À propos » — Module 3 du portfolio.
 *
 * Entrées : siteConfig.apropos (bio, timeline)
 * Sorties  : élément <section id="apropos"> avec :
 *   1. En-tête section centré avec animation scroll reveal bidirectionnelle
 *   2. Bloc bio : photo + texte & Soft Skills 2x3
 *   3. Timeline unique "Mon Parcours" : Formations (cyan) & Expériences (ambre) unifiées
 *
 * Décisions clés :
 *   - Fusion chronologique des formations et expériences.
 *   - Différenciation visuelle : Badges et nœuds cyan pour formations, ambre pour expériences.
 *   - Animations sobres et fluides (translations légères ≤ 20px, 350-400ms, easeOut, once: false).
 *   - useReducedMotion respecté pour désactiver les translations si demandé.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
  TbCompass,
  TbShieldCheck,
  TbBulb,
  TbHierarchy2,
  TbBolt,
  TbUsersGroup,
  TbSparkles,
} from 'react-icons/tb';
import { siteConfig } from '@/src/data/site-config';

// ─── Mapping des icônes thématiques par qualité ──────────────────────────────

const ICONS_QUALITES: Record<string, IconType> = {
  'Curieux': TbCompass,
  'Rigoureux': TbShieldCheck,
  'Autonome': TbBulb,
  'Méthodique': TbHierarchy2,
  'Persévérant': TbBolt,
  "Esprit d'équipe": TbUsersGroup,
};

// ─── Sous-composant : Bloc bio (photo gauche + texte & soft skills droite) ───

function BlocBio({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const { bio } = siteConfig.apropos;

  return (
    <div className="mb-24 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-14">
      {/* ── Colonne gauche : Photo (Slide-in gauche sobre) ── */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-sm"
      >
        {/* Cadre photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-2xl shadow-black/40">
          {bio.photoUrl ? (
            <Image
              src={bio.photoUrl}
              alt={`Portrait de ${siteConfig.nomCandidat}`}
              fill
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <span className="text-5xl font-bold text-white/10 select-none">
                {siteConfig.nomCandidat.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
          )}

          {/* Overlay bas : citation */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-5">
            <p className="text-[11px] italic leading-relaxed text-white/70">
              {bio.citation}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Colonne droite : Texte & Soft Skills (Slide-in droite sobre) ── */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.08, ease: 'easeOut' }}
        className="flex flex-col gap-6"
      >
        {/* Paragraphes de présentation */}
        <div className="flex flex-col gap-4">
          {bio.paragraphes.map((texte, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-[var(--text-secondary)]"
            >
              {texte}
            </p>
          ))}
        </div>

        {/* Séparateur */}
        <div className="my-1 h-px w-20 bg-cyan-500/30" aria-hidden="true" />

        {/* ── Section Soft Skills / Savoir-être ────────────────────── */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Soft Skills
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Mes qualités humaines et comportementales
            </p>
          </div>

          {/* Grille responsive 2x3 / 3x2 de mini-cartes */}
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            aria-label="Qualités comportementales et humaines"
          >
            {bio.qualites.map((qualite) => {
              const Icon = ICONS_QUALITES[qualite] ?? TbSparkles;
              return (
                <div
                  key={qualite}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-slate-800/80 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  {/* Pastille lumineuse cyan avec icône thématique */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:bg-cyan-500/20 group-hover:text-cyan-200">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 transition-colors group-hover:text-white">
                    {qualite}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Sous-composant : Nœud de timeline ──────────────────────────────────────

function NoeudTimeline({
  estActif,
  estFormation,
}: {
  estActif: boolean;
  estFormation: boolean;
}) {
  const activeBorderGlow = estFormation
    ? 'border-cyan-400 bg-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.9)] ring-2 ring-cyan-400/50'
    : 'border-amber-400 bg-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.9)] ring-2 ring-amber-400/50';

  const dotColorClasses = estFormation ? 'bg-cyan-300 shadow-[0_0_8px_#22d3ee]' : 'bg-amber-300 shadow-[0_0_8px_#f59e0b]';
  const pingColorClasses = estFormation ? 'bg-cyan-400' : 'bg-amber-400';

  return (
    <div
      className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-400 ${
        estActif
          ? `${activeBorderGlow} scale-125 opacity-100`
          : 'border-white/20 bg-slate-950 scale-100 opacity-50'
      }`}
      aria-hidden="true"
    >
      {estActif && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${pingColorClasses}`}
        />
      )}
      <span
        className={`h-2 w-2 rounded-full transition-colors duration-400 ${
          estActif ? dotColorClasses : 'bg-white/30'
        }`}
      />
    </div>
  );
}

// ─── Sous-composant : Contenu d'une carte de timeline ───────────────────────

type EntreeTimeline = (typeof siteConfig.apropos.timeline)[number];

function ContenuCarte({
  entree,
  estActif,
}: {
  entree: EntreeTimeline;
  estActif: boolean;
}) {
  const badgeFormation = entree.type === 'formation';

  const styleActif = badgeFormation
    ? 'border-cyan-400/70 bg-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40 opacity-100 scale-[1.015]'
    : 'border-amber-400/70 bg-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40 opacity-100 scale-[1.015]';

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-400 ${
        estActif
          ? styleActif
          : 'border-white/10 bg-slate-900/40 shadow-black/20 opacity-65 hover:opacity-90'
      }`}
    >
      {/* Période + badge */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`text-xs font-bold transition-colors duration-400 ${
            estActif
              ? badgeFormation
                ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]'
                : 'text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]'
              : 'text-slate-400'
          }`}
        >
          {entree.periode}
        </span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-400 ${
            badgeFormation
              ? estActif
                ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400/80'
              : estActif
                ? 'border-amber-400/60 bg-amber-500/20 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'border-amber-500/20 bg-amber-500/10 text-amber-400/80'
          }`}
          aria-label={`Type : ${badgeFormation ? 'Formation' : 'Expérience'}`}
        >
          {badgeFormation ? 'Formation' : 'Expérience'}
        </span>
      </div>

      {/* Intitulé */}
      <h3
        className={`text-sm font-semibold leading-snug transition-colors duration-400 ${
          estActif ? 'text-white font-bold' : 'text-slate-200'
        }`}
      >
        {entree.intitule}
      </h3>

      {/* Établissement / Entreprise */}
      <p
        className={`mt-1 text-xs font-semibold transition-colors duration-400 ${
          badgeFormation
            ? estActif ? 'text-cyan-400' : 'text-cyan-400/70'
            : estActif ? 'text-amber-400' : 'text-amber-400/70'
        }`}
      >
        {entree.etablissement}
      </p>

      {/* Détail */}
      <p
        className={`mt-2 text-xs leading-relaxed transition-colors duration-400 ${
          estActif ? 'text-slate-200' : 'text-slate-400/80'
        }`}
      >
        {entree.detail}
      </p>
    </div>
  );
}

// ─── Sous-composant : Rangée de timeline ────────────────────────────────────

function CarteTimeline({
  entree,
  index,
  estActif,
  refCallback,
  shouldReduceMotion,
}: {
  entree: EntreeTimeline;
  index: number;
  estActif: boolean;
  refCallback: (el: HTMLDivElement | null) => void;
  shouldReduceMotion: boolean;
}) {
  const estADroite = index % 2 === 0;
  const estFormation = entree.type === 'formation';

  const variantesCarte: Variants = {
    masque: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : estADroite ? 20 : -20,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <div
      ref={refCallback}
      className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-x-6"
    >
      {/* ── Colonne gauche (desktop, cartes impaires) ── */}
      <div className="hidden md:flex md:flex-col md:items-end md:pb-12">
        {!estADroite && (
          <motion.div
            variants={variantesCarte}
            initial="masque"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="w-full max-w-xs"
          >
            <ContenuCarte entree={entree} estActif={estActif} />
          </motion.div>
        )}
      </div>

      {/* ── Nœud central ── */}
      <div className="flex flex-col items-center pt-4">
        <NoeudTimeline estActif={estActif} estFormation={estFormation} />
      </div>

      {/* ── Colonne droite ── */}
      <div className="flex flex-col items-start pb-12">
        {/* Mobile */}
        <motion.div
          variants={variantesCarte}
          initial="masque"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full max-w-xs md:hidden"
        >
          <ContenuCarte entree={entree} estActif={estActif} />
        </motion.div>

        {/* Desktop : cartes paires */}
        {estADroite && (
          <motion.div
            variants={variantesCarte}
            initial="masque"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="hidden w-full max-w-xs md:block"
          >
            <ContenuCarte entree={entree} estActif={estActif} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function About() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { apropos } = siteConfig;

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        {
          rootMargin: '-15% 0px -25% 0px',
          threshold: 0.1,
        }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [shouldReduceMotion]);

  return (
    <section
      id="apropos"
      aria-labelledby="titre-apropos"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-10"
    >
      {/* ── En-tête de section (Scroll Reveal) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-16 text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">À propos</p>
        <h2
          id="titre-apropos"
          className="mt-2 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
        >
          {apropos.titre}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {apropos.sousTitre}
        </p>
      </motion.div>

      {/* ── Bloc bio : photo gauche + texte & soft skills droite ───── */}
      <BlocBio shouldReduceMotion={shouldReduceMotion} />

      {/* ── Timeline unifiée : Mon Parcours (Formations & Expériences) */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-12 text-center text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]"
        >
          Mon Parcours
        </motion.p>

        <div className="relative">
          {/* Ligne verticale centrale */}
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/50 via-amber-500/30 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex flex-col">
            {apropos.timeline.map((entree, index) => (
              <CarteTimeline
                key={entree.id}
                entree={entree}
                index={index}
                estActif={activeIndex === index}
                refCallback={(el) => {
                  itemRefs.current[index] = el;
                }}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
