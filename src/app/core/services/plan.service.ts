import { Injectable } from '@angular/core';
import { Plan, PLANT_TYPE } from '../interfaces/plan.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private plans: Plan[] = [
    {
      id: 1,
      title: 'Plan Básico',
      description: 'Acceso a cursos básicos y contenido exclusivo.',
      includes: [
        '1 encuentro virtual sincrónico semanal para el desarrollo de los temas del trabajo práctico/TP de la semana. Todos los encuentros son grabados y subidos al drive.',
        'Diapositivas de los encuentros.',
        'Videos teóricos cortos disponibles en drive.',
        'Grupo de WhatsApp con las docentes.',
        'Repaso de Parcial',
      ],
      price: 120000,
      type: PLANT_TYPE.BASICO,
    },
    {
      id: 2,
      title: 'Plan Plus',
      description: 'Acceso a todos los cursos, contenido exclusivo y soporte personalizado.',
      includes: [
        '2 encuentros virtuales sincrónicos semanales: uno para el desarrollo de los temas del trabajo práctico/TP de la semana y uno para el desarrollo de anatomía aplicada y estudios por imágenes. Todos los encuentros son grabados y subidos al drive.',
        'Diapositivas de los encuentros.',
        'Videos teóricos cortos disponibles en drive.',
        'Grupo de WhatsApp con las docentes.',
        'Repaso de Parcial',
      ],
      price: 150000,
      type: PLANT_TYPE.PLUS,
    },
  ];

  getAll(): Observable<Plan[]> {
    return of(this.plans);
  }

  getById(id: number): Observable<Plan | undefined> {
    return of(this.plans.find((p) => p.id === id));
  }

  getByIds(ids: number[]): Observable<Plan[]> {
    return of(this.plans.filter((p) => ids.includes(p.id)));
  }
}
