export default function Skills() {
  return (
    <section id="competences" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Compétences clés</p>
        <h2 className="mt-3 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
          Expertise technique et excellence académique.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-slate-800 p-6 shadow-lg shadow-black/20">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Développement Web & UI</p>
          <h3 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">Front-end & expérience utilisateur</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'SEO'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-800 p-6 shadow-lg shadow-black/20">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Réseaux & Infrastructure</p>
          <h3 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">Infrastructure sécurisée</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Cisco IOS', 'Pare-feu ASA', 'VLANs / Trunking', 'DMZ', 'Routage IP', 'Sécurité'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-500/40 bg-slate-800 p-6 shadow-lg shadow-cyan-500/10">
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Distinction
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">Parcours Académique d’Excellence</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Bourse d’Excellence et poursuite de formation spécialisée en Data Science & Machine Learning, avec un engagement constant vers l’innovation et la performance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Python', 'NumPy', 'Algèbre Linéaire ML', 'Git / GitHub', 'Linux'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
