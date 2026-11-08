// Efectos de sonido de la interfaz, sintetizados con Web Audio: no hay archivos
// que descargar. Solo suenan como respuesta a algo que hizo el visitante; las
// ráfagas automáticas de glitch quedan mudas para no cansar.

import { azar } from "./fx";

interface Motor {
  ctx: AudioContext;
  salida: GainNode;
  ruidoBlanco: AudioBuffer;
}

interface OpcionesTono {
  forma?: OscillatorType;
  desde: number;
  hasta?: number;
  inicio?: number;
  duracion: number;
  volumen: number;
}

interface OpcionesRuido {
  filtro: BiquadFilterType;
  desde: number;
  hasta?: number;
  inicio?: number;
  duracion: number;
  volumen: number;
}

const claveSilencio = "sfx-silenciado";
const volumenGeneral = 0.35;
/** Evita que pasar el mouse rápido por el menú suene como una ametralladora. */
const separacionMinimaMs = 45;

let motor: Motor | null = null;
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

function crearMotor(): Motor {
  const ctx = new AudioContext();
  const salida = ctx.createGain();
  salida.gain.value = volumenGeneral;
  salida.connect(ctx.destination);

  const ruidoBlanco = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const muestras = ruidoBlanco.getChannelData(0);
  for (let i = 0; i < muestras.length; i++) muestras[i] = azar(-1, 1);

  return { ctx, salida, ruidoBlanco };
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

function tono({ ctx, salida }: Motor, opciones: OpcionesTono) {
  const { forma = "square", desde, hasta, inicio = 0, duracion, volumen } = opciones;
  const t = ctx.currentTime + inicio;
  const oscilador = ctx.createOscillator();
  const envolvente = ctx.createGain();

  oscilador.type = forma;
  oscilador.frequency.setValueAtTime(desde, t);
  if (hasta) oscilador.frequency.exponentialRampToValueAtTime(hasta, t + duracion);
  envolvente.gain.setValueAtTime(volumen, t);
  envolvente.gain.exponentialRampToValueAtTime(0.0001, t + duracion);

  oscilador.connect(envolvente).connect(salida);
  oscilador.start(t);
  oscilador.stop(t + duracion);
}

function ruido({ ctx, salida, ruidoBlanco }: Motor, opciones: OpcionesRuido) {
  const { filtro, desde, hasta, inicio = 0, duracion, volumen } = opciones;
  const t = ctx.currentTime + inicio;
  const fuente = ctx.createBufferSource();
  const filtrado = ctx.createBiquadFilter();
  const envolvente = ctx.createGain();

  fuente.buffer = ruidoBlanco;
  fuente.loop = true;
  filtrado.type = filtro;
  filtrado.frequency.setValueAtTime(desde, t);
  if (hasta) filtrado.frequency.exponentialRampToValueAtTime(hasta, t + duracion);
  envolvente.gain.setValueAtTime(volumen, t);
  envolvente.gain.exponentialRampToValueAtTime(0.0001, t + duracion);

  fuente.connect(filtrado).connect(envolvente).connect(salida);
  fuente.start(t, azar(0, 0.9));
  fuente.stop(t + duracion);
}

/** Notas cortas al azar, como una señal digital que se corta. */
function tartamudeo(m: Motor, notas: number, ventana: number, volumen: number) {
  for (let i = 0; i < notas; i++) {
    tono(m, {
      desde: azar(140, 3200),
      inicio: (i / notas) * ventana + azar(0, 0.01),
      duracion: azar(0.015, 0.04),
      volumen: azar(0.4, 1) * volumen,
    });
  }
}

const catalogo = {
  hover: (m: Motor) => tono(m, { desde: 1900, hasta: 1450, duracion: 0.03, volumen: 0.1 }),

  // El barrido de ruido acompaña la disolución del panel: 180 ms tapa y 260 ms destapa.
  seleccion: (m: Motor) => {
    tono(m, { desde: 520, hasta: 780, duracion: 0.05, volumen: 0.2 });
    tono(m, { desde: 1040, inicio: 0.055, duracion: 0.07, volumen: 0.16 });
    ruido(m, { filtro: "bandpass", desde: 900, hasta: 5200, duracion: 0.18, volumen: 0.22 });
    ruido(m, { filtro: "bandpass", desde: 5200, hasta: 1200, inicio: 0.18, duracion: 0.26, volumen: 0.12 });
  },

  confirmar: (m: Motor) => {
    tono(m, { desde: 880, hasta: 1320, duracion: 0.07, volumen: 0.16 });
    tono(m, { desde: 1760, inicio: 0.05, duracion: 0.06, volumen: 0.1 });
  },

  glitch: (m: Motor) => {
    tartamudeo(m, 9, 0.3, 0.16);
    ruido(m, { filtro: "highpass", desde: 2600, duracion: 0.34, volumen: 0.12 });
  },

  glitchCorto: (m: Motor) => tartamudeo(m, 4, 0.1, 0.1),

  encender: (m: Motor) => {
    tono(m, { desde: 330, duracion: 0.06, volumen: 0.16 });
    tono(m, { desde: 660, inicio: 0.06, duracion: 0.06, volumen: 0.16 });
    tono(m, { desde: 990, inicio: 0.12, duracion: 0.1, volumen: 0.16 });
  },
};

export type Sonido = keyof typeof catalogo;

const ultimaVez = new Map<Sonido, number>();

/** Antes del primer gesto del visitante no hay audio, así que no suena nada. */
export function sonar(sonido: Sonido): void {
  if (silenciado || !motor) return;
  if (motor.ctx.state !== "running") void motor.ctx.resume();

  const ahora = performance.now();
  if (ahora - (ultimaVez.get(sonido) ?? -Infinity) < separacionMinimaMs) return;
  ultimaVez.set(sonido, ahora);

  catalogo[sonido](motor);
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
    if (evento.target instanceof Element && evento.target.closest("a")) sonar("confirmar");
  });
}
