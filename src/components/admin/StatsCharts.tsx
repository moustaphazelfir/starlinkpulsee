// Graphiques légers en SVG (rendus côté serveur, aucune librairie externe).

type Point = { label: string; value: number };

const CYAN = "var(--color-accent-cyan)";
const BLUE = "var(--color-accent-blue)";

/** Courbe (aire + ligne) — idéale pour les vues quotidiennes. */
export function LineChart({ data }: { data: Point[] }) {
  const W = 700, H = 200, P = 8;
  const n = data.length;
  const max = Math.max(1, ...data.map((d) => d.value));
  const x = (i: number) => (n <= 1 ? W / 2 : P + (i / (n - 1)) * (W - 2 * P));
  const y = (v: number) => H - P - (v / max) * (H - 2 * P);

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  const area = `${line} L${x(n - 1).toFixed(1)},${H} L${x(0).toFixed(1)},${H} Z`;

  // Quelques repères d'axe X (début, milieu, fin).
  const ticks = n > 1 ? [0, Math.floor((n - 1) / 2), n - 1] : [0];

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full h-auto" role="img" aria-label="Courbe des vues quotidiennes">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,212,255,0.30)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaFill)" />
        <path d={line} fill="none" stroke={CYAN} strokeWidth={2.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        {n <= 31 &&
          data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d.value)} r={d.value > 0 ? 2.5 : 0} fill={CYAN} />
          ))}
        {ticks.map((i) => (
          <text key={i} x={x(i)} y={H + 16} fill="var(--color-text-muted)" fontSize="12" textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}>
            {data[i]?.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/** Barres verticales — idéales pour les vues mensuelles. */
export function BarChart({ data }: { data: Point[] }) {
  const W = 700, H = 200, P = 8;
  const n = data.length;
  const max = Math.max(1, ...data.map((d) => d.value));
  const slot = (W - 2 * P) / n;
  const bw = slot * 0.6;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full h-auto" role="img" aria-label="Vues mensuelles">
        {data.map((d, i) => {
          const h = (d.value / max) * (H - 2 * P);
          const bx = P + i * slot + (slot - bw) / 2;
          const by = H - P - h;
          return (
            <g key={i}>
              <rect x={bx} y={by} width={bw} height={h} rx={3} fill={BLUE} opacity={0.85} />
              {d.value > 0 && (
                <text x={bx + bw / 2} y={by - 4} fill="var(--color-text-secondary)" fontSize="11" textAnchor="middle">
                  {d.value}
                </text>
              )}
              <text x={bx + bw / 2} y={H + 16} fill="var(--color-text-muted)" fontSize="11" textAnchor="middle">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Code pays ISO ("FR") -> drapeau emoji 🇫🇷 (ou 🌍 si inconnu). */
function flag(code: string) {
  if (!/^[A-Za-z]{2}$/.test(code)) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

const COUNTRY_NAMES: Record<string, string> = {
  FR: "France", CI: "Côte d'Ivoire", SN: "Sénégal", BE: "Belgique", CH: "Suisse",
  CA: "Canada", CM: "Cameroun", BJ: "Bénin", CD: "RD Congo", ML: "Mali",
  BF: "Burkina Faso", TG: "Togo", GA: "Gabon", MA: "Maroc", DZ: "Algérie",
  TN: "Tunisie", MG: "Madagascar", NE: "Niger", US: "États-Unis", GB: "Royaume-Uni",
};

/** Barres horizontales — top pays. */
export function CountryBars({ data }: { data: { pays: string; vues: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.vues));
  return (
    <div className="space-y-2.5">
      {data.map((d) => {
        const known = d.pays !== "Inconnu";
        const name = known ? COUNTRY_NAMES[d.pays] || d.pays : "Inconnu / historique";
        return (
          <div key={d.pays} className="flex items-center gap-3">
            <span className="w-6 text-center text-lg shrink-0">{known ? flag(d.pays) : "🌐"}</span>
            <span className="w-32 shrink-0 text-sm text-[var(--color-text-secondary)] truncate">{name}</span>
            <div className="flex-grow h-2.5 rounded-full bg-[var(--color-space-700)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--color-accent-cyan)]" style={{ width: `${(d.vues / max) * 100}%` }} />
            </div>
            <span className="w-14 shrink-0 text-right text-sm font-bold text-white">{d.vues.toLocaleString("fr-FR")}</span>
          </div>
        );
      })}
    </div>
  );
}
