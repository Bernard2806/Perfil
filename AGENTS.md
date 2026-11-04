## Reglas del proyecto

Estas reglas son obligatorias para cualquier agente que trabaje en este repositorio.

### Gestor de paquetes: siempre pnpm

- Usar **siempre `pnpm`**. **Nunca `npm`** (ni `npx`, ni `yarn`, ni `bun`), ni siquiera para un comando puntual como consultar versiones (`pnpm view`, `pnpm outdated`).
- Instalar dependencias: `pnpm add <paquete>` / `pnpm add -D <paquete>`.
- Ejecutar binarios: `pnpm astro ...` o `pnpm exec ...` (en lugar de `npx`).
- El único lockfile es `pnpm-lock.yaml`. No crear ni commitear `package-lock.json` ni `yarn.lock`.

### Stack

- Astro (última versión estable) con TypeScript en modo `strict`.
- `pnpm build` corre `astro check` antes de compilar: el build falla si hay errores de tipos.
- Mantener las dependencias al día (`pnpm outdated`) respetando los `peerDependencies`: por ejemplo, `@astrojs/check` todavía exige TypeScript `^5 || ^6`.

### Documentación actualizada: Context7

- Usar el servidor MCP de [Context7](https://context7.com/) para consultar la documentación vigente de Astro y de cualquier otra librería antes de escribir o cambiar código que dependa de su API, en lugar de depender de lo que el agente recuerda.
- Biblioteca de Astro: `/withastro/docs`. Si la versión indexada es anterior a la instalada, contrastar con https://docs.astro.build.

### Commits: Conventional Commits en español

- Formato: `tipo(ámbito): descripción` siguiendo [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- La descripción y el cuerpo van **en español**, en minúscula, en modo imperativo y sin punto final.
- Un commit por unidad lógica, en un orden en el que cada commit compile (`pnpm build`).

### Publicación

- El sitio se publica en `https://bernard2806.is-a.dev` (dominio en `public/CNAME`) con el workflow `.github/workflows/deploy.yml`, en cada push a `main`.
- No borrar `public/CNAME`, `public/robots.txt` ni `public/.well-known/discord`.

## Development

```
pnpm dev        # http://localhost:4321
pnpm check      # chequeo de tipos
pnpm build      # astro check + build en dist/
```
