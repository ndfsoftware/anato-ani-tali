import { Injectable } from '@angular/core';
import { Payment, PAYMENT_METHOD } from '../interfaces/payment.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private payments: Payment[] = [
    { id: 1, method: PAYMENT_METHOD.CASH, label: 'Efectivo' },
    { id: 2, method: PAYMENT_METHOD.TRANSFER, label: 'Transferencia' },
    // { id: 3, method: PAYMENT_METHOD.CREDIT, label: 'Tarjeta' },
  ];

  getAll(): Observable<Payment[]> {
    return of(this.payments);
  }

  getById(id: number): Observable<Payment | undefined> {
    return of(this.payments.find((payment) => payment.id === id));
  }

  getByIds(ids: number[]): Observable<Payment[]> {
    return of(this.payments.filter((payment) => ids.includes(payment.id)));
  }
}
