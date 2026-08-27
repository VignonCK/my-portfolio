'use client';

/**
 * src/components/Footer.tsx — Module 7 (Pied de page)
 *
 * Entrées : siteConfig (src/data/site-config.ts)
 * Sorties  : <footer> avec :
 *   1. Identité du candidat & mention explicite du créateur
 *   2. Date de dernière mise à jour
 *   3. Liens de navigation rapide vers les sections
 *   4. Liens vers profils professionnels (GitHub, LinkedIn)
 *   5. Bouton de retour doux en haut de page
 *
 * Décisions clés :
 *   - Mention du créateur et date de mise à jour incluses.
 *   - Pas de mention des technologies conformément au cadrage.
 *   - Source unique de vérité siteConfig.
 */

import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { TbArrowUp } from 'react-icons/tb';
import { siteConfig } from '@/src/data/site-config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-slate-400 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Colonne gauche : Identité & Créateur */}
        <div>
          <a
            href="#hero"
            className="text-lg font-bold text-white transition-colors hover:text-cyan-300"
          >
            {siteConfig.nomCandidat}
          </a>
          <p className="mt-1 text-xs text-slate-400">
            {siteConfig.titreProfessionnel}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Créé et conçu par{' '}
            <strong className="text-slate-300 font-semibold">{siteConfig.footer.createur}</strong>
            {' • '}Dernière mise à jour : {siteConfig.footer.dateDerniereMaj}
          </p>
        </div>

        {/* Colonne centre/droite : Navigation & Réseaux */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          {/* Liens de navigation rapide */}
          <nav
            aria-label="Navigation secondaire du pied de page"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium"
          >
            {siteConfig.footer.liensNavigation.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="transition-colors hover:text-cyan-300"
              >
                {lien.label}
              </a>
            ))}
          </nav>

          {/* Liens réseaux sociaux & Bouton Remonter */}
          <div className="flex items-center gap-3 border-t border-white/10 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
            <a
              href={siteConfig.liensSociaux.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              aria-label="Profil GitHub"
            >
              <SiGithub size={15} />
            </a>

            <a
              href={siteConfig.liensSociaux.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 hover:text-cyan-200"
              aria-label="Profil LinkedIn"
            >
              <FaLinkedin size={15} />
            </a>

            {/* Bouton retour en haut */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Retourner en haut de la page"
              title="Retourner en haut de la page"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <TbArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright en bas */}
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-slate-500">
        <p>
          © 2026 {siteConfig.nomCandidat}. {siteConfig.footer.mentionDroits}
        </p>
      </div>
    </footer>
  );
}
