# Perfil personal

Perfil web personal e interactivo de Bernardo Andrés González Erramuspe, de Chivilcoy, Buenos Aires. Funciona como una página estilo Linktree para reunir información sobre su persona, intereses, proyectos, redes sociales, emprendimientos y medios de contacto.

Sitio publicado: [bernard2806.is-a.dev](https://bernard2806.is-a.dev)

## Características

- Diseño responsive para dispositivos móviles y escritorio.
- Navegación interactiva mediante secciones desplegables.
- Modo claro y oscuro.
- Secciones de presentación, trayectoria, estudios, redes sociales, emprendimientos, proyectos y contacto.
- Modales con información detallada de los proyectos personales.
- Código QR y uso de la Web Share API para compartir el perfil.
- Sitemap y configuración SEO básica.
- Despliegue automático en GitHub Pages mediante GitHub Actions.

## Tecnologías

- [Astro](https://astro.build/)
- HTML, CSS y JavaScript
- [Font Awesome](https://fontawesome.com/)
- pnpm
- GitHub Pages y GitHub Actions

## Requisitos

- Node.js 24 o superior
- pnpm

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Bernard2806/Perfil.git
   cd Perfil
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

   El sitio estará disponible en `http://localhost:4321`.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo. |
| `pnpm start` | Alias para iniciar el servidor de desarrollo. |
| `pnpm build` | Genera la versión estática de producción en `dist/`. |
| `pnpm preview` | Sirve localmente la compilación de producción. |
| `pnpm astro` | Ejecuta la CLI de Astro. |

## Personalización

La información principal del perfil se encuentra en [`src/data/portfolio.json`](src/data/portfolio.json). Allí puedes actualizar:

- Datos personales y enlaces a redes sociales.
- Descripción, habilidades y tecnologías.
- Trayectoria y formación mostradas por los componentes.
- Proyectos, imágenes, tecnologías y enlaces.
- Productos y emprendimientos.

Las imágenes públicas se encuentran en [`public/images`](public/images). Para agregar variables opcionales de Google Analytics o Google Search Console, copia `.env.template` como `.env` y completa sus valores.

## Despliegue

El workflow [`deploy.yml`](.github/workflows/deploy.yml) construye y publica el sitio automáticamente en GitHub Pages cada vez que se actualiza la rama `main` o `master`. También puede ejecutarse manualmente desde la pestaña **Actions** de GitHub.

## Licencia

Este proyecto no declara actualmente una licencia de software. Consulta al autor antes de reutilizar el código, el contenido o los recursos visuales.
