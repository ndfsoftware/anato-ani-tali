import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  getCourseStatus,
  getCourseModality,
  getCourseStatusColor,
} from '@app/core/utils/course.utils';
import { CourseDetail } from '@app/features/courses-page/interfaces/course.interface';
import { Badge } from '@app/shared/ui/badge/badge';

@Component({
  selector: 'courses-detail-card',
  imports: [Badge, TitleCasePipe, DatePipe],
  templateUrl: './courses-detail-card.html',
})
export class CoursesDetailCard {
  course = input.required<CourseDetail>();
  // private readonly now = new Date();

  // readonly status = computed(() => getCourseStatus(this.course()));
  // readonly modality = computed(() => getCourseModality(this.course()));
  // readonly statusColor = computed(() => getCourseStatusColor(this.status()));
}
