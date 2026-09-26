'use client';

/**
 * src/components/Contact.tsx — Module 7 (Section Contact)
 *
 * Entrées : siteConfig (src/data/site-config.ts)
 * Sorties  : <section id="contact"> avec :
 *   1. En-tête de section avec badge de disponibilité
 *   2. Colonne gauche : Coordonnées professionnelles, email, localisation et liens sociaux
 *   3. Colonne droite : Formulaire de contact moderne avec validation et action mailto
 *
 * Décisions clés :
 * - Données centralisées dans siteConfig (aucun email ou lien codé en dur).
 * - Envoi via mailto pré-rempli et formaté pour un fonctionnement statique sans backend.
 * - Accessibilité WCAG AA (labels explicites, focus-visible, aria-required).
 */

import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import {
  TbMail,
  TbMapPin,
  TbSend,
  TbSparkles,
  TbCheck,
  TbCopy,
  TbAlertTriangle,
  TbLoader2,
} from 'react-icons/tb';
import { siteConfig } from '@/src/data/site-config';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [statut, setStatut] = useState<'idle' | 'succes' | 'erreur'>('idle');
  const [messageRetour, setMessageRetour] = useState('');
  const [emailCopie, setEmailCopie] = useState(false);

  const copierEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setEmailCopie(true);
      setTimeout(() => setEmailCopie(false), 2500);
    } catch {
      // Fallback
    }
  };

  const ouvrirMailto = () => {
    const destinataire = siteConfig.contact.email;
    const corps = `Bonjour,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A---%0D%0AExpéditeur : ${encodeURIComponent(nom)} (${encodeURIComponent(email)})`;
    const mailtoUrl = `mailto:${destinataire}?subject=${encodeURIComponent(sujet || 'Contact depuis le portfolio')}&body=${corps}`;
    window.location.href = mailtoUrl;
  };

  async function envoyerMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (envoiEnCours) return;

    setEnvoiEnCours(true);
    setStatut('idle');
    setMessageRetour('');

    const cleAccess = String(siteConfig.contact.cleWeb3Forms ?? '');

    // Si une clé d'accès Web3Forms est fournie, envoi direct en arrière-plan
    if (cleAccess.trim() !== '') {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: cleAccess,
            name: nom,
            email,
            subject: sujet || `Message de ${nom} depuis le portfolio`,
            message,
            from_name: nom,
          }),
        });

        const data: { success?: boolean; message?: string } = await res.json();

        if (res.ok && data.success) {
          setStatut('succes');
          setMessageRetour('Message envoyé avec succès. Je vous répondrai dans les plus brefs délais.');
          setNom('');
          setEmail('');
          setSujet('');
          setMessage('');
          return;
        }

        console.error('[Contact] Échec Web3Forms', {
          status: res.status,
          statusText: res.statusText,
          response: data,
        });

        setStatut('erreur');
        setMessageRetour(
          data.message
            ? `Web3Forms a refusé l’envoi : ${data.message}`
            : `Envoi direct impossible (HTTP ${res.status}).`
        );
      } catch (error) {
        console.error('[Contact] Erreur réseau pendant l’envoi', error);
        setStatut('erreur');
        setMessageRetour('Erreur réseau lors de l’envoi du message. Vérifiez la console du navigateur pour plus de détails.');
      } finally {
        setEnvoiEnCours(false);
      }

      return;
    }

    // Fallback si la clé n'est pas encore collée dans site-config.ts
    ouvrirMailto();
    setStatut('succes');
    setMessageRetour('Client de messagerie ouvert avec votre message pré-rempli.');
    setEnvoiEnCours(false);
  }

  return (
    <section
      id="contact"
      aria-labelledby="titre-contact"
      className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10"
    >
      {/* ── En-tête de section ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-14 text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Contact
        </p>
        <h2
          id="titre-contact"
          className="mt-2 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
        >
          {siteConfig.contact.titre}.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {siteConfig.contact.sousTitre}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {siteConfig.contact.description}
        </p>
      </motion.div>

      {/* ── Grille 2 colonnes : Coordonnées + Formulaire ────────── */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1.3fr] lg:gap-14">
        {/* Colonne gauche : Informations & Réseaux */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md"
        >
          <div className="space-y-6">
            {/* Badge Disponibilité Bourse / Recherche */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              <TbSparkles className="text-cyan-400" size={15} />
              <span>{siteConfig.contact.statutDisponibilite}</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              Échangeons sur vos projets académiques & techniques
            </h3>

            <p className="text-sm leading-relaxed text-slate-300/80">
              Que ce soit pour une opportunité d’admission, une bourse de recherche en
              réseaux et intelligence artificielle, ou un projet d’ingénierie, je vous réponds
              avec réactivité et rigueur.
            </p>

            {/* Liste des coordonnées */}
            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-cyan-500/30">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <TbMail size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-medium">Email professionnel</p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm font-semibold text-white transition-colors hover:text-cyan-300 truncate block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Bouton Copier */}
                <button
                  type="button"
                  onClick={copierEmail}
                  aria-label="Copier l'adresse email"
                  title="Copier l'adresse email dans le presse-papier"
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    emailCopie
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300'
                  }`}
                >
                  {emailCopie ? (
                    <>
                      <TbCheck size={13} className="text-emerald-400" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <TbCopy size={13} />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              {/* Localisation */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                  <TbMapPin size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Localisation</p>
                  <p className="text-sm font-semibold text-white">
                    {siteConfig.contact.localisation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons réseaux sociaux */}
          <div className="pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Profils & Réseaux
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.liensSociaux.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_14px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <SiGithub size={15} />
                <span>GitHub</span>
              </a>

              <a
                href={siteConfig.liensSociaux.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/10 hover:text-cyan-200 hover:shadow-[0_0_14px_rgba(10,102,194,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <FaLinkedin size={15} className="text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Colonne droite : Formulaire de message */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.08, ease: 'easeOut' }}
          className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-md shadow-xl sm:p-10"
        >
          <form onSubmit={envoyerMessage} className="space-y-5">
            {/* Nom */}
            <div>
              <label
                htmlFor="nom"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Nom complet <span className="text-cyan-400">*</span>
              </label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="ex. Kokou Dossou"
                className="w-full rounded-2xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Adresse email <span className="text-cyan-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full rounded-2xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                required
              />
            </div>

            {/* Sujet */}
            <div>
              <label
                htmlFor="sujet"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Objet du message
              </label>
              <input
                id="sujet"
                type="text"
                value={sujet}
                onChange={(e) => setSujet(e.target.value)}
                placeholder="ex. Offre de stage / Bourse d’excellence / Collaboration technique"
                className="w-full rounded-2xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Votre message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Rédigez votre message ici..."
                rows={5}
                className="w-full rounded-2xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                required
              />
            </div>

            {/* Bouton d'envoi */}
            <button
              type="submit"
              disabled={envoiEnCours}
              aria-busy={envoiEnCours}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 py-3.5 px-6 text-sm font-bold text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {envoiEnCours ? (
                <TbLoader2 size={16} aria-hidden="true" className="animate-spin" />
              ) : (
                <TbSend size={16} aria-hidden="true" />
              )}
              <span>{envoiEnCours ? 'Envoi en cours...' : 'Envoyer le message'}</span>
            </button>

            {messageRetour && (
              <p
                className={`flex items-center justify-center gap-1.5 text-center text-xs font-medium ${
                  statut === 'erreur' ? 'text-amber-400' : 'text-emerald-400'
                }`}
                role="status"
                aria-live="polite"
              >
                {statut === 'erreur' ? (
                  <TbAlertTriangle size={14} />
                ) : (
                  <TbCheck size={14} />
                )}
                <span>{messageRetour}</span>
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
