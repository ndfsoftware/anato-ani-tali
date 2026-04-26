import { Routes } from '@angular/router';
import { MainLayout } from '@core/layouts/main-layout/main-layout';
import { ComingSoon } from '@core/components/coming-soon/coming-soon';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', loadComponent: () => import('@features/home-page/home-page') },
      { path: 'about', loadComponent: () => import('@features/about-page/about-page') },
      { path: 'faq', loadComponent: () => import('@features/faq-page/faq-page') },
      { path: 'contact', loadComponent: () => import('@features/contact-page/contact-page') },
      {
        path: 'courses/:slug',
        loadComponent: () => import('@features/courses-detail-page/courses-detail-page'),
      },
      { path: 'courses', loadComponent: () => import('@features/courses-page/courses-page') },
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
