import { Injectable } from '@angular/core';
import { Discount, DISCOUNT_TYPE } from '../interfaces/discount.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  private discounts: Discount[] = [
    {
      id: 1,
      type: DISCOUNT_TYPE.PAYMENT,
      paymentMethodId: 1,
      percentage: 10,
      label: '1 pago en efectivo',
    },
    {
      id: 2,
      type: DISCOUNT_TYPE.PAYMENT,
      paymentMethodId: 2,
      percentage: 15,
      label: '1 pago por transferencia',
    },
    {
      id: 3,
      type: DISCOUNT_TYPE.PAYMENT,
      paymentMethodId: 3,
      percentage: 0,
      label: 'en hasta 3 pagos',
    },
    {
      id: 4,
      type: DISCOUNT_TYPE.INTENSIVO,
      paymentMethodId: 3,
      percentage: 0,
      label: 'en hasta 2 pagos',
    },
    {
      id: 5,
      type: DISCOUNT_TYPE.FACUAMIGO,
      percentage: 15,
      label: 'Traé un facuamigo y obtengan un descuento',
    },
    {
      id: 6,
      type: DISCOUNT_TYPE.GENERAL,
      percentage: 25,
      label: 'Oferta 2026',
    },
  ];

  getAll(): Observable<Discount[]> {
    return of(this.discounts);
  }

  getById(id: number): Observable<Discount | undefined> {
    return of(this.discounts.find((discount) => discount.id === id));
  }

  getByIds(ids: number[]): Observable<Discount[]> {
    return of(this.discounts.filter((discount) => ids.includes(discount.id)));
  }
}
