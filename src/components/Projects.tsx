"use client";

import { useState } from "react";
import { PROJETS, Projet } from "@/src/data/projets";

const filtres = [
  { label: "Tous", valeur: "Tous" },
  { label: "Développement Web", valeur: "Web" },
  { label: "Réseaux & Sécurité", valeur: "Réseaux" },
  { label: "Machine Learning & Data", valeur: "Données/ML" },
];

function carteProjet(projet: Projet) {
  return (
    <article
      key={projet.identifiant}
      className="group rounded-3xl border border-white/10 bg-slate-800 p-6 transition hover:border-cyan-500"
    >
      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
        {projet.etiquetteCategorie}
      </span>
      <h3 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">
        {projet.titre}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{projet.resume}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {projet.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  const [filtreActif, setFiltreActif] = useState("Tous");

  const projetsFiltres =
    filtreActif === "Tous"
      ? PROJETS
      : PROJETS.filter((projet) => {
          if (filtreActif === "Web") {
            return projet.categorie.some((cat) => cat.includes("Web"));
          }
          if (filtreActif === "Réseaux") {
            return projet.categorie.some((cat) => cat.includes("Réseaux"));
          }
          if (filtreActif === "Données/ML") {
            return projet.categorie.some((cat) => cat.includes("Machine Learning") || cat.includes("Data"));
          }
          return false;
        });

  return (
    <section id="projets" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Projets récents</p>
          <h2 className="mt-3 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Mes réalisations en développement, réseaux et Data.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {filtres.map((filtre) => {
            const actif = filtreActif === filtre.valeur;
            return (
              <button
                key={filtre.valeur}
                type="button"
                onClick={() => setFiltreActif(filtre.valeur)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  actif
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                    : "border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-500 hover:bg-slate-700"
                }`}
              >
                {filtre.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projetsFiltres.length > 0 ? (
          projetsFiltres.map(carteProjet)
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-800 p-8 text-slate-300">
            Aucun projet ne correspond à ce filtre.
          </div>
        )}
      </div>
    </section>
  );
}
