import { Routes } from '@angular/router';
import { MainLayout } from '@core/layouts/main-layout/main-layout';
import { ComingSoon } from '@core/components/coming-soon/coming-soon';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('@features/home-page/home-page'),
        // data: { bgImageClass: "bg-[url('/assets/images/home.png')]" },
      },
      {
        path: 'about',
        loadComponent: () => import('@features/about-page/about-page'),
        data: {
          bgImageClass: "md:bg-[url('/assets/images/cuerpo-entero.png')]",
        },
      },
      {
        path: 'faq',
        loadComponent: () => import('@features/faq-page/faq-page'),
        data: { bgImageClass: "md:bg-[url('/assets/images/cuerpo-entero.png')]" },
      },
      {
        path: 'contact',
        loadComponent: () => import('@features/contact-page/contact-page'),
        data: { bgImageClass: "md:bg-[url('/assets/images/cuerpo-entero.png')]" },
      },
      {
        path: 'courses/:slug',
        loadComponent: () => import('@features/courses-detail-page/courses-detail-page'),
        data: { bgImageClass: "md:bg-[url('/assets/images/columna.png')]" },
      },
      {
        path: 'courses',
        loadComponent: () => import('@features/courses-page/courses-page'),
        data: { bgImageClass: "md:bg-[url('/assets/images/brazo-derecho.png')]" },
      },
      { path: 'not-found', loadComponent: () => import('@core/components/not-found/not-found') },
      {
        path: 'admin/login',
        component: ComingSoon,
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
];
