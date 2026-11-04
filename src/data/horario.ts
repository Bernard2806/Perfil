// Horario semanal (2.º cuatrimestre 2026), tomado de HorarioUniversidadBernardo.
// Solo guarda cuándo estoy ocupado. No dice qué hago ni dónde, porque este
// sitio es público.

export interface Bloque {
  /** 1 = lunes … 7 = domingo. */
  dia: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  desde: string;
  hasta: string;
}

export type Estado = "libre" | "ocupado" | "fuera";

export interface EstadoActual {
  estado: Estado;
  /** Hora en que termina lo que estoy haciendo, solo si estoy ocupado. */
  hasta?: string;
}

/** Zona horaria en la que está escrito el horario. */
export const zonaHoraria = "America/Argentina/Buenos_Aires";

/** Todos los días, en este rango figuro fuera de línea. */
export const descanso = { desde: "00:00", hasta: "08:00" };

export const etiquetas: Record<Estado, string> = {
  libre: "En línea",
  ocupado: "Ocupado",
  fuera: "Fuera de línea",
};

export const horario: readonly Bloque[] = [
  { dia: 1, desde: "09:00", hasta: "12:00" },
  { dia: 1, desde: "19:00", hasta: "21:00" },
  { dia: 2, desde: "12:00", hasta: "17:00" },
  { dia: 3, desde: "16:00", hasta: "21:00" },
  { dia: 4, desde: "09:00", hasta: "13:00" },
  { dia: 4, desde: "18:00", hasta: "21:00" },
  { dia: 5, desde: "09:00", hasta: "12:00" },
  { dia: 5, desde: "19:00", hasta: "21:00" },
  { dia: 6, desde: "12:00", hasta: "14:00" },
];

const minutos = (hora: string) => {
  const [h, m] = hora.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

const diasSemana: Record<string, Bloque["dia"]> = {
  Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7,
};

const dentro = (actual: number, rango: { desde: string; hasta: string }) =>
  actual >= minutos(rango.desde) && actual < minutos(rango.hasta);

/** Estado en este momento, calculado con la hora de Argentina. */
export function estadoActual(ahora = new Date()): EstadoActual {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: zonaHoraria,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(ahora);
  const valor = (tipo: Intl.DateTimeFormatPartTypes) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dia = diasSemana[valor("weekday")];
  const actual = Number(valor("hour")) * 60 + Number(valor("minute"));

  if (dentro(actual, descanso)) return { estado: "fuera" };
  const bloque = horario.find((b) => b.dia === dia && dentro(actual, b));
  return bloque ? { estado: "ocupado", hasta: bloque.hasta } : { estado: "libre" };
}
