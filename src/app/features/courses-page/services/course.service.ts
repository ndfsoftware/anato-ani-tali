import { inject, Injectable } from '@angular/core';
import { Course, COURSE_TYPE, CourseDetail, STUDY_MODALITY } from '../interfaces/course.interface';
import { PlanService } from '@app/core/services/plan.service';
import { DiscountService } from '@app/core/services/discount.service';
import { PaymentService } from '@app/core/services/payment.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private planService = inject(PlanService);
  private discountService = inject(DiscountService);
  private paymentService = inject(PaymentService);

  private courses: Course[] = [
    {
      id: 1,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at accusamus ipsam, cupiditate nobis soluta obcaecati nemo, magni eligendi perspiciatis culpa laborum. Saepe ipsum aperiam nostrum placeat delectus, ea deserunt.',
      title: 'Curso Locomotor',
      slug: 'curso-locomotor',
      startDate: new Date('2026-03-02T12:00:00Z'),
      endDate: new Date('2026-04-27T12:00:00Z'),
      images: [],
      planIds: [1, 2],
      discountsIds: [1, 2, 3],
      paymentsIds: [1, 2],
      modality: STUDY_MODALITY.SINCRONICO,
      badge: {
        type: 'new',
        label: 'Nuevo',
      },
      type: COURSE_TYPE.REGULAR,
    },
    {
      id: 2,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at accusamus ipsam, cupiditate nobis soluta obcaecati nemo, magni eligendi perspiciatis culpa laborum. Saepe ipsum aperiam nostrum placeat delectus, ea deserunt.',
      title: 'Curso Esplacnologia',
      slug: 'curso-esplacnologia',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-15'),
      images: [],
      planIds: [1, 2],
      discountsIds: [6],
      paymentsIds: [1, 2],
      modality: STUDY_MODALITY.ASINCRONICO,
      badge: {
        type: 'discount',
        label: 'Descuento',
      },
      type: COURSE_TYPE.REGULAR,
    },
    {
      id: 3,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at accusamus ipsam, cupiditate nobis soluta obcaecati nemo, magni eligendi perspiciatis culpa laborum. Saepe ipsum aperiam nostrum placeat delectus, ea deserunt.',
      title: 'Curso Intensivo Locomotor Parcial',
      price: 120000,
      slug: 'curso-intensivo-locomotor-parcial',
      startDate: new Date('2026-04-27T12:00:00Z'),
      endDate: new Date('2026-07-27T12:00:00Z'),
      images: [],
      planIds: [],
      discountsIds: [5],
      paymentsIds: [1, 2],
      modality: STUDY_MODALITY.ASINCRONICO,
      type: COURSE_TYPE.INTENSIVO_PARCIAL,
    },
    {
      id: 4,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at accusamus ipsam, cupiditate nobis soluta obcaecati nemo, magni eligendi perspiciatis culpa laborum. Saepe ipsum aperiam nostrum placeat delectus, ea deserunt.',
      title: 'Curso Intensivo Final',
      price: 120000,
      slug: 'curso-intensivo-final',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-15'),
      images: [],
      planIds: [],
      discountsIds: [5],
      paymentsIds: [1, 2],
      modality: STUDY_MODALITY.ASINCRONICO,
      type: COURSE_TYPE.INTENSIVO_FINAL,
    },
    {
      id: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at accusamus ipsam, cupiditate nobis soluta obcaecati nemo, magni eligendi perspiciatis culpa laborum. Saepe ipsum aperiam nostrum placeat delectus, ea deserunt.',
      title: 'Clase de Imagenes',
      price: 120000,
      slug: 'clase-de-imagenes',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-15'),
      images: [],
      planIds: [],
      discountsIds: [],
      paymentsIds: [2],
      modality: STUDY_MODALITY.ASINCRONICO,
      type: COURSE_TYPE.CLASE,
    },
  ];

  getAll(): Observable<CourseDetail[]> {
    return of(this.courses).pipe(
      switchMap((courses) =>
        forkJoin(
          courses.map((course) =>
            forkJoin({
              payments: this.paymentService.getByIds(course.paymentsIds ?? []),
              discounts: this.discountService.getByIds(course.discountsIds ?? []),
              plans: this.planService.getByIds(course.planIds ?? []),
            }).pipe(
              map(({ payments, discounts, plans }) => ({
                ...course,
                payments,
                discounts,
                plans,
              })),
            ),
          ),
        ),
      ),
    );
  }

  getById(id: number): Observable<CourseDetail | undefined> {
    const course = this.courses.find((c) => c.id === id);

    if (!course) return of(undefined);

    return of(course).pipe(
      switchMap((course) =>
        forkJoin({
          payments: this.paymentService.getByIds(course.paymentsIds ?? []),
          discounts: this.discountService.getByIds(course.discountsIds ?? []),
          plans: this.planService.getByIds(course.planIds ?? []),
        }).pipe(
          map(({ payments, discounts, plans }) => ({
            ...course,
            payments,
            discounts,
            plans,
          })),
        ),
      ),
    );
  }

  getBySlug(slug: string): Observable<CourseDetail | undefined> {
    const course = this.courses.find((c) => c.slug === slug);

    if (!course) return of(undefined);

    return of(course).pipe(
      switchMap((course) =>
        forkJoin({
          payments: this.paymentService.getByIds(course.paymentsIds ?? []),
          discounts: this.discountService.getByIds(course.discountsIds ?? []),
          plans: this.planService.getByIds(course.planIds ?? []),
        }).pipe(
          map(({ payments, discounts, plans }) => ({
            ...course,
            payments,
            discounts,
            plans,
          })),
        ),
      ),
    );
  }
}
