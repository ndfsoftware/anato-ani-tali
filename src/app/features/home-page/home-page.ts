import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@app/core/services/seo.service';
import { HomeLinksCards } from './components/home-links-cards/home-links-cards';
@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterLink, HomeLinksCards],
  templateUrl: './home-page.html',
})
export default class HomePage {
  constructor(private readonly seoService: SeoService) {
    this.seoService.setPageSeo({
      title: 'Cursos de Anatomía para Medicina UBA | Anatomía con Ani y Tali',
      description:
        'Cursos de anatomía para estudiantes de Medicina, orientados a la Facultad de Medicina UBA. Preparación para locomotor, esplacnología, imágenes, parciales y finales.',
      path: '/',
    });

    this.seoService.setJsonLd('home-organization', {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Anatomía con Ani y Tali',
      alternateName: 'AnatoAniTali',
      url: this.seoService.getAbsoluteUrl('/'),
      sameAs: ['https://www.instagram.com/catedra4/'],
      areaServed: 'AR',
      description: 'Cursos de anatomía para estudiantes de Medicina con foco en UBA.',
    });

    this.seoService.setJsonLd('home-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Anatomía con Ani y Tali',
      url: this.seoService.getAbsoluteUrl('/'),
      inLanguage: 'es-AR',
    });
  }
}
