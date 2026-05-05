import { Component } from '@angular/core';
import { SeoService } from '@app/core/services/seo.service';

interface Teacher {
  alias: string;
  name: string;
  role: string;
  initial: string;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.html',
})
export default class AboutPage {
  constructor(private readonly seoService: SeoService) {
    this.seoService.setPageSeo({
      title: 'Sobre Nosotras | Anatomia con Ani y Tali',
      description:
        'Conoce a Ani y Tali, docentes de anatomia que acompanan a estudiantes de Medicina UBA con cursos enfocados en comprension real y preparacion de examenes.',
      path: '/about',
    });
  }

  teachers: Teacher[] = [
    {
      alias: 'Tali',
      name: 'Talita Brietzke',
      role: 'Docente de Anatomia',
      initial: 'T',
      bgColor: 'border-primary',
      textColor: 'text-primary-content',
    },
    {
      alias: 'Ani',
      name: 'Anabella Losardo',
      role: 'Docente de Anatomia',
      initial: 'A',
      bgColor: 'border-neutral',
      textColor: 'text-neutral-content',
    },
  ];
}
