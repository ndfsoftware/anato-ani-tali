import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-course-price',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './course-price.html',
})
export class CoursePrice {
  price = input.required<number>();
}
