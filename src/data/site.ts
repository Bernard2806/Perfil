// Datos del perfil. El contenido definitivo se carga más adelante.

export const perfil = {
  nombre: "Bernardo",
  apellido: "González",
  alias: "Bernard2806",
  rol: "Desarrollador",
  ubicacion: "Chivilcoy, AR",
  github: "https://github.com/Bernard2806",
} as const;

export interface Seccion {
  id: string;
  codigo: string;
  etiqueta: string;
  titulo: string;
  texto: string;
}

export const secciones: readonly Seccion[] = [
  {
    id: "sobre-mi",
    codigo: "01",
    etiqueta: "Sobre mí",
    titulo: "Sobre mí",
    texto: "Datos en reconstrucción. Este módulo se carga en la próxima actualización.",
  },
  {
    id: "proyectos",
    codigo: "02",
    etiqueta: "Proyectos",
    titulo: "Proyectos",
    texto: "Datos en reconstrucción. Este módulo se carga en la próxima actualización.",
  },
  {
    id: "experiencia",
    codigo: "03",
    etiqueta: "Experiencia",
    titulo: "Experiencia",
    texto: "Datos en reconstrucción. Este módulo se carga en la próxima actualización.",
  },
  {
    id: "contacto",
    codigo: "04",
    etiqueta: "Contacto",
    titulo: "Contacto",
    texto: "Canal seguro en reconstrucción. Mientras tanto, el enlace de GitHub sigue activo.",
  },
];
