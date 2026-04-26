import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Payment, PaymentMethod } from '@app/core/interfaces/payment.interface';

@Component({
  selector: 'app-payment-methods',
  imports: [TitleCasePipe],
  templateUrl: './payment-methods.html',
  standalone: true,
  host: {
    class: 'block w-full',
  },
})
export class PaymentMethods {
  payments = input.required<Payment[]>();

  readonly iconClass: Record<PaymentMethod, string> = {
    credit: 'credit_card',
    cash: 'attach_money',
    transfer: 'account_balance_wallet',
  };
}
