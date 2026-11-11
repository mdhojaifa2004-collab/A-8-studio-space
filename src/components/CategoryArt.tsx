export type Kind = "photo" | "stage" | "podcast" | "music" | "art";

export function getKind(category: string): Kind {
  const c = category.toLowerCase();
  if (c.includes("podcast")) return "podcast";
  if (c.includes("photo")) return "photo";
  if (c.includes("sound") || c.includes("stage") || c.includes("film")) return "stage";
  if (c.includes("music") || c.includes("recording")) return "music";
  if (c.includes("art")) return "art";
  return "photo";
}

export default function CategoryArt({ category }: { category: string }) {
  const kind = getKind(category);
  const common = {
    viewBox: "0 0 400 240",
    fill: "none",
    preserveAspectRatio: "xMidYMid meet",
    className: "h-full w-full",
  };

  if (kind === "music") {
    return (
      <svg {...common}>
        <g fill="#ff263f" opacity="0.3">
          <rect x="30" y="150" width="14" height="60" rx="7" />
          <rect x="55" y="120" width="14" height="90" rx="7" />
          <rect x="80" y="165" width="14" height="45" rx="7" />
          <rect x="306" y="140" width="14" height="70" rx="7" />
          <rect x="331" y="110" width="14" height="100" rx="7" />
          <rect x="356" y="160" width="14" height="50" rx="7" />
        </g>
        <g fill="#ff263f">
          <ellipse cx="170" cy="165" rx="30" ry="22" transform="rotate(-20 170 165)" />
          <ellipse cx="260" cy="145" rx="30" ry="22" transform="rotate(-20 260 145)" />
          <rect x="193" y="55" width="10" height="105" />
          <rect x="283" y="35" width="10" height="105" />
          <polygon points="193,55 293,33 293,63 193,85" />
        </g>
      </svg>
    );
  }

  if (kind === "podcast") {
    return (
      <svg {...common}>
        <g stroke="#ff263f" strokeWidth="5" strokeLinecap="round" opacity="0.5">
          <path d="M110 95 Q95 120 110 145" />
          <path d="M85 80 Q60 120 85 160" />
          <path d="M290 95 Q305 120 290 145" />
          <path d="M315 80 Q340 120 315 160" />
        </g>
        <rect x="170" y="35" width="60" height="105" rx="30" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
        <g stroke="#ff263f" strokeWidth="2" opacity="0.6">
          <line x1="170" y1="70" x2="230" y2="70" />
          <line x1="170" y1="90" x2="230" y2="90" />
          <line x1="170" y1="110" x2="230" y2="110" />
          <line x1="200" y1="35" x2="200" y2="140" />
        </g>
        <path d="M140 105 V120 A60 60 0 0 0 260 120 V105" stroke="#ff263f" strokeWidth="5" strokeLinecap="round" />
        <line x1="200" y1="180" x2="200" y2="210" stroke="#ff263f" strokeWidth="5" />
        <line x1="165" y1="210" x2="235" y2="210" stroke="#ff263f" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "stage") {
    return (
      <svg {...common}>
        <g fill="#ff263f" opacity="0.15">
          <polygon points="60,0 100,0 170,120 90,120" />
          <polygon points="300,0 340,0 310,120 230,120" />
        </g>
        <rect x="120" y="105" width="160" height="95" rx="8" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
        <line x1="120" y1="135" x2="280" y2="135" stroke="#ff263f" strokeWidth="3" opacity="0.6" />
        <line x1="150" y1="160" x2="250" y2="160" stroke="#ff263f" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <line x1="150" y1="178" x2="220" y2="178" stroke="#ff263f" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        <g transform="rotate(-14 120 100)">
          <rect x="120" y="68" width="160" height="30" rx="6" fill="#ff263f" />
          <g fill="#1a0c0f">
            <polygon points="145,68 165,68 150,98 130,98" />
            <polygon points="185,68 205,68 190,98 170,98" />
            <polygon points="225,68 245,68 230,98 210,98" />
            <polygon points="265,68 280,68 280,98 250,98" />
          </g>
        </g>
      </svg>
    );
  }

  if (kind === "art") {
    return (
      <svg {...common}>
        <path
          d="M190 50 C110 50 60 100 60 150 C60 195 105 210 140 200 C165 193 160 170 180 168 C205 165 215 195 255 190 C305 184 335 150 335 115 C335 75 270 50 190 50 Z"
          fill="#1a0c0f"
          stroke="#ff263f"
          strokeWidth="5"
        />
        <circle cx="120" cy="115" r="14" fill="#ff263f" />
        <circle cx="165" cy="85" r="14" fill="#ff5565" />
        <circle cx="220" cy="80" r="14" fill="#ff263f" opacity="0.7" />
        <circle cx="272" cy="105" r="14" fill="#ff5565" opacity="0.8" />
        <circle cx="140" cy="165" r="10" fill="#0b0506" stroke="#ff263f" strokeWidth="3" />
        <g transform="rotate(35 300 170)">
          <rect x="290" y="95" width="12" height="90" rx="5" fill="#ff263f" />
          <rect x="288" y="82" width="16" height="16" fill="#ffffff" opacity="0.85" />
          <path d="M288 82 Q296 55 304 82 Z" fill="#ff263f" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="165" y="52" width="70" height="28" rx="8" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
      <rect x="105" y="72" width="190" height="125" rx="18" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
      <circle cx="200" cy="135" r="45" fill="#0b0506" stroke="#ff263f" strokeWidth="5" />
      <circle cx="200" cy="135" r="30" stroke="#ff263f" strokeWidth="3" opacity="0.7" />
      <circle cx="200" cy="135" r="14" fill="#ff263f" />
      <circle cx="188" cy="123" r="5" fill="#ffffff" opacity="0.8" />
      <rect x="258" y="88" width="22" height="14" rx="4" fill="#ff263f" />
    </svg>
  );
}