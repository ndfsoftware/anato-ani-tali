# Anatomía con Ani y Tali

Sitio web para cursos de anatomía orientados a estudiantes de medicina de la UBA. Construido con Angular 21 + SSR, Tailwind CSS v4 y DaisyUI.

## Stack

- **Framework:** Angular 21 (con SSR via `@angular/ssr`)
- **Package manager:** pnpm
- **Estilos:** Tailwind CSS v4 + DaisyUI
- **Email:** EmailJS
- **Tests:** Vitest

## Requisitos previos

- [pnpm](https://pnpm.io/) >= 11.1.1
- Node.js >= 20

## Instalación

```bash
pnpm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (ver `.env.example`):

```env
NG_APP_CONTACT_EMAIL=tu_email
NG_APP_EMAILJS_PUBLIC_KEY=tu_public_key
NG_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
NG_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NG_APP_SITE_URL=https://anatoanitali.com
NG_APP_OVERVIEW=https://drive.google.com/...
NG_APP_INTRODUCTION=https://drive.google.com/...
```

| Variable | Descripción |
|---|---|
| `NG_APP_CONTACT_EMAIL` | Email de destino del formulario de contacto |
| `NG_APP_EMAILJS_PUBLIC_KEY` | Public key de EmailJS |
| `NG_APP_EMAILJS_SERVICE_ID` | ID del servicio de EmailJS |
| `NG_APP_EMAILJS_TEMPLATE_ID` | ID del template de EmailJS |
| `NG_APP_SITE_URL` | URL pública del sitio (usada para SEO/meta tags) |
| `NG_APP_OVERVIEW` | URL de Drive con el resumen/overview del curso |
| `NG_APP_INTRODUCTION` | URL de Drive con el video/material de introducción |

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm start` | Dev server en `http://localhost:4200` (carga `.env`) |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm serve:ssr:anato-ani-tali` | Servidor SSR desde el build (`dist/`) |
| `pnpm watch` | Build en modo watch (desarrollo) |
| `pnpm test` | Ejecuta los tests con Vitest |

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Home |
| `/about` | Sobre nosotras |
| `/courses` | Listado de cursos |
| `/courses/:slug` | Detalle de curso |
| `/faq` | Preguntas frecuentes |
| `/contact` | Contacto |
| `/not-found` | Página 404 |

## Scaffolding

```bash
# Generar un componente
pnpm ng generate component nombre-componente

# Ver todos los esquemas disponibles
pnpm ng generate --help
```
