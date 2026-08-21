import Link from "next/link";

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path
      d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.88 3.44 22.4 8.21 23.98C8.82 24.08 9.02 23.73 9.02 23.43C9.02 23.17 9.01 22.39 9.01 21.56C5.67 22.21 4.97 19.92 4.97 19.92C4.42 18.53 3.63 18.16 3.63 18.16C2.55 17.43 3.72 17.44 3.72 17.44C4.94 17.53 5.57 18.68 5.57 18.68C6.68 20.54 8.46 20.04 9.14 19.74C9.23 18.98 9.53 18.47 9.86 18.17C7.2 17.87 4.39 16.82 4.39 11.82C4.39 10.5 4.88 9.42 5.67 8.58C5.54 8.28 5.14 7.02 5.78 5.29C5.78 5.29 6.78 5 9.01 6.66C9.95 6.4 10.97 6.26 12 6.26C13.03 6.26 14.05 6.4 14.99 6.66C17.22 5 18.22 5.29 18.22 5.29C18.86 7.02 18.46 8.28 18.33 8.58C19.12 9.42 19.61 10.5 19.61 11.82C19.61 16.83 16.8 17.86 14.13 18.16C14.56 18.55 14.94 19.34 14.94 20.5C14.94 22.18 14.92 23.45 14.92 23.43C14.92 23.73 15.12 24.09 15.73 23.98C20.5 22.4 24 17.88 24 12.5C24 5.87 18.63 0.5 12 0.5Z"
      fill="currentColor"
    />
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path
      d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.88 1 4.98 2.12 4.98 3.5ZM0.24 8H4.74V24H0.24V8ZM8.74 8H13.02V10.22H13.1C13.7 9.1 15.1 7.88 17.16 7.88C21.7 7.88 24 10.38 24 15.16V24H19.5V15.98C19.5 13.72 19.44 10.98 16.5 10.98C13.5 10.98 13.02 13.26 13.02 15.82V24H8.52V8H8.74Z"
      fill="currentColor"
    />
  </svg>
);

export default function Hero() {
  return (
    <section id="hero" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Développeur Web & Spécialiste Système/Réseaux
        </span>
        <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
          Solutions Next.js et Réseaux Cisco pour des projets Data/ML robustes.
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          J’accompagne les entreprises dans la création de sites web performants, d’infrastructures réseau sécurisées et d’outils analytiques pour des décisions data-driven.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#projets"
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Découvrir mes projets
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-800"
          >
            Me contacter
          </Link>
        </div>
        <div className="flex items-center gap-4 pt-2 text-sm text-slate-200">
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-cyan-300"
          >
            <IconGitHub />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/username"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-cyan-300"
          >
            <IconLinkedIn />
            LinkedIn
          </a>
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.85)] backdrop-blur-xl sm:p-10 lg:max-w-md">
        <div className="rounded-3xl bg-slate-900/80 p-8 text-slate-100 shadow-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Performance. Sécurité. Design.</p>
          <h2 className="mt-6 text-2xl font-semibold leading-tight">Accompagnement sur mesure</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Portfolio professionnel, infrastructure réseau sécurisée et moteur Data/ML conçu pour des workflows efficaces et évolutifs.
          </p>
        </div>
      </div>
    </section>
  );
}
