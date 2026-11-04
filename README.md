<div align="center">

<img src="public/favicon.svg" width="72" height="72" alt="Logo BG" />

# Bernardo G. Erramuspe

**Desarrollador full stack · Analista en ciberseguridad**<br>
Chivilcoy, Buenos Aires, Argentina 🇦🇷

[![Sitio](https://img.shields.io/badge/bernard2806.is--a.dev-fc0147?style=for-the-badge&logo=astro&logoColor=white)](https://bernard2806.is-a.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-02f969?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyBmaWxsPSIjMDcwNjBhIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNDQ3IDIwLjQ1MmgtMy41NTR2LTUuNTY5YzAtMS4zMjgtLjAyNy0zLjAzNy0xLjg1Mi0zLjAzNy0xLjg1MyAwLTIuMTM2IDEuNDQ1LTIuMTM2IDIuOTM5djUuNjY3SDkuMzUxVjloMy40MTR2MS41NjFoLjA0NmMuNDc3LS45IDEuNjM3LTEuODUgMy4zNy0xLjg1IDMuNjAxIDAgNC4yNjcgMi4zNyA0LjI2NyA1LjQ1NXY2LjI4NnpNNS4zMzcgNy40MzNjLTEuMTQ0IDAtMi4wNjMtLjkyNi0yLjA2My0yLjA2NSAwLTEuMTM4LjkyLTIuMDYzIDIuMDYzLTIuMDYzIDEuMTQgMCAyLjA2NC45MjUgMi4wNjQgMi4wNjMgMCAxLjEzOS0uOTI1IDIuMDY1LTIuMDY0IDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=&logoColor=07060a&labelColor=02f969&color=02f969)](https://www.linkedin.com/in/bernardo-gonzalez-erramuspe/)
[![GitHub](https://img.shields.io/badge/@Bernard2806-07060a?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Bernard2806)

<br>

<a href="https://bernard2806.is-a.dev"><img src="docs/captura.jpg" alt="Captura del perfil: nombre, menú, panel Sobre mí y foto con efecto glitch" width="100%" /></a>

</div>

<br>

Mi perfil personal, armado como el **menú de un videojuego cyberpunk**: un HUD con la paleta de Capri (*Cyberpunk: Edgerunners 2*), glitches, pixelado y scanlines, pero sin dejar de funcionar como portafolio.

## ✨ Qué tiene

- **Glitch hecho por código.** El nombre y la foto se "rompen" en ráfagas al azar, como el video de cyberpunk.net: franjas desplazadas, macrobloques corridos, chorreado vertical de píxeles y canales rojo y verde separados.
- **Foto normal al pasar el mouse.** La foto se rompe y aparece la original, nítida y sin efectos, para que sirva como foto de portafolio. En celular, con un toque.
- **Menú navegable con el teclado.** ↑ ↓ desde cualquier parte de la página. Los paneles se cambian disolviéndose en bloques de píxeles y el título se "descifra".
- **Estado en vivo.** La barra superior muestra *en línea*, *ocupado hasta tal hora* o *fuera de línea* según mi horario semanal, en hora de Argentina.
- **Rol que se reescribe** como en una terminal: *desarrollador full stack* ⇄ *analista en ciberseguridad*.
- **Pensado para celular y accesible.** De 320 px a pantallas anchas, menú con semántica de pestañas para lectores de pantalla, y todos los efectos se calman con `prefers-reduced-motion`.

## 🛠️ Stack

| | |
|---|---|
| **Framework** | [Astro 7](https://astro.build) con TypeScript estricto y `astro check` en el build |
| **Efectos** | Canvas 2D, CSS y custom elements, sin librerías de animación |
| **Fuentes** | Chakra Petch y JetBrains Mono, servidas desde el sitio con la API de fuentes de Astro |
| **Imágenes** | `astro:assets` + sharp (la foto pasa de 1,7 MB a un webp de 30 kB) |
| **Despliegue** | GitHub Pages con GitHub Actions |
| **Paquetes** | pnpm |

## 🚀 Desarrollo

Necesitás **Node.js 24** o superior y **pnpm**.

```bash
git clone https://github.com/Bernard2806/Perfil.git
cd Perfil
pnpm install
pnpm dev        # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Levanta el servidor de desarrollo. |
| `pnpm check` | Chequea los tipos con `astro check`. |
| `pnpm build` | Chequea los tipos y genera el sitio estático en `dist/`. |
| `pnpm preview` | Sirve localmente la versión compilada. |

## 🗂️ Estructura

```text
src/
├── data/
│   ├── site.ts           # perfil, experiencia, proyectos, formación y contacto
│   └── horario.ts        # cuándo figuro ocupado (sin materias ni lugares)
├── components/
│   ├── GlitchPortrait    # foto en duotono con glitch y versión normal
│   ├── GlitchText        # texto que se rompe en franjas
│   ├── MainMenu          # menú estilo juego con transición de píxeles
│   ├── PanelContenido    # contenido de cada sección del menú
│   ├── RolRotativo       # rol que se reescribe como en una terminal
│   └── HudHeader/Footer  # barras del HUD: estado, reloj y atajos
├── lib/fx.ts             # utilidades de efectos (ráfagas, descifrado)
└── assets/bernardo.jpg   # foto de perfil
```

## ✏️ Editar el contenido

- **Textos, experiencia, proyectos y contacto:** `src/data/site.ts`.
- **Horario del estado en línea:** `src/data/horario.ts`, que se actualiza a mano cada cuatrimestre.
- **Foto:** reemplazá `src/assets/bernardo.jpg`. Astro la optimiza al compilar.
- **Analytics y Search Console (opcional):** copiá `.env.template` como `.env` y completá los valores.

## 📦 Despliegue

Cada push a `main` dispara [`deploy.yml`](.github/workflows/deploy.yml), que compila el sitio y lo publica en GitHub Pages bajo **[bernard2806.is-a.dev](https://bernard2806.is-a.dev)**.

## 🎨 Créditos

La estética está inspirada en los menús de *Cyberpunk 2077* y en los colores de Capri, de *Cyberpunk: Edgerunners 2*. El diseño, los efectos y el logo son propios: no se usan logos, tipografías ni recursos oficiales de CD Projekt.

## 📄 Licencia

Este proyecto no declara una licencia de software. Consultame antes de reutilizar el código, el contenido o los recursos visuales.
