import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CourseDetail } from '@app/features/courses-page/interfaces/course.interface';

@Component({
  selector: 'courses-detail-card',
  imports: [DatePipe],
  templateUrl: './courses-detail-card.html',
})
export class CoursesDetailCard {
  course = input.required<CourseDetail>();
}
