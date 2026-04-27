import { Component, computed, inject, signal } from '@angular/core';
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

  openContactModal(): void {
    this.isContactModalOpen.set(true);
  }

  closeContactModal(): void {
    this.isContactModalOpen.set(false);
  }
}
