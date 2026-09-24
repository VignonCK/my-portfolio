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
import { createPortal } from 'react-dom';
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
  TbRosetteDiscountCheck,
  TbProgress,
  TbChevronLeft,
  TbChevronRight,
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
      {/* ── Colonne gauche : Photo + Soft Skills (Slide-in gauche sobre) ── */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mx-auto flex w-full max-w-sm flex-col gap-6"
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

          {/* Voile sombre uniforme sur tout le cadre pour fondre le détourage clair de la photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
        </div>

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

          {/* Grille responsive 2x3 de mini-cartes */}
          <div
            className="grid grid-cols-2 gap-3"
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

      {/* ── Colonne droite : Texte de présentation (Slide-in droite sobre) ── */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.08, ease: 'easeOut' }}
        className="flex flex-col gap-4"
      >
        {bio.paragraphes.map((texte, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-[var(--text-secondary)]"
          >
            {texte}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Sous-composant : Modale carrousel réutilisable ─────────────────────────
//
// Prend une liste de « diapositives » (image + titre + description propres à
// chacune) et gère navigation clavier, points de pagination et fermeture.
// Utilisée par une certification isolée (une seule diapositive dont le
// titre/description ne changent jamais) et par une carte groupée (plusieurs
// certificats distincts, chacun avec son propre titre/description).

type DiapositiveModale = {
  id: string;
  image: string;
  titre: string;
  description: string;
  soustitre?: string;
};

function ModaleCarrousel({
  diapositives,
  labelAccessible,
  onFermer,
}: {
  diapositives: DiapositiveModale[];
  labelAccessible: string;
  onFermer: () => void;
}) {
  const [indexActif, setIndexActif] = useState(0);
  const diapositiveActive = diapositives[indexActif];

  useEffect(() => {
    const precedentOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const gererTouche = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onFermer();
      }

      if (diapositives.length > 1 && event.key === 'ArrowRight') {
        setIndexActif((precedent) => (precedent + 1) % diapositives.length);
      }

      if (diapositives.length > 1 && event.key === 'ArrowLeft') {
        setIndexActif((precedent) =>
          precedent === 0 ? diapositives.length - 1 : precedent - 1
        );
      }
    };

    window.addEventListener('keydown', gererTouche);

    return () => {
      document.body.style.overflow = precedentOverflow;
      window.removeEventListener('keydown', gererTouche);
    };
  }, [diapositives.length, onFermer]);

  if (!diapositiveActive || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/92 p-4 sm:p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={labelAccessible}
      onClick={onFermer}
    >
      <button
        type="button"
        onClick={onFermer}
        className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        Fermer
      </button>

      <div
        className="relative flex max-h-[92vh] w-full max-w-[94vw] flex-col items-center justify-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex w-full items-center justify-center">
          {diapositives.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setIndexActif((precedent) =>
                  precedent === 0 ? diapositives.length - 1 : precedent - 1
                )
              }
              className="absolute left-3 z-10 rounded-full border border-white/10 bg-slate-950/80 p-2 text-white transition hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Voir l’élément précédent"
            >
              <TbChevronLeft size={20} />
            </button>
          )}

          <Image
            src={diapositiveActive.image}
            alt={`Aperçu agrandi de ${diapositiveActive.titre}`}
            width={1800}
            height={1400}
            sizes="94vw"
            className="max-h-[58vh] w-auto rounded-2xl border border-white/10 object-contain shadow-2xl"
          />

          {diapositives.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setIndexActif((precedent) => (precedent + 1) % diapositives.length)
              }
              className="absolute right-3 z-10 rounded-full border border-white/10 bg-slate-950/80 p-2 text-white transition hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Voir l’élément suivant"
            >
              <TbChevronRight size={20} />
            </button>
          )}
        </div>

        {diapositives.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {diapositives.map((diapositive, diapoIndex) => (
              <button
                key={diapositive.id}
                type="button"
                onClick={() => setIndexActif(diapoIndex)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  diapoIndex === indexActif
                    ? 'bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                    : 'bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Afficher ${diapositive.titre}`}
              />
            ))}
          </div>
        )}

        <div className="w-full max-w-3xl px-4 text-center">
          {diapositives.length > 1 && (
            <>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                {diapositiveActive.soustitre}
              </p>
              <h3 className="mt-1.5 text-base font-semibold text-white sm:text-lg">
                {diapositiveActive.titre}
              </h3>
            </>
          )}
          <p className="mt-2 text-sm leading-7 text-slate-300/90 sm:text-[15px]">
            {diapositiveActive.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Sous-composant : Section Certifications ────────────────────────────────

type Certification = (typeof siteConfig.apropos.certifications.liste)[number];

function CarteCertification({
  certification,
  index,
  shouldReduceMotion,
}: {
  certification: Certification;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const estObtenue = certification.statut === 'Obtenue';
  const imagesModale = certification.galerie?.length
    ? certification.galerie
    : certification.apercu
      ? [certification.apercu]
      : [];
  const diapositivesModale: DiapositiveModale[] = imagesModale.map((image, i) => ({
    id: `${certification.id}-${i}`,
    image,
    titre: certification.titre,
    description: certification.description,
  }));
  const [apercuErreur, setApercuErreur] = useState(false);
  const [modaleOuverte, setModaleOuverte] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/65 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-slate-900/80 hover:shadow-[0_0_24px_rgba(6,182,212,0.14)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/8 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        {certification.apercu && !apercuErreur ? (
          <button
            type="button"
            onClick={() => setModaleOuverte(true)}
            className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`Agrandir l’aperçu de ${certification.titre}`}
          >
            <Image
              src={certification.apercu}
              alt={`Aperçu de ${certification.titre}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setApercuErreur(true)}
            />
            <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/10" />
          </button>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1))] px-6 text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                {certification.type}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
                Ajoutez une image d’aperçu pour obtenir une carte plus visuelle.
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-1.5 bg-gradient-to-b from-slate-950/82 via-slate-950/35 to-transparent p-2.5">
          <span className="inline-flex items-center rounded-full border border-cyan-500/25 bg-slate-950/65 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-cyan-300 backdrop-blur-sm">
            {certification.type}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${
              estObtenue
                ? 'border-emerald-500/40 bg-slate-950/70 text-emerald-300'
                : 'border-amber-500/40 bg-slate-950/70 text-amber-300'
            }`}
          >
            {estObtenue ? (
              <TbRosetteDiscountCheck size={12} aria-hidden="true" />
            ) : (
              <TbProgress size={12} aria-hidden="true" />
            )}
            <span>{certification.statut}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
            {certification.date}
          </p>
          <h3 className="mt-2 max-w-[24ch] text-[0.92rem] font-semibold leading-[1.25] text-white sm:text-[0.98rem] lg:text-[1.02rem]">
            {certification.titre}
          </h3>
          <p className="mt-1.5 text-[12px] font-semibold text-cyan-300/95 sm:text-[13px]">
            {certification.organisme}
          </p>

        </div>

        {imagesModale.length === 0 && !String(certification.lien ?? '') && (
          <span className="mt-6 inline-flex text-xs font-medium text-slate-500">
            Ajoutez une image d’aperçu ou un lien de consultation pour enrichir cette carte
          </span>
        )}
      </div>
      {modaleOuverte && diapositivesModale.length > 0 && (
        <ModaleCarrousel
          diapositives={diapositivesModale}
          labelAccessible={`Aperçu agrandi de ${certification.titre}`}
          onFermer={() => setModaleOuverte(false)}
        />
      )}
    </motion.article>
  );
}

// ─── Sous-composant : Carte de certifications groupées (ex. Kaggle) ─────────

type GroupeCertifications = (typeof siteConfig.apropos.certifications.groupes)[number];

function CarteGroupeCertifications({
  groupe,
  index,
  shouldReduceMotion,
}: {
  groupe: GroupeCertifications;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const estObtenue = groupe.statut === 'Obtenue';
  const [apercuErreur, setApercuErreur] = useState(false);
  const [modaleOuverte, setModaleOuverte] = useState(false);

  const itemsAvecApercu = groupe.items.filter((item) => item.apercu);

  const diapositivesModale: DiapositiveModale[] = itemsAvecApercu.map((item) => ({
    id: item.id,
    image: item.apercu,
    titre: item.titre,
    description: item.description,
    soustitre: item.date,
  }));

  const imageCouverture = itemsAvecApercu[0]?.apercu;

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/65 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-slate-900/80 hover:shadow-[0_0_24px_rgba(6,182,212,0.14)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/8 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        {imageCouverture && !apercuErreur ? (
          <button
            type="button"
            onClick={() => setModaleOuverte(true)}
            className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`Voir les ${groupe.items.length} certificats de ${groupe.titre}`}
          >
            <Image
              src={imageCouverture}
              alt={`Aperçu de ${groupe.titre}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setApercuErreur(true)}
            />
            <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/10" />
          </button>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_45%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1))] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <TbProgress size={28} aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300/90">
              Certification en cours
            </p>
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-1.5 bg-gradient-to-b from-slate-950/82 via-slate-950/35 to-transparent p-2.5">
          <span className="inline-flex items-center rounded-full border border-cyan-500/25 bg-slate-950/65 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-cyan-300 backdrop-blur-sm">
            {groupe.type}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${
              estObtenue
                ? 'border-emerald-500/40 bg-slate-950/70 text-emerald-300'
                : 'border-amber-500/40 bg-slate-950/70 text-amber-300'
            }`}
          >
            {estObtenue ? (
              <TbRosetteDiscountCheck size={12} aria-hidden="true" />
            ) : (
              <TbProgress size={12} aria-hidden="true" />
            )}
            <span>{groupe.statut}</span>
          </span>

          <span className="inline-flex items-center rounded-full border border-white/15 bg-slate-950/65 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
            {groupe.items.length} certificats
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
            {groupe.items.length} certificats
          </p>
          <h3 className="mt-2 max-w-[24ch] text-[0.92rem] font-semibold leading-[1.25] text-white sm:text-[0.98rem] lg:text-[1.02rem]">
            {groupe.titre}
          </h3>
          <p className="mt-1.5 text-[12px] font-semibold text-cyan-300/95 sm:text-[13px]">
            {groupe.organisme}
          </p>
          <p className="mt-1.5 text-[12px] font-medium leading-snug text-slate-300/90 sm:text-[13px]">
            {groupe.resume}
          </p>
        </div>
      </div>

      {modaleOuverte && diapositivesModale.length > 0 && (
        <ModaleCarrousel
          diapositives={diapositivesModale}
          labelAccessible={`Certificats ${groupe.titre}`}
          onFermer={() => setModaleOuverte(false)}
        />
      )}
    </motion.article>
  );
}

// Fusionne `liste` et `groupes` en une seule séquence triée du plus récent
// au plus ancien (via `dateTri`, format YYYY-MM-DD), pour un classement
// chronologique global peu importe le type de carte.
type EntreeCertificationTriee =
  | { sorte: 'certification'; donnees: Certification }
  | { sorte: 'groupe'; donnees: GroupeCertifications };

function trierCertifications(
  liste: readonly Certification[],
  groupes: readonly GroupeCertifications[]
): EntreeCertificationTriee[] {
  const entrees: EntreeCertificationTriee[] = [
    ...liste.map((c) => ({ sorte: 'certification' as const, donnees: c })),
    ...groupes.map((g) => ({ sorte: 'groupe' as const, donnees: g })),
  ];

  return entrees.sort((a, b) => b.donnees.dateTri.localeCompare(a.donnees.dateTri));
}

function SectionCertifications({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const { certifications } = siteConfig.apropos;
  const entreesTriees = trierCertifications(certifications.liste, certifications.groupes);

  return (
    <div className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          {certifications.titre}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
          {certifications.sousTitre}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
        {entreesTriees.map((entree, index) => (
          <div
            key={entree.donnees.id}
            className="w-full md:w-[calc(50%-0.625rem)] xl:w-[calc(25%-0.9375rem)]"
          >
            {entree.sorte === 'certification' ? (
              <CarteCertification
                certification={entree.donnees}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ) : (
              <CarteGroupeCertifications
                groupe={entree.donnees}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
          </div>
        ))}
      </div>
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

      {/* ── Certifications : attestations et validations complémentaires ── */}
      <SectionCertifications shouldReduceMotion={shouldReduceMotion} />

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
