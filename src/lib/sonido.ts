// Efectos de sonido de la interfaz, con muestras reales y licencia CC0:
// teclas de "UI Audio" (Kenney, kenney.nl) y, de Freesound, barra espaciadora
// (Krokulator, 654414), estática (dotY21, 395804), relé (bassmosphere, 384698)
// y beep (phatcorns, 250104). Las ráfagas automáticas de glitch no suenan.

import { azar } from "./fx";

interface Motor {
  ctx: AudioContext;
  salida: GainNode;
}

interface OpcionesGolpe {
  inicio?: number;
  volumen: number;
  tono?: number;
  pan?: number;
  /** Con `duracion`, suena solo ese tramo de la muestra. */
  desde?: number;
  duracion?: number;
}

const rutas = {
  teclaA: "/sfx/tecla-a.wav",
  teclaB: "/sfx/tecla-b.wav",
  teclaC: "/sfx/tecla-c.wav",
  barra: "/sfx/barra.wav",
  estatica: "/sfx/estatica.mp3",
  rele: "/sfx/rele.wav",
  beep: "/sfx/beep.wav",
} as const;

type Muestra = keyof typeof rutas;
type Audio = Record<Muestra, AudioBuffer>;

const claveSilencio = "sfx-silenciado";
const volumenGeneral = 0.55;

let motor: Motor | null = null;
let muestras: Audio | null = null;
let silenciado = leerSilencio();

function leerSilencio(): boolean {
  try {
    return localStorage.getItem(claveSilencio) === "1";
  } catch {
    return false;
  }
}

function guardarSilencio() {
  try {
    localStorage.setItem(claveSilencio, silenciado ? "1" : "0");
  } catch {
    // Sin almacenamiento, la preferencia dura hasta recargar.
  }
}

/** Se decodifican antes del primer gesto para que el primer sonido no se pierda. */
async function cargarMuestras() {
  const decodificador = new OfflineAudioContext(1, 1, 44100);
  const cargar = async (muestra: Muestra) => {
    const respuesta = await fetch(rutas[muestra]);
    return [muestra, await decodificador.decodeAudioData(await respuesta.arrayBuffer())] as const;
  };
  muestras = Object.fromEntries(await Promise.all((Object.keys(rutas) as Muestra[]).map(cargar))) as Audio;
}

// Si no cargan, el sitio funciona igual, sin sonido.
cargarMuestras().catch(() => {});

function crearMotor(): Motor {
  const ctx = new AudioContext();
  const salida = ctx.createGain();
  salida.gain.value = volumenGeneral;
  salida.connect(ctx.destination);
  return { ctx, salida };
}

/** Los navegadores solo dejan iniciar el audio durante un gesto del visitante. */
function activar() {
  if (silenciado) return;
  motor ??= crearMotor();
  if (motor.ctx.state !== "running") void motor.ctx.resume();
}

function alGesto(evento: Event) {
  if (evento instanceof KeyboardEvent && evento.key === "Escape") return;
  activar();
}

for (const gesto of ["mousedown", "touchend", "keydown"]) {
  document.addEventListener(gesto, alGesto, { capture: true, passive: true });
}

function golpe({ ctx, salida }: Motor, buffer: AudioBuffer, opciones: OpcionesGolpe) {
  const { inicio = 0, volumen, tono = 1, pan = 0, desde = 0, duracion } = opciones;
  const t = ctx.currentTime + inicio;
  const fuente = ctx.createBufferSource();
  const nivel = ctx.createGain();
  const paneo = ctx.createStereoPanner();

  fuente.buffer = buffer;
  fuente.playbackRate.value = tono;
  paneo.pan.value = pan;
  nivel.gain.value = volumen;

  if (duracion) {
    const caida = Math.min(0.012, duracion / 3);
    nivel.gain.setValueAtTime(0, t);
    nivel.gain.linearRampToValueAtTime(volumen, t + 0.002);
    nivel.gain.setValueAtTime(volumen, t + duracion - caida);
    nivel.gain.linearRampToValueAtTime(0, t + duracion);
  }

  fuente.connect(nivel).connect(paneo).connect(salida);
  if (duracion) fuente.start(t, desde, duracion + 0.01);
  else fuente.start(t, desde);
}

function tecleo(m: Motor, audio: Audio, pulsaciones: number, lapso: number) {
  const teclas = [audio.teclaA, audio.teclaB, audio.teclaC];
  for (let i = 0; i < pulsaciones; i++) {
    golpe(m, teclas[Math.floor(Math.random() * teclas.length)]!, {
      inicio: (i / pulsaciones) * lapso + azar(0, 0.022),
      volumen: 0.75 * azar(0.65, 1),
      tono: azar(0.92, 1.1),
      pan: azar(-0.15, 0.15),
    });
  }
}

/** Tramos cortísimos de estática, como una señal que se corta. */
function estaticaCortada(m: Motor, audio: Audio, cortes: number, ventana: number, volumen: number) {
  const maximoDesde = audio.estatica.duration - 0.06;
  for (let i = 0; i < cortes; i++) {
    golpe(m, audio.estatica, {
      inicio: (i / cortes) * ventana + azar(0, 0.012),
      desde: azar(0, maximoDesde),
      duracion: azar(0.02, 0.055),
      volumen: volumen * azar(0.6, 1),
      pan: azar(-0.5, 0.5),
    });
  }
}

const catalogo = {
  hover: (m: Motor, audio: Audio) => golpe(m, audio.teclaB, { volumen: 0.7 }),
  tecleo: (m: Motor, audio: Audio) => tecleo(m, audio, 7, 0.32),
  enlace: (m: Motor, audio: Audio) => golpe(m, audio.barra, { volumen: 0.8 }),
  estatica: (m: Motor, audio: Audio) => estaticaCortada(m, audio, 9, 0.32, 0.84),
  estaticaCorta: (m: Motor, audio: Audio) => estaticaCortada(m, audio, 3, 0.07, 0.72),
  encender: (m: Motor, audio: Audio) => {
    golpe(m, audio.rele, { volumen: 0.75 });
    golpe(m, audio.beep, { inicio: 0.14, volumen: 0.7 });
  },
};

export type Sonido = keyof typeof catalogo;

/** Evita que el mouse rápido o una flecha mantenida apilen sonidos. */
const separacionMinimaMs: Record<Sonido, number> = {
  hover: 45,
  tecleo: 140,
  enlace: 45,
  estatica: 120,
  estaticaCorta: 80,
  encender: 45,
};
const ultimaVez = new Map<Sonido, number>();

/** Antes del primer gesto del visitante no hay audio, así que no suena nada. */
export function sonar(sonido: Sonido): void {
  if (silenciado || !motor || !muestras) return;
  if (motor.ctx.state !== "running") void motor.ctx.resume();

  const ahora = performance.now();
  if (ahora - (ultimaVez.get(sonido) ?? -Infinity) < separacionMinimaMs[sonido]) return;
  ultimaVez.set(sonido, ahora);

  catalogo[sonido](motor, muestras);
}

export function sonidoActivo(): boolean {
  return !silenciado;
}

/** Prende o apaga los efectos y devuelve si quedaron activos. */
export function alternarSonido(): boolean {
  silenciado = !silenciado;
  guardarSilencio();
  activar();
  sonar("encender");
  return !silenciado;
}

const interactivos = "a, .sfx";

/** Enlaces y botón de sonido: suenan por delegación, en cualquier página. */
export function escucharEnlaces(): void {
  document.addEventListener("pointerover", (evento) => {
    if (evento.pointerType === "touch" || !(evento.target instanceof Element)) return;
    const destino = evento.target.closest(interactivos);
    const previo = evento.relatedTarget instanceof Element ? evento.relatedTarget.closest(interactivos) : null;
    if (destino && destino !== previo) sonar("hover");
  });

  document.addEventListener("click", (evento) => {
    if (evento.target instanceof Element && evento.target.closest("a")) sonar("enlace");
  });
}
