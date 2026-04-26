import { Component, input } from '@angular/core';
import { Plan } from '@app/core/interfaces/plan.interface';
import { PlanDetailCard } from './components/plan-detail-card/plan-detail-card';

@Component({
  selector: 'plan-details',
  imports: [PlanDetailCard],
  templateUrl: './plan-details.html',
  host: {
    class: 'block w-full',
  },
})
export class PlanDetails {
  plans = input.required<Plan[]>();
}
