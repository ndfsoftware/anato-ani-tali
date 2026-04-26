import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Plan, PLANT_TYPE } from '@app/core/interfaces/plan.interface';

@Component({
  selector: 'plan-detail-card',
  imports: [DecimalPipe],
  templateUrl: './plan-detail-card.html',
})
export class PlanDetailCard {
  plan = input.required<Plan>();
  planType = PLANT_TYPE;
}
