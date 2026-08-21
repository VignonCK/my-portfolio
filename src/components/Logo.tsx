interface LogoProps {
  /** Taille du badge en pixels (largeur = hauteur). Par défaut : 40. */
  size?: number;
  /** Couleur du triangle supérieur gauche. Par défaut : Bleu Nuit (#0F172A). */
  colorPrimary?: string;
  /** Couleur du triangle inférieur droit. Par défaut : Cyan (#0284C7). */
  colorAccent?: string;
  /** Couleur du texte "<KV/>" en réserve. Par défaut : blanc cassé (#F8FAFC). */
  colorText?: string;
  /** Classe CSS optionnelle, pour positionner le composant dans la navbar. */
  className?: string;
}

/**
 * Logo du portfolio : badge carré coupé en diagonale (bicolore),
 * avec les initiales encadrées de chevrons de code "<KV/>" en réserve blanche.
 * SVG pur, donc net à toute taille (navbar, favicon, footer...).
 */
export default function Logo({
  size = 40,
  colorPrimary = "#0F172A",
  colorAccent = "#0284C7",
  colorText = "#F8FAFC",
  className,
}: LogoProps) {
  const clipId = "logo-badge-clip";
  // Coin arrondi proportionnel à la taille pour garder le même rendu à toute échelle
  const radius = size * 0.2;
  // Taille de police proportionnelle, calibrée pour "<KV/>" à size=40 → 11px
  const fontSize = size * 0.275;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Logo KV"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={size} height={size} rx={radius} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <polygon
          points={`0,0 ${size},0 0,${size}`}
          fill={colorPrimary}
        />
        <polygon
          points={`${size},0 ${size},${size} 0,${size}`}
          fill={colorAccent}
        />
      </g>
      <text
        x={size / 2}
        y={size / 2}
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={500}
        fill={colorText}
      >
        {"<KV/>"}
      </text>
    </svg>
  );
}
