import { perfil, sobreMi } from "../data/site";

/** Datos estructurados de schema.org para la página principal. */
export function datosEstructurados(sitio: URL, foto: URL) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${sitio.href}#sitio`,
        url: sitio.href,
        name: perfil.nombreVisible,
        inLanguage: "es",
      },
      {
        "@type": "ProfilePage",
        url: sitio.href,
        name: `${perfil.nombreVisible} · ${perfil.rol}`,
        inLanguage: "es",
        isPartOf: { "@id": `${sitio.href}#sitio` },
        mainEntity: {
          "@type": "Person",
          name: perfil.nombreVisible,
          // LinkedIn usa el apellido completo: así los buscadores unen los perfiles.
          alternateName: [perfil.nombreCompleto, "Bernardo González Erramuspe", perfil.alias],
          url: sitio.href,
          image: foto.href,
          description: perfil.descripcion,
          jobTitle: perfil.rol,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chivilcoy",
            addressRegion: "Buenos Aires",
            addressCountry: "AR",
          },
          sameAs: [perfil.github, perfil.linkedin],
          worksFor: { "@type": "Organization", name: "MateLogic", url: perfil.matelogic },
          memberOf: { "@type": "Organization", name: "CODES", url: "https://www.codesunlu.tech/" },
          affiliation: [
            { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Luján" },
            { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Tres de Febrero" },
          ],
          alumniOf: { "@type": "EducationalOrganization", name: 'E.E.S.T. N°1 "Mariano Moreno"' },
          knowsAbout: sobreMi.stack,
        },
      },
    ],
  };
}
