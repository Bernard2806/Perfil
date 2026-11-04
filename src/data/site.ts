// Contenido del perfil, tomado de LinkedIn y GitHub (noviembre de 2026).

export const perfil = {
  nombre: "Bernardo",
  inicial: "G.",
  apellido: "Erramuspe",
  /** Nombre que se muestra en todo el sitio. */
  nombreVisible: "Bernardo G. Erramuspe",
  nombreCompleto: "Bernardo Andrés González Erramuspe",
  alias: "Bernard2806",
  rol: "Desarrollador full stack",
  ubicacion: "Chivilcoy, AR",
  nacimiento: "2006-06-28",
  email: "bgonzalezerramuspe2006@hotmail.com",
  github: "https://github.com/Bernard2806",
  linkedin: "https://www.linkedin.com/in/bernardo-gonzalez-erramuspe/",
  matelogic: "https://mate-logic.tech/",
  descripcion:
    "Bernardo G. Erramuspe, desarrollador full stack de Chivilcoy, Argentina. .NET, Blazor, PHP, Java y Astro. Fundador de MateLogic y vicepresidente de CODES (UNLu).",
} as const;

/** Edad calculada al compilar el sitio. */
export function edad(hoy = new Date()): number {
  const nacimiento = new Date(`${perfil.nacimiento}T00:00:00`);
  let anios = hoy.getFullYear() - nacimiento.getFullYear();
  const cumplio =
    hoy.getMonth() > nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
  if (!cumplio) anios--;
  return anios;
}

export interface Seccion {
  id: "sobre-mi" | "experiencia" | "proyectos" | "formacion" | "contacto";
  codigo: string;
  etiqueta: string;
  titulo: string;
}

export const secciones: readonly Seccion[] = [
  { id: "sobre-mi", codigo: "01", etiqueta: "Sobre mí", titulo: "Sobre mí" },
  { id: "experiencia", codigo: "02", etiqueta: "Experiencia", titulo: "Experiencia" },
  { id: "proyectos", codigo: "03", etiqueta: "Proyectos", titulo: "Proyectos" },
  { id: "formacion", codigo: "04", etiqueta: "Formación", titulo: "Formación" },
  { id: "contacto", codigo: "05", etiqueta: "Contacto", titulo: "Contacto" },
];

export const sobreMi = {
  parrafos: [
    `Tengo ${edad()} años, soy de Chivilcoy y hago desarrollo full stack, sobre todo con .NET (C#), Blazor, PHP, Java y Astro. Me gusta entender cómo funcionan las cosas y después mejorarlas o construir mi propia versión.`,
    "Estudio Sistemas en la UNLu y Ciberseguridad en la UNTREF, soy vicepresidente de CODES y fundé MateLogic.",
  ],
  stack: [
    "C#", ".NET", "Blazor", "PHP", "Java", "Astro",
    "TypeScript", "Python", "SQL Server", "MySQL", "Azure", "Linux",
  ],
  disponibilidad: "Abierto a oportunidades remotas o híbridas",
} as const;

export interface Enlace {
  texto: string;
  url: string;
}

export interface Registro {
  periodo: string;
  titulo: string;
  lugar: string;
  texto?: string;
  tecnologias?: readonly string[];
  enlace?: Enlace;
}

export const experiencia: readonly Registro[] = [
  {
    periodo: "Jul 2026 — Actualidad",
    titulo: "Fundador y desarrollador full stack",
    lugar: "MateLogic · Chivilcoy · Híbrido",
    texto:
      "Estudio de software a medida: aplicaciones web, móviles y de escritorio, y herramientas de código abierto. Llevo cada proyecto de punta a punta, desde la primera charla con el cliente hasta el soporte, y mantengo el catálogo open source del estudio.",
    tecnologias: ["C#", ".NET", "Blazor", "PHP", "Java", "React", "Astro", "SQL Server", "Azure", "Linux"],
    enlace: { texto: "mate-logic.tech", url: "https://mate-logic.tech/" },
  },
  {
    periodo: "Mar 2026 — Actualidad",
    titulo: "Desarrollador frontend",
    lugar: "Proyecto PDTS · Municipio de Luján y UNLu",
    texto:
      "Interfaces web que reemplazan trámites manuales del personal municipal por flujos digitales, integradas con servicios internos mediante APIs REST y armadas con componentes reutilizables.",
    tecnologias: ["JavaScript", "React", "Tailwind CSS", "APIs REST"],
  },
  {
    periodo: "Actualidad",
    titulo: "Vicepresidente",
    lugar: "CODES · Centro de estudiantes de Sistemas (UNLu)",
    texto:
      "Además de la gestión del centro, desarrollo herramientas para la carrera: la plataforma de apuntes, la wiki, el sitio y el hub de enlaces de CODES.",
    enlace: { texto: "codesunlu.tech", url: "https://www.codesunlu.tech/" },
  },
  {
    periodo: "Jun 2025 — Jul 2025",
    titulo: "Técnico de instalación",
    lugar: "IPNext Telecomunicaciones · Chivilcoy",
    texto: "Instalación de cámaras IP y diagnóstico y resolución de problemas en sistemas.",
  },
  {
    periodo: "Mar 2025 — Dic 2025",
    titulo: "Maintainer del sistema de gestión (ad honorem)",
    lugar: "Bomberos Voluntarios de Chivilcoy",
    texto:
      "Después de la pasantía seguí como maintainer del sistema, que continuaron desarrollando alumnos de la E.E.S.T. N°1: revisé y aprobé los pull requests, cuidé los criterios de calidad del código y sumé funcionalidades.",
    tecnologias: ["C#", "Blazor", "SQL Server"],
  },
  {
    periodo: "Jun 2024 — Sep 2024",
    titulo: "Desarrollador web (pasantía)",
    lugar: "Bomberos Voluntarios de Chivilcoy",
    texto:
      "Reestructuración y desarrollo del sistema de gestión del cuartel: mejoras y nuevas funcionalidades para un servicio que trabaja en un entorno crítico.",
    tecnologias: ["ASP.NET", ".NET"],
  },
];

export interface Proyecto {
  nombre: string;
  texto: string;
  tecnologias: readonly string[];
  sitio?: string;
  codigo?: string;
}

export const proyectos: readonly Proyecto[] = [
  {
    nombre: "Clima Chivilcoy",
    texto:
      "Clima en vivo de Chivilcoy: condiciones actuales, pronóstico, alertas oficiales del SMN y cámara en vivo, combinando estaciones meteorológicas locales.",
    tecnologias: ["Astro"],
    sitio: "https://climachivilcoy.netlify.app/",
    codigo: "https://github.com/Bernard2806/Clima-Chivilcoy",
  },
  {
    nombre: "Sistema de Bomberos Voluntarios",
    texto:
      "Sistema de gestión del cuartel de Bomberos Voluntarios de Chivilcoy, desarrollado con alumnos de la E.E.S.T. N°1. Empecé como pasante y seguí como maintainer.",
    tecnologias: ["C#", "Blazor", "SQL Server"],
    codigo: "https://github.com/EEST1Chivilcoy/BomberosVoluntariosChivilcoy",
  },
  {
    nombre: "MtaServerQuery",
    texto:
      "Librería .NET publicada en NuGet que consulta servidores de Multi Theft Auto por UDP: jugadores, ping y score, de forma asincrónica.",
    tecnologias: ["C#", ".NET"],
    sitio: "https://www.nuget.org/packages/MtaServerQuery",
    codigo: "https://github.com/Bernard2806/MtaServerQuery",
  },
  {
    nombre: "ApunteUNLu",
    texto:
      "Plataforma para subir y compartir apuntes, parciales y finales de la Licenciatura en Sistemas de la UNLu, hecha para CODES.",
    tecnologias: ["Astro"],
    sitio: "https://apuntes.codesunlu.com.ar/",
    codigo: "https://github.com/CODES-UNLU/ApunteUNLu",
  },
  {
    nombre: "Wiki CODES",
    texto:
      "Wiki de y para estudiantes de la UNLu: recursos de la carrera, beneficios educativos para pedir y cosas interesantes de informática.",
    tecnologias: ["MDX"],
    sitio: "https://wiki.codesunlu.com.ar/",
    codigo: "https://github.com/CODES-UNLU/Wiki-CODES",
  },
  {
    nombre: "CVForge",
    texto:
      "Skill de Claude Code y opencode que genera CVs en HTML imprimibles y compatibles con ATS, en siete formatos. Parte del open source de MateLogic.",
    tecnologias: ["HTML", "Agent skills"],
    codigo: "https://github.com/Mate-Logic/CVForge",
  },
  {
    nombre: "Antigravity for Linux",
    texto:
      "Builds AppImage, mantenidas por la comunidad, del agente de escritorio e IDE Antigravity de Google. Parte del open source de MateLogic.",
    tecnologias: ["Linux", "AppImage"],
    sitio: "https://mate-logic.github.io/antigravity-for-linux-website/",
  },
  {
    nombre: "Fixtris Computer",
    texto: "Sitio de Fixtris Computer, servicio de reparación de computadoras, notebooks, consolas y hardware.",
    tecnologias: ["Astro"],
    sitio: "https://bernard2806.github.io/Fixtris-Website/",
    codigo: "https://github.com/Bernard2806/Fixtris-Website",
  },
];

export const formacion: readonly Registro[] = [
  {
    periodo: "2026 — 2031 · En curso",
    titulo: "Licenciatura en Sistemas de Información",
    lugar: "Universidad Nacional de Luján (UNLu)",
  },
  {
    periodo: "2026 · En curso",
    titulo: "Diplomatura en Ciberseguridad",
    lugar: "Universidad Nacional de Tres de Febrero (UNTREF)",
  },
  {
    periodo: "2017 — 2024",
    titulo: "Técnico en Informática Profesional y Personal",
    lugar: "E.E.S.T. N°1 \"Mariano Moreno\" · Chivilcoy",
  },
];

export const certificaciones: readonly Registro[] = [
  { periodo: "Jun 2025", titulo: "Azure", lugar: "ITSCHOOL · Educación IT" },
  { periodo: "Oct 2024", titulo: ".NET", lugar: "ITSCHOOL · Educación IT" },
];

export const contacto: readonly (Enlace & { etiqueta: string })[] = [
  { etiqueta: "Email", texto: perfil.email, url: `mailto:${perfil.email}` },
  { etiqueta: "LinkedIn", texto: "in/bernardo-gonzalez-erramuspe", url: perfil.linkedin },
  { etiqueta: "GitHub", texto: "github.com/Bernard2806", url: perfil.github },
  { etiqueta: "MateLogic", texto: "mate-logic.tech", url: perfil.matelogic },
];
