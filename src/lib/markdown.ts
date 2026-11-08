// Versión en Markdown del perfil, para agentes y LLMs. Se arma con los mismos
// datos que la página, así no hay dos copias del contenido que mantener.
import {
  certificaciones,
  contacto,
  experiencia,
  formacion,
  perfil,
  proyectos,
  sobreMi,
  type Registro,
} from "../data/site";

const sitio = "https://bernard2806.is-a.dev";

function registro(r: Registro): string {
  const lineas = [`### ${r.titulo}`, "", `${r.lugar} · ${r.periodo}`];
  if (r.texto) lineas.push("", r.texto);
  if (r.tecnologias?.length) lineas.push("", `Tecnologías: ${r.tecnologias.join(", ")}`);
  if (r.enlace) lineas.push("", `[${r.enlace.texto}](${r.enlace.url})`);
  return lineas.join("\n");
}

export function seccionSobreMi(): string {
  return [
    "## Sobre mí",
    "",
    ...sobreMi.parrafos.flatMap((p) => [p, ""]),
    `Stack: ${sobreMi.stack.join(", ")}`,
    "",
    sobreMi.disponibilidad,
  ].join("\n");
}

export function seccionExperiencia(): string {
  return ["## Experiencia", "", experiencia.map(registro).join("\n\n")].join("\n");
}

export function seccionProyectos(): string {
  const items = proyectos.map((p) => {
    const lineas = [`### ${p.nombre}`, "", p.texto, "", `Tecnologías: ${p.tecnologias.join(", ")}`];
    const enlaces = [p.sitio && `[Sitio](${p.sitio})`, p.codigo && `[Código](${p.codigo})`].filter(Boolean);
    if (enlaces.length) lineas.push("", enlaces.join(" · "));
    return lineas.join("\n");
  });
  return ["## Proyectos", "", items.join("\n\n")].join("\n");
}

export function seccionFormacion(): string {
  return [
    "## Formación",
    "",
    formacion.map(registro).join("\n\n"),
    "",
    "### Certificaciones",
    "",
    ...certificaciones.map((c) => `- ${c.titulo} · ${c.lugar} · ${c.periodo}`),
  ].join("\n");
}

export function seccionContacto(): string {
  return ["## Contacto", "", ...contacto.map((c) => `- ${c.etiqueta}: [${c.texto}](${c.url})`)].join("\n");
}

/** El perfil completo, tal como se sirve en /index.md. */
export function perfilMarkdown(): string {
  return [
    `# ${perfil.nombreVisible}`,
    "",
    `> ${perfil.descripcion}`,
    "",
    `- Nombre completo: ${perfil.nombreCompleto}`,
    `- Alias: ${perfil.alias}`,
    `- Roles: ${perfil.roles.join(", ")}`,
    `- Ubicación: ${perfil.ubicacion}`,
    `- Sitio: ${sitio}`,
    "",
    seccionSobreMi(),
    "",
    seccionExperiencia(),
    "",
    seccionProyectos(),
    "",
    seccionFormacion(),
    "",
    seccionContacto(),
    "",
  ].join("\n");
}

/** Índice para LLMs según https://llmstxt.org, servido en /llms.txt. */
export function llmsTxt(): string {
  return [
    `# ${perfil.nombreVisible}`,
    "",
    `> ${perfil.descripcion}`,
    "",
    "Sitio personal de una sola página. El contenido completo está en Markdown en el enlace de abajo.",
    "",
    "## Perfil",
    "",
    `- [Perfil completo en Markdown](${sitio}/index.md): sobre mí, experiencia, proyectos, formación y contacto`,
    "",
    "## Enlaces",
    "",
    ...contacto.map((c) => `- [${c.etiqueta}](${c.url})`),
    "",
    "## Proyectos",
    "",
    ...proyectos.map((p) => `- [${p.nombre}](${p.sitio ?? p.codigo}): ${p.texto}`),
    "",
  ].join("\n");
}
