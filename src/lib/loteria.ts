// Shared lotería configurator data + helpers

export const BARAJAS = [
  { id: "clasica", name: "Clásica", desc: "Las 54 cartas tradicionales", emoji: "🎴" },
  { id: "infantil", name: "Infantil", desc: "Ilustraciones amigables para niños", emoji: "🧒" },
  { id: "moderna", name: "Moderna", desc: "Diseño minimalista 2025", emoji: "✨" },
  { id: "navidena", name: "Navideña", desc: "Edición especial diciembre", emoji: "🎄" },
] as const;

export const FORMATOS = [
  { id: "4x4", name: "4 × 4", desc: "16 imágenes por tabla", price: 8 },
  { id: "5x5", name: "5 × 5", desc: "25 imágenes por tabla", price: 10 },
  { id: "favoritas", name: "Favoritas", desc: "Tú eliges las cartas", price: 12 },
  { id: "dobles", name: "Dobles", desc: "2 cartas iguales por tabla", price: 11 },
  { id: "sencillas", name: "Sencillas", desc: "Sin repeticiones", price: 9 },
] as const;

export const FRAME_COLORS = [
  { id: "pink", name: "Rosa fiesta", hex: "#e91e63" },
  { id: "yellow", name: "Amarillo cempasúchil", hex: "#f4b400" },
  { id: "teal", name: "Turquesa", hex: "#16a89a" },
  { id: "red", name: "Rojo loto", hex: "#d83a2f" },
  { id: "purple", name: "Morado", hex: "#7c3aed" },
  { id: "black", name: "Negro elegante", hex: "#1a1a1a" },
] as const;

export const BG_COLORS = [
  { id: "cream", name: "Crema", hex: "#fbf3df" },
  { id: "white", name: "Blanco", hex: "#ffffff" },
  { id: "pink", name: "Rosa suave", hex: "#fde2eb" },
  { id: "mint", name: "Menta", hex: "#dff5ef" },
  { id: "sand", name: "Arena", hex: "#f4e7d1" },
  { id: "sky", name: "Cielo", hex: "#e0f0ff" },
] as const;

export type ConfigState = {
  quantity: number;
  baraja: string;
  formato: string;
  frame: string;
  background: string;
};

export const DEFAULT_CONFIG: ConfigState = {
  quantity: 20,
  baraja: "clasica",
  formato: "4x4",
  frame: "pink",
  background: "cream",
};

export function pricePerCard(formatoId: string) {
  return FORMATOS.find((f) => f.id === formatoId)?.price ?? 8;
}
