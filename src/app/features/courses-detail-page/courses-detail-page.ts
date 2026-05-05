import { Component, computed, effect, inject, signal } from '@angular/core';
import { CourseService } from '../courses-page/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaymentMethods } from '@app/shared/ui/payment-methods/payment-methods';
import { PlanDetails } from '@app/shared/ui/plan-details/plan-details';
import { CoursesDetailCard } from './courses-detail-card/courses-detail-card';
import {
  getCourseStatus,
  getCourseModality,
  getCourseModalityIcon,
  getCourseStatusIcon,
  getCourseStatusIconClasses,
  getCourseStatusColor,
} from '@app/core/utils/course.utils';
import { Badge } from '@app/shared/ui/badge/badge';
import { TitleCasePipe } from '@angular/common';
import { COURSE_STATUS } from '@app/core/interfaces/course-status';
import { DiscountMethods } from '@app/shared/ui/discount-methods/discount-methods';
import { COURSE_TYPE } from '../courses-page/interfaces/course.interface';
import { CoursePrice } from '@app/shared/ui/course-price/course-price';
import { ContactForm } from '@app/shared/ui/contact-form/contact-form';
import { SeoService } from '@app/core/services/seo.service';

@Component({
  selector: 'courses-detail-page',
  imports: [
    PaymentMethods,
    PlanDetails,
    CoursesDetailCard,
    Badge,
    TitleCasePipe,
    DiscountMethods,
    CoursePrice,
    ContactForm,
  ],
  templateUrl: './courses-detail-page.html',
})
export default class CoursesDetailPage {
  activateRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  seoService = inject(SeoService);

  slug = this.activateRoute.snapshot.params['slug'];
  course = toSignal(this.courseService.getBySlug(this.slug));

  readonly status = computed(() => getCourseStatus(this.course()!));
  readonly modality = computed(() => getCourseModality(this.course()!));
  readonly statusColor = computed(() => getCourseStatusColor(this.status()));
  readonly statusIcon = computed(() => getCourseStatusIcon(this.status()));
  readonly statusIconClasses = computed(() => getCourseStatusIconClasses(this.status()));
  readonly modalityIcon = computed(() => getCourseModalityIcon(this.modality()));
  readonly courseStatus = COURSE_STATUS;
  readonly courseType = COURSE_TYPE;
  readonly isContactModalOpen = signal(false);
  readonly contactSubject = computed(() => this.course()?.title ?? 'Consulta general');

  constructor() {
    effect(() => {
      const course = this.course();
      if (!course) {
        this.seoService.setPageSeo({
          title: 'Curso no encontrado | Anatomía con Ani y Tali',
          description: 'El curso solicitado no está disponible.',
          path: `/courses/${this.slug}`,
          noIndex: true,
        });
        return;
      }

      const description = `${course.description} Modalidad ${course.modality.toLowerCase()} para estudiantes de Medicina UBA.`;
      const routePath = `/courses/${course.slug}`;
      const image = course.images?.[0] ?? '/assets/images/columna-2.png';

      this.seoService.setPageSeo({
        title: `${course.title} | Curso de Anatomía para Medicina UBA`,
        description,
        path: routePath,
        type: 'article',
        image,
      });

      this.seoService.setJsonLd(`course-${course.slug}`, {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Anatomía con Ani y Tali',
          url: this.seoService.getAbsoluteUrl('/'),
        },
        image: [this.seoService.getAbsoluteUrl(image)],
        inLanguage: 'es-AR',
        educationalLevel: 'Universitario',
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: 'Estudiantes de Medicina UBA',
        },
        about: ['Anatomía', 'Facultad de Medicina', 'UBA', 'Locomotor', 'Esplacnología'],
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: course.modality,
          startDate: course.startDate.toISOString(),
          endDate: course.endDate.toISOString(),
        },
      });

      this.seoService.setJsonLd(`breadcrumb-${course.slug}`, {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: this.seoService.getAbsoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cursos',
            item: this.seoService.getAbsoluteUrl('/courses'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: course.title,
            item: this.seoService.getAbsoluteUrl(routePath),
          },
        ],
      });
    });
  }

  openContactModal(): void {
    this.isContactModalOpen.set(true);
  }

  closeContactModal(): void {
    this.isContactModalOpen.set(false);
  }
}
