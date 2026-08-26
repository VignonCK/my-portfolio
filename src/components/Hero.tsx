'use client';

/**
 * src/components/Hero.tsx
 *
 * Section Hero (Page d'accueil) du portfolio.
 *
 * Entrées : siteConfig (nomCandidat, titreProfessionnel, hero, cvUrl, cvNomFichier, liensSociaux)
 * Sorties  : élément <section> avec animations Framer Motion
 *
 * Décisions clés :
 * - Utilisation de useReducedMotion pour respecter strictement prefers-reduced-motion (WCAG AA).
 * - Visualiseur réseau en SVG pur avec animation de flux de données (stroke-dashoffset) et pulsations de nœuds.
 * - Amélioration progressive : le contenu HTML reste entièrement présent et stylisé même sans JavaScript.
 * - Centralisation des textes pour une édition facile par le candidat.
 */

import { motion, useReducedMotion, Variants } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/src/data/site-config';



/**
 * Emplacement réservé pour la photo de profil du candidat.
 * Remplacer l'attribut `src` par le chemin réel de la photo dans public/
 * une fois le fichier image disponible — aucune modification du composant
 * ne sera nécessaire au-delà de ce changement de chemin.
 */
const PhotoProfil = ({ shouldReduceMotion }: { shouldReduceMotion: boolean }) => {
  const photoUrl = siteConfig.photoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="relative mx-auto flex h-[400px] w-full max-w-[340px] sm:max-w-[400px] sm:h-[480px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-2xl"
      aria-label="Photo de profil"
    >
      {/* Halo de pulsation externe très discret */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-2xl bg-cyan-500 pointer-events-none"
        />
      )}

      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`Portrait de ${siteConfig.nomCandidat}`}
          fill
          priority
          sizes="(max-width: 640px) 340px, 400px"
          className="object-cover"
        />
      ) : (
        <>
          {/* Icône silhouette placeholder */}
          <svg
            viewBox="0 0 80 80"
            fill="none"
            className="h-28 w-28 text-white/20 z-10"
            aria-hidden="true"
          >
            <circle cx="40" cy="28" r="16" fill="currentColor" />
            <path
              d="M8 72c0-17.673 14.327-32 32-32s32 14.327 32 32"
              fill="currentColor"
            />
          </svg>
          {/* Texte d'indication — retiré en production quand la photo est ajoutée */}
          <span className="absolute bottom-5 text-xs text-white/30 tracking-widest uppercase z-10">
            Photo à venir
          </span>
        </>
      )}
    </motion.div>
  );
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Variantes d'animation pour l'apparition progressive du texte
  const variantsConteneur: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const variantsItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex w-full max-w-6xl min-h-[calc(100vh-80px)] flex-col justify-center gap-12 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-20"
    >
      {/* Contenu textuel (Gauche) */}
      <motion.div
        className="max-w-2xl space-y-6 lg:w-1/2"
        variants={variantsConteneur}
        initial="hidden"
        animate="visible"
      >
        {/* Badges de profil Glassmorphism futuristes */}
        <motion.div variants={variantsItem} className="relative flex flex-col gap-3 items-start z-10 w-fit pb-1">
          {/* Lignes de réseau d'arrière-plan connectées */}
          <svg className="absolute -inset-x-6 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+48px)] pointer-events-none opacity-40 select-none -z-10" viewBox="0 0 460 90" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 15 20 Q 180 5 340 20 T 440 45 T 320 70" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 40 70 C 150 45 220 45 280 20" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
            <path d="M 160 20 C 180 45 320 45 380 70" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
            
            {/* Nœuds lumineux */}
            <circle cx="15" cy="20" r="2" fill="rgb(34, 211, 238)" className="animate-pulse" />
            <circle cx="160" cy="20" r="1.5" fill="rgb(34, 211, 238)" />
            <circle cx="280" cy="20" r="2" fill="rgb(34, 211, 238)" />
            <circle cx="340" cy="20" r="2.5" fill="rgb(34, 211, 238)" className="animate-pulse" />
            <circle cx="440" cy="45" r="1.5" fill="rgb(34, 211, 238)" />
            <circle cx="320" cy="70" r="2" fill="rgb(34, 211, 238)" />
            <circle cx="40" cy="70" r="2" fill="rgb(34, 211, 238)" className="animate-pulse" />
            <circle cx="380" cy="70" r="1.5" fill="rgb(34, 211, 238)" />
          </svg>

          {/* Badge du haut : Élève-Ingénieur */}
          <div className="inline-flex rounded-full border border-cyan-500/30 bg-slate-900/40 backdrop-blur-md px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)] shadow-[0_0_15px_rgba(6,182,212,0.15),inset_0_1px_2px_rgba(255,255,255,0.07)] select-none">
            {siteConfig.hero.badge}
          </div>

          {/* Badge du bas : Disponible stage */}
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-slate-900/40 backdrop-blur-md px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_15px_rgba(6,182,212,0.15),inset_0_1px_2px_rgba(255,255,255,0.07)] select-none">
            {/* Voyant d'état lumineux vert */}
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            
            <span>Disponible pour un stage</span>

            {/* Icône validation checkmark dans un cercle */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 text-white/90" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          variants={variantsItem}
          className="text-3xl font-bold leading-[1.2] text-[var(--text-primary)] sm:text-4xl lg:text-[2.6rem]"
        >
          {siteConfig.hero.accroche}
        </motion.h1>

        {/* Description de profil */}
        <motion.p
          variants={variantsItem}
          className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          {siteConfig.hero.description}
        </motion.p>

        {/* Appels à l'action */}
        <motion.div
          variants={variantsItem}
          className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2"
        >
          <motion.a
            href="#projets"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          >
            Voir mes projets
          </motion.a>
          <motion.a
            href={siteConfig.cvUrl}
            download={siteConfig.cvNomFichier}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-100 transition-colors hover:border-[var(--accent)] hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          >
            Télécharger mon CV
          </motion.a>
        </motion.div>

      </motion.div>

      {/* Emplacement photo de profil (Droite) */}
      <div className="flex items-center justify-center lg:w-1/2 min-h-[300px] lg:min-h-[400px]">
        <PhotoProfil shouldReduceMotion={shouldReduceMotion} />
      </div>

      {/* Indicateur de défilement (Bas centre) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <a
          href="#projets"
          aria-label="Faire défiler la page vers la section Projets"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded p-1 block"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex h-9 w-6 justify-center rounded-full border-2 border-slate-400/40 p-1.5 hover:border-[var(--accent)]/60 transition-colors"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 4, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-[var(--accent)]"
            />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
