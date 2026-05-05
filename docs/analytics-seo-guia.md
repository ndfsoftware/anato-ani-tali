# Guía de Google Analytics y SEO para tu App de Cursos (Angular)

## 1. Google Analytics 4 (Comportamiento de Usuarios)

### Qué mide
- Usuarios activos, sesiones, tasa de rebote
- Páginas más visitadas
- Eventos personalizados (clicks, videos, completación de lecciones)
- Conversiones y embudos
- Demografía y dispositivos

### Cómo configurarlo

#### Paso 1: Crear propiedad GA4
1. Ir a [Google Analytics](https://analytics.google.com)
2. Crear cuenta → Nueva propiedad → GA4
3. Copiar tu **Measurement ID** (ej: `G-XXXXXXXXXX`)

#### Paso 2: Instalar en Angular

```bash
npm i @analogjs/analytics
```

O manualmente con `gtag` en tu `index.html`.

**Opción A: angular-google-tag-manager (más simple)**

```bash
npm i angular-google-tag-manager
```

En tu `app.module.ts`:

```ts
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

@NgModule({
  imports: [
    GoogleTagManagerModule.forRoot('GTM-XXXXXXX')
  ]
})
```

**Opción B: Manual en index.html**

Agregar antes del `</head>` en `src/index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Paso 3: Rastrear eventos importantes

**En componentes Angular:**

```ts
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

// Función helper
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
}
```

**Uso en componentes:**

```ts
import { Component, OnInit } from '@angular/core';
import { trackEvent } from './analytics.utils';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {

  ngOnInit() {
    // Página vista
    trackEvent('page_view', {
      page_title: 'Nombre del Curso',
      page_location: window.location.pathname
    });
  }

  startCourse(courseId: string, courseName: string) {
    trackEvent('start_course', {
      course_id: courseId,
      course_name: courseName
    });
  }

  completeLesson(courseId: string, lessonId: string) {
    trackEvent('complete_lesson', {
      course_id: courseId,
      lesson_id: lessonId
    });
  }

  enrollCourse(courseId: string, courseName: string) {
    trackEvent('enroll_course', {
      course_id: courseId,
      course_name: courseName
    });
  }
}
```

#### Eventos recomendados para app de cursos

| Evento | Cuándo | Parámetros útiles |
|--------|--------|-------------------|
| `page_view` | Cada página | `page_title`, `page_location` |
| `start_course` | Inicia un curso | `course_id`, `course_name` |
| `complete_lesson` | Termina lección | `course_id`, `lesson_id` |
| `enroll_course` | Se inscribe | `course_id`, `course_name` |
| `search_course` | Busca un curso | `search_term` |
| `click_video` | Reproduce video | `course_id`, `lesson_id` |
| `course_progress` | Progreso actualizado | `course_id`, `progress_percent` |

### Dónde verlo
- [analytics.google.com](https://analytics.google.com) → Reportes
- **Reports → Engagement**: qué contenido funciona mejor
- **Reports → Acquisition**: de dónde vienen los usuarios
- **Reports → Realtime**: usuarios en este momento

---

## 2. Google Search Console (SEO y Búsquedas)

### Qué mide
- Posiciones en Google para keywords
- CTR (click-through rate) por búsqueda
- Errores de indexing
- Sitemap status

### Cómo configurarlo

#### Paso 1: Verificar propiedad
1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar dominio o prefijo de URL
3. Verificar con:
   - Registro DNS (mejor opción)
   - Subir archivo HTML a tu hosting
   - Tag en tu app

#### Paso 2: Crear sitemap.xml

Crear `src/sitemap.xml` en tu proyecto:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tu-dominio.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tu-dominio.com/cursos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

Agregar referencia en `src/index.html`:

```html
<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
```

### Dónde verlo
- Search Console → Rendimiento → Consultas (keywords)
- Search Console → Páginas (qué páginas indexan)
- Search Console → Métricas de Enrichment (si usas schema markup)

---

## 3. SEO On-Page Básico

### Meta tags en index.html

En `src/index.html`, dentro del `<head>`:

```html
<title>Anato Ani Tali - Cursos de Anatomía</title>
<meta name="description" content="Aprende anatomía con cursos interactivos de alta calidad">

<!-- Open Graph -->
<meta property="og:title" content="Anato Ani Tali - Cursos de Anatomía">
<meta property="og:description" content="Aprende anatomía con cursos interactivos">
<meta property="og:image" content="/assets/og-image.jpg">
<meta property="og:url" content="https://tu-dominio.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Anato Ani Tali">
<meta name="twitter:description" content="Aprende anatomía con cursos interactivos">
<meta name="twitter:image" content="/assets/og-image.jpg">
```

### Meta tags por componente

En cada componente, podés actualizar el título dinámicamente:

```ts
import { Title } from '@angular/platform-browser';

constructor(private titleService: Title) {}

ngOnInit() {
  this.titleService.setTitle('Nombre del Curso - Anato Ani Tali');
}
```

### Structured Data (Schema Markup) para cursos

Agregar en el `<head>` de cada página de curso:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Anatomía del Cráneo",
  "description": "Curso completo de anatomía del cráneo humano",
  "provider": {
    "@type": "Organization",
    "name": "Anato Ani Tali"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

### Robots.txt

Crear `src/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://tu-dominio.com/sitemap.xml
```

Configurar Angular para que lo sirva desde `assets` en `angular.json`:

```json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/robots.txt",
              "src/sitemap.xml"
            ]
          }
        }
      }
    }
  }
}
```

---

## 4. Próximos Pasos Inmediatos

1. **Hoy**: Crear cuenta GA4 y agregar Measurement ID a la app
2. **Esta semana**: Configurar eventos personalizados para cursos
3. **Esta semana**: Verificar sitio en Search Console
4. **Este mes**: Implementar structured data para cursos
5. **Este mes**: Analizar datos y iterar

---

## Dónde Aprender Más

- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Angular SEO guide](https://angular.io/guide/prerendering#search-engine-optimization)
- [Schema.org Course](https://schema.org/Course)