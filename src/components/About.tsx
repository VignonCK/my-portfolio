'use client';

/**
 * src/components/About.tsx
 *
 * Section « À propos » — Module 3 du portfolio (v2).
 *
 * Entrées : siteConfig.apropos (bio, timeline)
 * Sorties  : élément <section id="apropos"> avec :
 *   1. En-tête section centré (overline + H2 + sous-titre) — sans photo circulaire
 *   2. Bloc bio : photo gauche + texte droite (présentation + aspirations + tags)
 *   3. Timeline académique avec animation d'état actif au scroll (IntersectionObserver)
 *
 * Décisions clés :
 * - useReducedMotion respecté sur toutes les animations (WCAG AA).
 * - Timeline : IntersectionObserver sur chaque entrée → activeIndex mis à jour
 *   au scroll → nœud actif s'illumine (glow + pulse) pour guider le lecteur.
 * - La ligne verticale est en CSS pur (pas de calcul JS de hauteur).
 * - bio.photoUrl vide → placeholder gris avec initiales du candidat.
 * - Aucun texte en dur dans le composant — tout vient de siteConfig.apropos.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/src/data/site-config';

// ─── Sous-composant : Bloc bio (photo gauche + texte droite) ─────────────────

function BlocBio({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const { bio } = siteConfig.apropos;

  const variantesEntree: Variants = {
    masque: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };

  return (
    <div className="mb-24 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-14">

      {/* ── Colonne gauche : Photo ── */}
      <motion.div
        variants={variantesEntree}
        initial="masque"
        whileInView="visible"
        viewport={{ once: true }}
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
            /* Placeholder initiales — retiré dès que photoUrl est renseigné */
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <span className="text-5xl font-bold text-white/10 select-none">
                {siteConfig.nomCandidat.split(' ').map(n => n[0]).join('')}
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

      {/* ── Colonne droite : Texte ── */}
      <motion.div
        variants={variantesEntree}
        initial="masque"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="flex flex-col gap-5"
      >
        {/* Paragraphes de présentation — tous en couleur secondaire */}
        {bio.paragraphes.map((texte, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-[var(--text-secondary)]"
          >
            {texte}
          </p>
        ))}

        {/* Séparateur */}
        <div className="my-1 h-px w-16 bg-cyan-500/30" aria-hidden="true" />

        {/* Qualités personnelles */}
        <div className="flex flex-wrap gap-2" aria-label="Qualités personnelles">
          {bio.qualites.map((qualite) => (
            <span
              key={qualite}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
            >
              {/* Checkmark cyan discret */}
              <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 shrink-0 text-cyan-400" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {qualite}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

// ─── Sous-composant : Nœud de timeline ──────────────────────────────────────

function NoeudTimeline({ estActif }: { estActif: boolean }) {
  return (
    <div
      className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
        estActif
          ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_14px_rgba(6,182,212,0.6)] scale-125'
          : 'border-white/20 bg-[var(--surface)] scale-100'
      }`}
      aria-hidden="true"
    >
      {estActif && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-30" />
      )}
      <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${estActif ? 'bg-cyan-400' : 'bg-white/20'}`} />
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

  return (
    <div
      className={`rounded-2xl border p-5 shadow-lg transition-all duration-500 ${
        estActif
          ? 'border-cyan-500/40 bg-[var(--surface)] shadow-cyan-500/10'
          : 'border-white/8 bg-[var(--surface)]/60 shadow-black/10'
      }`}
    >
      {/* Période + badge */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className={`text-xs font-semibold transition-colors duration-500 ${estActif ? 'text-cyan-400' : 'text-[var(--text-secondary)]'}`}>
          {entree.periode}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
            badgeFormation ? 'bg-cyan-500/10 text-cyan-300' : 'bg-violet-500/10 text-violet-300'
          }`}
          aria-label={`Type : ${badgeFormation ? 'Formation' : 'Expérience'}`}
        >
          {badgeFormation ? 'Formation' : 'Expérience'}
        </span>
      </div>

      {/* Intitulé */}
      <h3 className={`text-sm font-semibold leading-snug transition-colors duration-500 ${estActif ? 'text-[var(--text-primary)]' : 'text-white/60'}`}>
        {entree.intitule}
      </h3>

      {/* Établissement */}
      <p className="mt-1 text-xs font-medium text-[var(--accent)]">
        {entree.etablissement}
      </p>

      {/* Détail */}
      <p className={`mt-2 text-xs leading-relaxed transition-colors duration-500 ${estActif ? 'text-[var(--text-secondary)]' : 'text-white/35'}`}>
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

  const variantesCarte: Variants = {
    masque: { opacity: 0, x: shouldReduceMotion ? 0 : estADroite ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div ref={refCallback} className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-x-6">

      {/* ── Colonne gauche (desktop, cartes impaires) ── */}
      <div className="hidden md:flex md:flex-col md:items-end md:pb-12">
        {!estADroite && (
          <motion.div
            variants={variantesCarte}
            initial="masque"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full max-w-xs"
          >
            <ContenuCarte entree={entree} estActif={estActif} />
          </motion.div>
        )}
      </div>

      {/* ── Nœud central ── */}
      <div className="flex flex-col items-center pt-4">
        <NoeudTimeline estActif={estActif} />
      </div>

      {/* ── Colonne droite ── */}
      <div className="flex flex-col items-start pb-12">
        {/* Mobile : toutes les cartes ici */}
        <motion.div
          variants={variantesCarte}
          initial="masque"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
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
            viewport={{ once: true, margin: '-60px' }}
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

  /**
   * Tracking de l'entrée active au scroll via IntersectionObserver.
   * Chaque CarteTimeline passe un ref callback → on stocke les refs dans un tableau.
   * Quand une entrée est visible à ≥ 40%, on la marque comme active.
   * Initialisation : première entrée active par défaut.
   */
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return; // Pas d'animation → laisser le premier actif

    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, [shouldReduceMotion]);

  /* Variantes communes pour les blocs de texte */
  const variantesBloc: Variants = {
    masque: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="apropos"
      aria-labelledby="titre-apropos"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-10"
    >
      {/* ── En-tête de section ─────────────────────────────────────── */}
      <motion.div
        variants={variantesBloc}
        initial="masque"
        whileInView="visible"
        viewport={{ once: true }}
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

      {/* ── Bloc bio : photo gauche + texte droite ─────────────────── */}
      <BlocBio shouldReduceMotion={shouldReduceMotion} />

      {/* ── Timeline du parcours académique ────────────────────────── */}
      <div>
        <motion.p
          variants={variantesBloc}
          initial="masque"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]"
        >
          Parcours académique
        </motion.p>

        <div className="relative">
          {/* Ligne verticale centrale */}
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex flex-col">
            {apropos.timeline.map((entree, index) => (
              <CarteTimeline
                key={entree.id}
                entree={entree}
                index={index}
                estActif={activeIndex === index}
                refCallback={(el) => { itemRefs.current[index] = el; }}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

