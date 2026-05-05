import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'faq', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'courses', renderMode: RenderMode.Prerender },
  {
    path: 'courses/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'curso-locomotor' },
        { slug: 'curso-esplacnologia' },
        { slug: 'curso-intensivo-locomotor-parcial' },
        { slug: 'curso-intensivo-final' },
        { slug: 'clase-de-imagenes' },
      ];
    },
  },
  { path: 'not-found', renderMode: RenderMode.Prerender },
  { path: 'admin/login', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];
