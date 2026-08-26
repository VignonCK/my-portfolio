'use client';

/**
 * src/components/Navbar.tsx
 *
 * Barre de navigation fixe (sticky) du portfolio.
 *
 * Entrées : siteConfig (nomCandidat, cvUrl, cvNomFichier)
 * Sorties  : élément <header> rendu côté client
 *
 * Décisions clés :
 * - Composant client car il utilise useState, useEffect et IntersectionObserver.
 * - IntersectionObserver sur chaque section pour détecter la section active
 *   (plus fiable que l'écoute du scroll + calcul de position).
 * - Le fond passe de transparent à opaque après 20px de scroll, pour ne pas
 *   masquer le Hero au chargement initial.
 * - Le menu burger ferme automatiquement après un clic sur un lien (UX mobile).
 * - scroll-padding-top est géré dans globals.css, pas ici.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/src/data/site-config';
import Logo from '@/src/components/Logo';

/** Définition des ancres de navigation avec leurs libellés et ids de section */
const LIENS_NAV = [
  { libelle: 'Accueil',      idSection: 'hero' },
  { libelle: 'À propos',     idSection: 'apropos' },
  { libelle: 'Projets',      idSection: 'projets' },
  { libelle: 'Compétences',  idSection: 'competences' },
  { libelle: 'Contact',      idSection: 'contact' },
] as const;

export default function Navbar() {
  const [sectionActive, setSectionActive] = useState<string>('hero');
  const [menuOuvert, setMenuOuvert]       = useState(false);
  const [defileOccupe, setDefileOccupe]   = useState(false);

  /** Détecte la section visible via IntersectionObserver */
  useEffect(() => {
    const observateurs: IntersectionObserver[] = [];

    LIENS_NAV.forEach(({ idSection }) => {
      const element = document.getElementById(idSection);
      if (!element) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          // On ne met à jour la section active que si l'élément est
          // visible à plus de 50 % pour éviter les changements intempestifs
          if (entry.isIntersecting) {
            setSectionActive(idSection);
          }
        },
        { threshold: 0.4 }
      );

      obs.observe(element);
      observateurs.push(obs);
    });

    return () => observateurs.forEach((obs) => obs.disconnect());
  }, []);

  /** Fond de la navbar : transparent au départ, opaque après 20px de scroll */
  useEffect(() => {
    const gererScroll = () => setDefileOccupe(window.scrollY > 20);
    window.addEventListener('scroll', gererScroll, { passive: true });
    return () => window.removeEventListener('scroll', gererScroll);
  }, []);

  /** Ferme le menu mobile et fait défiler vers la section cible */
  const naviguerVers = (idSection: string) => {
    setMenuOuvert(false);
    const el = document.getElementById(idSection);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          defileOccupe
            ? 'bg-[var(--background)]/95 shadow-lg shadow-black/30 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10"
          aria-label="Navigation principale"
        >
          {/* Logo / Nom du candidat avec effet machine à écrire */}
          <button
            onClick={() => naviguerVers('hero')}
            className="group flex items-center gap-3 text-base font-bold tracking-tight text-[var(--text-primary)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Retour en haut de page"
          >
            <Logo 
              size={36} 
              colorPrimary="var(--surface)" 
              colorAccent="var(--accent)" 
              colorText="var(--text-primary)"
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            
            <span className="sr-only">{siteConfig.nomCandidat}</span>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              aria-hidden="true"
              className="flex font-artistic text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              {siteConfig.nomCandidat.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, display: 'none' },
                    visible: { opacity: 1, display: 'inline' }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="ml-1 inline-block h-5 w-1.5 bg-[var(--accent)]"
            />
          </button>

          {/* Liens de navigation — desktop */}
          <ul className="hidden items-center gap-6 md:flex" role="list">
            {LIENS_NAV.map(({ libelle, idSection }) => (
              <li key={idSection}>
                <button
                  onClick={() => naviguerVers(idSection)}
                  aria-current={sectionActive === idSection ? 'true' : undefined}
                  className={`text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    sectionActive === idSection
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {libelle}
                </button>
              </li>
            ))}
          </ul>

          {/* Bouton CV — desktop */}
          <a
            href={siteConfig.cvUrl}
            download={siteConfig.cvNomFichier}
            className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:inline-flex md:items-center"
          >
            Télécharger mon CV
          </a>

          {/* Bouton hamburger — mobile uniquement */}
          <button
            className="flex flex-col items-center justify-center gap-1.5 rounded-md p-2 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOuvert}
            aria-controls="menu-mobile"
          >
            {/* Les trois traits du hamburger, animés en croix si menu ouvert */}
            <span
              className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
                menuOuvert ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                menuOuvert ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
                menuOuvert ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Overlay menu mobile — plein écran */}
      {menuOuvert && (
        <div
          id="menu-mobile"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[var(--background)]/98 backdrop-blur-lg md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation mobile"
        >
          {LIENS_NAV.map(({ libelle, idSection }) => (
            <button
              key={idSection}
              onClick={() => naviguerVers(idSection)}
              className={`text-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                sectionActive === idSection
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-primary)] hover:text-[var(--accent)]'
              }`}
            >
              {libelle}
            </button>
          ))}

          {/* Bouton CV dans le menu mobile */}
          <a
            href={siteConfig.cvUrl}
            download={siteConfig.cvNomFichier}
            onClick={() => setMenuOuvert(false)}
            className="mt-4 rounded-full bg-[var(--accent)] px-6 py-3 text-base font-semibold text-slate-950 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Télécharger mon CV
          </a>
        </div>
      )}
    </>
  );
}
