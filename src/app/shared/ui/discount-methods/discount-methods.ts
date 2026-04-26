import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  Discount,
  DiscountPriceOption,
  DiscountViewModel,
} from '@app/core/interfaces/discount.interface';
import { Plan } from '@app/core/interfaces/plan.interface';

@Component({
  selector: 'app-discount-methods',
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './discount-methods.html',
  standalone: true,
})
export class DiscountMethods {
  discounts = input.required<Discount[]>();
  price = input<number | null>(null);
  plans = input<Plan[]>([]);

  readonly availablePrices = computed<DiscountPriceOption[]>(() => {
    const plans = this.plans();

    if (plans.length) {
      return plans.map((plan) => ({
        label: plan.title,
        originalPrice: plan.price,
        finalPrice: plan.price,
      }));
    }

    const price = this.price();
    if (price == null) return [];

    return [
      {
        label: 'Precio del curso',
        originalPrice: price,
        finalPrice: price,
      },
    ];
  });

  readonly discountCards = computed<DiscountViewModel[]>(() => {
    const availablePrices = this.availablePrices();

    return this.discounts().map((discount) => {
      return {
        id: discount.id,
        label: discount.label,
        percentage: discount.percentage,
        hasDiscount: discount.percentage > 0,
        hasPrice: availablePrices.length > 0,
        priceOptions: availablePrices.map((priceOption) => ({
          ...priceOption,
          finalPrice:
            priceOption.originalPrice - priceOption.originalPrice * (discount.percentage / 100),
        })),
      };
    });
  });
}
