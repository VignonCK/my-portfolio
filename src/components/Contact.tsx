"use client";

import { FormEvent, useState } from "react";

export default function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");

  function envoyerMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const destinataire = "contact@example.com";
    const corps = `Bonjour,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ACordialement,%0D%0A${encodeURIComponent(nom)}`;
    const mailtoUrl = `mailto:${destinataire}?subject=${encodeURIComponent(sujet)}&body=${corps}`;
    window.location.href = mailtoUrl;
  }

  return (
    <>
      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
              Entrons en relation.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Remplissez le formulaire ci-dessous ou contactez-moi directement par email pour discuter de vos besoins en développement web, infrastructure réseau ou projets Data/ML.
            </p>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-800 p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">@</span>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-base text-[var(--text-primary)]">contact@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">📍</span>
                <div>
                  <p className="text-sm text-slate-400">Localisation</p>
                  <p className="text-base text-[var(--text-primary)]">Paris, France</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-cyan-300"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/username"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-cyan-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-800 p-8 shadow-xl shadow-black/20">
            <form onSubmit={envoyerMessage} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="nom">
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(event) => setNom(event.target.value)}
                  placeholder="Votre nom"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="votre.email@example.com"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="sujet">
                  Sujet
                </label>
                <input
                  id="sujet"
                  type="text"
                  value={sujet}
                  onChange={(event) => setSujet(event.target.value)}
                  placeholder="Objet de votre message"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Votre message..."
                  rows={5}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-900 px-6 py-8 text-slate-400 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-[var(--text-primary)]">Vignon</p>
            <p className="text-sm text-slate-400">Développeur Web & Spécialiste Systèmes/Réseaux</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-cyan-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/username"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-cyan-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500">© 2026 Vignon. Tous droits réservés.</p>
      </footer>
    </>
  );
}
