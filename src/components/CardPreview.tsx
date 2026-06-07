import { FRAME_COLORS, BG_COLORS, type ConfigState } from "@/lib/loteria";

type Props = {
  config: ConfigState;
  cells?: number;
};

const ICONS = ["☀️", "🌙", "❤️", "🐓", "🌹", "🧜‍♀️", "⭐", "🌵", "🦂", "🍉", "🐸", "🎻", "👑", "🍷", "🌶️", "🐦", "🎩", "🥁", "🌻", "🎺", "🐟", "🍒", "🦋", "🌴", "🥭"];

export function CardPreview({ config, cells }: Props) {
  const frame = FRAME_COLORS.find((f) => f.id === config.frame)?.hex ?? "#e91e63";
  const bg = BG_COLORS.find((b) => b.id === config.background)?.hex ?? "#fbf3df";
  const cols = config.formato === "5x5" ? 5 : 4;
  const total = cells ?? cols * cols;

  return (
    <div
      className="rounded-2xl p-2 shadow-fiesta aspect-[4/5] w-full"
      style={{ backgroundColor: frame }}
    >
      <div
        className="rounded-xl h-full w-full p-2 grid gap-1"
        style={{
          backgroundColor: bg,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-md grid place-items-center text-[clamp(10px,3vw,18px)] bg-white/60"
            style={{ border: `1px solid ${frame}33` }}
          >
            <span aria-hidden>{ICONS[i % ICONS.length]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
