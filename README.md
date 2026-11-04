<p align="center">
  <img src="./public/favicon.svg" alt="BG" width="96" height="96" />
</p>

<h1 align="center">Bernardo G. Erramuspe</h1>

<p align="center"><strong>Desarrollador full stack · Analista en ciberseguridad · Chivilcoy 🇦🇷</strong></p>

<p align="center">
  <a href="https://astro.build"><img src="https://astro.badg.es/v2/built-with-astro/tiny.svg" alt="Built with Astro" /></a>
  <a href="https://github.com/Bernard2806/Perfil/actions/workflows/deploy.yml"><img src="https://github.com/Bernard2806/Perfil/actions/workflows/deploy.yml/badge.svg" alt="Deploy" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript estricto" />
  <img src="https://img.shields.io/badge/gestor_de_paquetes-pnpm-F69220?logo=pnpm&logoColor=white" alt="pnpm" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencia-MIT-02f969" alt="Licencia MIT" /></a>
</p>

<p align="center">
  <a href="https://bernard2806.is-a.dev"><img src="./docs/captura.jpg" alt="Captura del perfil: nombre, menú, panel Sobre mí y foto con efecto glitch" width="100%" /></a>
</p>

---

## 🧭 ¿Qué es este perfil?

Es mi **perfil personal y portafolio**, publicado en **[bernard2806.is-a.dev](https://bernard2806.is-a.dev)**.
Está armado como el **menú de un videojuego cyberpunk**: un HUD con glitches, pixelado y scanlines,
pintado con la paleta de Capri (*Cyberpunk: Edgerunners 2*), pero sin dejar de ser un lugar claro
para ver quién soy, qué hice y cómo contactarme.

> 🎨 La estética está inspirada en los menús de *Cyberpunk 2077*. El diseño, los efectos y el logo son
> propios: no se usan logos, tipografías ni recursos oficiales de CD Projekt.

## 📚 ¿Qué vas a encontrar?

| Sección | Qué incluye |
| --- | --- |
| 👤 **Sobre mí** | Quién soy, con qué trabajo y mi stack. |
| 💼 **Experiencia** | MateLogic, el Proyecto PDTS, CODES, Bomberos Voluntarios y más. |
| 🚀 **Proyectos** | Clima Chivilcoy, MtaServerQuery, ApunteUNLu, Wiki CODES, CVForge y otros, con enlaces al sitio y al código. |
| 🎓 **Formación** | Sistemas en la UNLu, la Diplomatura Analista en Ciberseguridad y certificaciones. |
| 📬 **Contacto** | Email, LinkedIn, GitHub y MateLogic. |

## ✨ Efectos

| Efecto | Cómo funciona |
| --- | --- |
| 📺 **Glitch** | El nombre y la foto se rompen en ráfagas al azar: franjas desplazadas, macrobloques, chorreado de píxeles y canales rojo y verde separados. |
| 🧱 **Pixelado** | La foto entra pixelada al cargar y los paneles cambian disolviéndose en bloques. |
| 🖼️ **Foto normal** | Al pasar el mouse (o con un toque en celular) aparece la foto original, sin efectos. |
| 🟢 **Estado en vivo** | La barra superior dice *en línea*, *ocupado hasta tal hora* o *fuera de línea* según mi horario. |
| ⌨️ **Teclado** | ↑ ↓ mueven el menú desde cualquier parte, como en un juego. |
| ♿ **Accesible** | Funciona con lectores de pantalla y todo se calma con `prefers-reduced-motion`. |

## 🧩 Tecnologías

- [Astro 7](https://astro.build): el framework del sitio, con TypeScript estricto.
- Canvas 2D, CSS y custom elements: los efectos, sin librerías de animación.
- [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) y [JetBrains Mono](https://www.jetbrains.com/lp/mono/): las fuentes, servidas desde el sitio.
- [sharp](https://sharp.pixelplumbing.com): optimiza la foto al compilar.
- [pnpm](https://pnpm.io): el gestor de paquetes.

El sitio se publica automáticamente en **GitHub Pages** con cada push a `main`.

## 🗂️ Estructura del proyecto

```
.
├─ public/                   # Favicon, CNAME, robots.txt y archivos estáticos
├─ docs/captura.jpg          # Captura para este README
├─ src/
│  ├─ assets/bernardo.jpg    # Foto de perfil
│  ├─ components/            # GlitchPortrait, GlitchText, MainMenu, PanelContenido, HUD…
│  ├─ data/
│  │  ├─ site.ts             # Todo el contenido: perfil, experiencia, proyectos, formación
│  │  └─ horario.ts          # Cuándo figuro ocupado (sin materias ni lugares)
│  ├─ lib/fx.ts              # Utilidades de los efectos
│  ├─ layouts/Layout.astro   # <head>, fuentes y capas de pantalla
│  ├─ pages/index.astro      # La página
│  └─ styles/global.css      # Paleta y estilos generales
├─ astro.config.mjs          # Configuración del sitio y de las fuentes
└─ package.json
```

Para cambiar textos no hace falta tocar componentes: todo el contenido vive en `src/data/site.ts`
y el horario del estado en `src/data/horario.ts`.

## 🛠️ Desarrollo local

Requisitos: [Node.js](https://nodejs.org) 24+ y [pnpm](https://pnpm.io).

```bash
pnpm install   # Instalar dependencias
pnpm dev       # Servidor local en http://localhost:4321/
pnpm build     # Chequear tipos y generar el sitio en ./dist
pnpm preview   # Previsualizar el build
```

| Comando | Para qué sirve |
| --- | --- |
| `pnpm install` | Instala las dependencias. |
| `pnpm dev` | Levanta el servidor de desarrollo. |
| `pnpm check` | Chequea los tipos con `astro check`. |
| `pnpm build` | Chequea los tipos y compila el sitio para producción. |
| `pnpm preview` | Previsualiza el sitio compilado. |

> ⚠️ Antes de subir cambios, **siempre** corré `pnpm build` y confirmá que no haya errores.
> Los commits siguen **Conventional Commits en español** (ver [`AGENTS.md`](AGENTS.md)).

## 💬 Contacto

- 🌐 Sitio: [bernard2806.is-a.dev](https://bernard2806.is-a.dev)
- 💼 LinkedIn: [in/bernardo-gonzalez-erramuspe](https://www.linkedin.com/in/bernardo-gonzalez-erramuspe/)
- 🐙 GitHub: [@Bernard2806](https://github.com/Bernard2806)
- 🧉 MateLogic: [mate-logic.tech](https://mate-logic.tech/)

## 📄 Licencia

El código se distribuye bajo la licencia [MIT](LICENSE): podés usarlo como base para tu propio sitio.
La licencia **no** cubre mi foto ni el contenido personal (textos, experiencia y datos de contacto),
que siguen siendo míos.

---

<p align="center">Hecho con 🧉 en Chivilcoy.</p>
