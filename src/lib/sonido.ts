// Efectos de sonido de la interfaz: teclas mecánicas al pasar el mouse y al
// cambiar de sección. Muestras del pack "UI Audio" de Kenney (kenney.nl), CC0.

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
}

const rutas = { a: "/sfx/tecla-a.wav", b: "/sfx/tecla-b.wav", c: "/sfx/tecla-c.wav" } as const;
type Tecla = keyof typeof rutas;
const teclas = Object.keys(rutas) as Tecla[];

const claveSilencio = "sfx-silenciado";
const volumenGeneral = 0.55;

let motor: Motor | null = null;
let muestras: Record<Tecla, AudioBuffer> | null = null;
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
  const cargar = async (tecla: Tecla) => {
    const respuesta = await fetch(rutas[tecla]);
    return [tecla, await decodificador.decodeAudioData(await respuesta.arrayBuffer())] as const;
  };
  muestras = Object.fromEntries(await Promise.all(teclas.map(cargar))) as Record<Tecla, AudioBuffer>;
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
  const { inicio = 0, volumen, tono = 1, pan = 0 } = opciones;
  const fuente = ctx.createBufferSource();
  const nivel = ctx.createGain();
  const paneo = ctx.createStereoPanner();

  fuente.buffer = buffer;
  fuente.playbackRate.value = tono;
  nivel.gain.value = volumen;
  paneo.pan.value = pan;

  fuente.connect(nivel).connect(paneo).connect(salida);
  fuente.start(ctx.currentTime + inicio);
}

const pulsaciones = 7;
const lapsoTecleo = 0.32;

const catalogo = {
  hover: (m: Motor, audio: Record<Tecla, AudioBuffer>) => golpe(m, audio.b, { volumen: 0.7 }),

  tecleo: (m: Motor, audio: Record<Tecla, AudioBuffer>) => {
    for (let i = 0; i < pulsaciones; i++) {
      golpe(m, audio[teclas[Math.floor(Math.random() * teclas.length)]!], {
        inicio: (i / pulsaciones) * lapsoTecleo + azar(0, 0.022),
        volumen: 0.75 * azar(0.65, 1),
        tono: azar(0.92, 1.1),
        pan: azar(-0.15, 0.15),
      });
    }
  },
};

export type Sonido = keyof typeof catalogo;

/** Evita que el mouse rápido o una flecha mantenida apilen sonidos. */
const separacionMinimaMs: Record<Sonido, number> = { hover: 45, tecleo: 140 };
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
  sonar("hover");
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
}
