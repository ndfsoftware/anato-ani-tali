import { Component, computed, inject, input } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Badge } from '@app/shared/ui/badge/badge';
import { COURSE_TYPE, CourseDetail } from '../../interfaces/course.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  getCourseModality,
  getCourseModalityIcon,
  getCourseStatus,
  getCourseStatusIcon,
  getCourseStatusIconClasses,
} from '@app/core/utils/course.utils';
import { COURSE_STATUS } from '@app/core/interfaces/course-status';
@Component({
  selector: 'course-card',
  standalone: true,
  imports: [Badge, TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './course-card.html',
})
export class CourseCard {
  activateRoute = inject(ActivatedRoute);
  course = input.required<CourseDetail>();
  readonly courseType = COURSE_TYPE;
  readonly courseStatus = COURSE_STATUS;

  readonly status = computed(() => getCourseStatus(this.course()));
  readonly modality = computed(() => getCourseModality(this.course()));
  readonly modalityIcon = computed(() => getCourseModalityIcon(this.modality()));
  readonly statusIcon = computed(() => getCourseStatusIcon(this.status()));
  readonly statusIconClasses = computed(() => getCourseStatusIconClasses(this.status()));
}
