import { Component } from '@angular/core';
import { CourseList } from './components/course-list/course-list';
import { SeoService } from '@app/core/services/seo.service';

@Component({
  selector: 'courses-page',
  imports: [CourseList],
  templateUrl: './courses-page.html',
})
export default class CoursesPage {
  constructor(private readonly seoService: SeoService) {
    this.seoService.setPageSeo({
      title: 'Cursos de Anatomía | Locomotor, Esplacnología e Imágenes',
      description:
        'Conocé nuestros cursos de anatomía para estudiantes de Medicina: locomotor, esplacnología, intensivos, finales y clases de imágenes. Modalidades sincrónicas y asincrónicas.',
      path: '/courses',
    });

    this.seoService.setJsonLd('courses-collection', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Cursos de Anatomía',
      url: this.seoService.getAbsoluteUrl('/courses'),
      inLanguage: 'es-AR',
    });
  }
}
