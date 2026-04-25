import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Discount } from '@app/core/interfaces/discount.interface';

@Component({
  selector: 'app-discount-methods',
  imports: [TitleCasePipe],
  templateUrl: './discount-methods.html',
})
export class DiscountMethods {
  discounts = input.required<Discount[]>();
  price = input.required<Number>();
}
