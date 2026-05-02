import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { COURSE_STATUS } from '@app/core/interfaces/course-status';
import { getCourseStatus } from '@app/core/utils/course.utils';
import { CourseDetail } from '@app/features/courses-page/interfaces/course.interface';

@Component({
  selector: 'courses-detail-card',
  imports: [DatePipe],
  templateUrl: './courses-detail-card.html',
})
export class CoursesDetailCard {
  readonly status = computed(() => getCourseStatus(this.course()));
  readonly courseStatus = COURSE_STATUS;
  course = input.required<CourseDetail>();
}
