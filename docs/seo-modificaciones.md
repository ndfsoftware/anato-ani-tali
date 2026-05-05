# Documento de cambios SEO/SSR - AnatoAniTali

Fecha: 2026-05-05

## Objetivo general
Se implementó una mejora integral de SEO técnico y de contenido para Angular 21 con SSR/SSG, manteniendo la estructura actual del proyecto y evitando cambios visuales innecesarios.

## 1) Análisis inicial del proyecto
Antes de cambiar código, se revisó:
- Configuración Angular/SSR en `angular.json`, `src/main.server.ts`, `src/server.ts`.
- Definición de rutas en `src/app/app.routes.ts` y rutas de servidor en `src/app/app.routes.server.ts`.
- Fuentes de datos de cursos en `src/app/features/courses-page/services/course.service.ts`.
- Componentes de páginas: Home, Courses, Course Detail, Contact, FAQ, About.
- Ubicación de assets en `public/assets/images`.
- Configuración de Tailwind/DaisyUI en `src/styles.css`.
- Estado actual de metadata SEO en `src/index.html`.

### Hallazgos clave
- Ya existía SSR con prerender para varias rutas estáticas.
- `courses/:slug` no estaba prerenderizado.
- Había metadata base en `index.html`, pero estática y con placeholders de dominio.
- No existía servicio reusable para SEO dinámico.
- No existían `robots.txt`, `sitemap.xml` ni manifest web en `public/`.
- Había textos placeholder tipo lorem ipsum en Home y cursos.
- Había jerarquía de headings mejorable (múltiples `h1` en contextos no principales).

## 2) Servicio SEO reusable (Title/Meta/canonical/OG/Twitter/JSON-LD)

### Archivos creados
- `src/app/core/config/seo.config.ts`
- `src/app/core/services/seo.service.ts`

### Qué se hizo
Se creó un servicio central para:
- Definir `title` y `meta description` por página.
- Definir `keywords` por página (con set por defecto).
- Controlar `robots` (`index, follow` o `noindex, nofollow`).
- Crear/actualizar URL canonical única por ruta.
- Publicar Open Graph:
  - `og:title`
  - `og:description`
  - `og:type`
  - `og:url`
  - `og:image`
  - `og:site_name`
  - `og:locale=es_AR`
- Publicar Twitter Cards:
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
- Insertar y actualizar JSON-LD (`application/ld+json`) por clave.

### Por qué
- Evita duplicación y errores de metadata entre páginas.
- Permite SEO dinámico real compatible con SSR/SSG.
- Facilita mantener consistencia de canonical/OG/Twitter.
- Deja preparada la app para ampliar schema markup sin lógica repetida.

## 3) Soporte de dominio/canonical por entorno

### Archivos modificados
- `src/app/core/config/runtime-config.ts`
- `.env.example`

### Qué se hizo
- Se agregó `siteUrl` a runtime config.
- Se agregó `NG_APP_SITE_URL` en `.env.example`.
- El servicio SEO usa `siteUrl` para generar URLs absolutas (canonical/og:url/og:image).

### Por qué
- SEO correcto requiere URLs absolutas y de dominio real.
- Permite mover entre entornos sin hardcodear dominios en el código.

## 4) Metadata por página y contenido estructurado

### Páginas modificadas
- Home: `src/app/features/home-page/home-page.ts`
- Courses: `src/app/features/courses-page/courses-page.ts`
- Course Detail: `src/app/features/courses-detail-page/courses-detail-page.ts`
- Contact: `src/app/features/contact-page/contact-page.ts`
- FAQ: `src/app/features/faq-page/faq-page.ts`
- About: `src/app/features/about-page/about-page.ts`

### Qué se hizo por página
- Se configuró title y description específicos por ruta.
- Se agregó canonical único por página.
- Se agregó OG/Twitter con datos consistentes.

### JSON-LD agregado
- Home:
  - `EducationalOrganization`
  - `WebSite`
- Courses:
  - `CollectionPage`
- Course detail:
  - `Course`
  - `BreadcrumbList`
- FAQ:
  - `FAQPage` basado en preguntas visibles del componente.

### Por qué
- Mejora comprensión semántica por buscadores.
- Mejora rich results y compartición social.
- Reduce ambigüedad entre páginas (cada una con intención propia).

## 5) SSR/SSG: prerender de cursos dinámicos

### Archivo modificado
- `src/app/app.routes.server.ts`

### Qué se hizo
Se agregó prerender para `courses/:slug` usando `getPrerenderParams()` con los slugs actuales:
- `curso-locomotor`
- `curso-esplacnologia`
- `curso-intensivo-locomotor-parcial`
- `curso-intensivo-final`
- `clase-de-imagenes`

### Por qué
- Permite que metadata y contenido de cada curso existan ya renderizados al build.
- Mejora rastreo e indexación frente a CSR puro.
- Reduce dependencia de ejecución cliente para SEO de páginas de detalle.

## 6) Mejora de contenidos SEO (sin cambiar diseño)

### Archivos modificados
- `src/app/features/courses-page/services/course.service.ts`
- `src/app/features/home-page/home-page.html`
- `src/app/features/courses-page/courses-page.html`

### Qué se hizo
- Se reemplazó lorem ipsum por descripciones reales y orientadas a intención de búsqueda.
- Se diferenciaron modalidades sincrónica/asincrónica en textos.
- Se mantuvieron los nombres de cursos solicitados, corrigiendo acentos en títulos visibles.
- Se agregaron imágenes por curso en data para usar como base SEO social (`og:image` por curso).

### Por qué
- El contenido real y útil es base de SEO moderno.
- Mejora relevancia para búsquedas de Medicina UBA/anatomía.
- Prepara el modelo de datos para escalado de información futura.

## 7) Accesibilidad ligada a SEO

### Archivos modificados
- `src/app/features/courses-page/components/course-card/course-card.html`
- `src/app/features/about-page/about-page.html`

### Qué se hizo
- Ajuste de jerarquía de headings para evitar múltiples `h1` internos no principales.
- Reemplazo de texto de enlace genérico por CTA contextual:
  - de “Más información” a “Ver detalles de {curso}”.

### Por qué
- Una jerarquía clara de encabezados mejora comprensión de página para buscadores y lectores asistivos.
- Enlaces con contexto mejoran accesibilidad y señales semánticas.

## 8) Archivos técnicos SEO

### Archivos creados
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`

### Qué se hizo
- `robots.txt`: permite rastreo y declara sitemap.
- `sitemap.xml`: incluye rutas principales y slugs de cursos actuales.
- `site.webmanifest`: metadata web app básica (`name`, `short_name`, `lang`, `theme_color`, icono).

### Por qué
- Son elementos técnicos estándar para indexación y discoverability.
- Facilitan lectura de estructura por crawlers.

## 9) Revisión de `index.html`

### Archivo modificado
- `src/index.html`

### Qué se hizo
- `lang="es-AR"`.
- Título base coherente con marca y público.
- Description y keywords base mejoradas.
- `theme-color` agregado.
- Canonical base inicial.
- OG/Twitter base corregidos con dominio real de referencia.
- Referencia a `site.webmanifest`.
- Se mantuvo `viewport` correcto.

### Por qué
- Define baseline SEO correcto antes de hidratación/render dinámico.
- Mejora consistencia entre SSR inicial y navegación posterior.

## 10) Cambios en páginas específicas (resumen rápido)
- Home: metadata + JSON-LD de organización y sitio + texto real.
- Courses: metadata + JSON-LD collection + intro SEO sin alterar layout.
- Course detail: metadata dinámica por slug + Course schema + Breadcrumb schema.
- Contact: metadata específica de intención de contacto.
- FAQ: metadata + FAQPage schema en base a preguntas visibles.
- About: metadata específica y corrección de encabezados/texto.

## 11) Verificación técnica
Se ejecutó build de producción y compiló correctamente.
- Resultado: build OK.
- Resultado SSR/SSG: prerender de 11 rutas estáticas.

## 12) Alcance y límites respetados
- No se reestructuró el proyecto.
- No se modificaron rutas funcionales existentes (solo se amplió prerender en server routes).
- No se removieron componentes.
- No se agregaron dependencias nuevas.
- Cambios visuales mínimos y solo donde impactaban semántica/contenido SEO.

## 13) Recomendaciones posteriores
1. Definir dominio final real en `NG_APP_SITE_URL` (producción).
2. Validar JSON-LD en Google Rich Results Test.
3. Registrar sitemap en Google Search Console y Bing Webmaster Tools.
4. Al agregar cursos nuevos, actualizar:
   - array de cursos en `course.service.ts`
   - `getPrerenderParams()` en `app.routes.server.ts`
   - `public/sitemap.xml`

## 14) Lista exacta de archivos tocados por esta mejora
- `.env.example`
- `src/index.html`
- `src/app/app.routes.server.ts`
- `src/app/core/config/runtime-config.ts`
- `src/app/core/config/seo.config.ts` (nuevo)
- `src/app/core/services/seo.service.ts` (nuevo)
- `src/app/features/home-page/home-page.ts`
- `src/app/features/home-page/home-page.html`
- `src/app/features/courses-page/courses-page.ts`
- `src/app/features/courses-page/courses-page.html`
- `src/app/features/courses-page/services/course.service.ts`
- `src/app/features/courses-page/components/course-card/course-card.html`
- `src/app/features/courses-detail-page/courses-detail-page.ts`
- `src/app/features/contact-page/contact-page.ts`
- `src/app/features/faq-page/faq-page.ts`
- `src/app/features/about-page/about-page.ts`
- `src/app/features/about-page/about-page.html`
- `public/robots.txt` (nuevo)
- `public/sitemap.xml` (nuevo)
- `public/site.webmanifest` (nuevo)
