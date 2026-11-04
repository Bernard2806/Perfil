// Utilidades compartidas por los efectos de glitch y pixelado.

const consultaMovimiento = "(prefers-reduced-motion: reduce)";

export function movimientoReducido(): boolean {
  return window.matchMedia(consultaMovimiento).matches;
}

export function azar(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function azarEntero(min: number, max: number): number {
  return Math.floor(azar(min, max + 1));
}

export function mezclar<T>(lista: T[]): T[] {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j]!, lista[i]!];
  }
  return lista;
}

export function esperar(ms: number): Promise<void> {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

interface OpcionesRafagas {
  /** Pausa mínima entre ráfagas, en milisegundos. */
  pausaMin: number;
  /** Pausa máxima entre ráfagas, en milisegundos. */
  pausaMax: number;
  /** Elemento que se observa: fuera de pantalla no hay ráfagas. */
  elemento: Element;
}

/**
 * Llama a `rafaga` cada cierto tiempo al azar, como el video del juego:
 * varios segundos tranquilo y de golpe un glitch corto. Se pausa cuando el
 * elemento no está a la vista o la pestaña está oculta, y no hace nada si
 * el visitante pidió movimiento reducido.
 */
export function programarRafagas(rafaga: () => void, opciones: OpcionesRafagas): void {
  if (movimientoReducido()) return;

  let visible = true;
  let temporizador: ReturnType<typeof setTimeout> | undefined;

  const siguiente = () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      if (visible && !document.hidden) rafaga();
      siguiente();
    }, azar(opciones.pausaMin, opciones.pausaMax));
  };

  new IntersectionObserver(([entrada]) => {
    visible = entrada?.isIntersecting ?? true;
  }).observe(opciones.elemento);

  siguiente();
}

const caracteres = "▓▒░█#%&@$/\\<>[]{}=+*01ABCDEFXZ";

/**
 * Efecto de "descifrado": el texto aparece letra por letra desde una lluvia
 * de caracteres al azar. El texto real queda en `aria-label` para que los
 * lectores de pantalla no lean los caracteres intermedios.
 */
export function descifrar(elemento: HTMLElement, duracion = 520): void {
  const final = elemento.dataset.final ?? elemento.textContent ?? "";
  elemento.dataset.final = final;

  if (movimientoReducido()) {
    elemento.textContent = final;
    return;
  }

  elemento.setAttribute("aria-label", final);
  const inicio = performance.now();

  const paso = (ahora: number) => {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const revelados = Math.floor(progreso * final.length);
    let texto = "";
    for (let i = 0; i < final.length; i++) {
      const letra = final[i]!;
      texto += i < revelados || letra === " " ? letra : caracteres[azarEntero(0, caracteres.length - 1)];
    }
    elemento.textContent = texto;
    if (progreso < 1) requestAnimationFrame(paso);
    else elemento.removeAttribute("aria-label");
  };

  requestAnimationFrame(paso);
}
