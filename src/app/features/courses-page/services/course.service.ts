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
        'Curso sincrónico de anatomía del aparato locomotor para estudiantes de Medicina UBA. Integra teoría, práctica y resolución de imágenes con enfoque en Cátedra 1, 2 y 3.',
      title: 'Curso Locomotor',
      slug: 'curso-locomotor',
      startDate: new Date('2026-03-02T12:00:00Z'),
      endDate: new Date('2026-04-27T12:00:00Z'),
      images: ['/assets/images/home.png'],
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
        'Curso asincrónico de esplacnología para Medicina UBA, con contenido actualizado para parciales y finales. Incluye clases grabadas, guías de estudio y repaso por región anatómica.',
      title: 'Curso Esplacnología',
      slug: 'curso-esplacnologia',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-15'),
      images: ['/assets/images/cuerpo-entero.png'],
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
        'Intensivo asincrónico de locomotor para preparar parciales de anatomía con foco en puntos de alto rendimiento, preguntas frecuentes y resolución de casos.',
      title: 'Curso Intensivo Locomotor Parcial',
      price: 120000,
      slug: 'curso-intensivo-locomotor-parcial',
      startDate: new Date('2026-04-27T12:00:00Z'),
      endDate: new Date('2026-07-27T12:00:00Z'),
      images: ['/assets/images/columna.png'],
      planIds: [],
      discountsIds: [5],
      paymentsIds: [1, 2],
      modality: STUDY_MODALITY.SINCRONICO,
      type: COURSE_TYPE.INTENSIVO_PARCIAL,
    },
    {
      id: 4,
      description:
        'Curso intensivo final de anatomía para estudiantes de Medicina. Organiza contenidos clave de locomotor y esplacnología para llegar al examen final con una estrategia clara.',
      title: 'Curso Intensivo Final',
      price: 120000,
      slug: 'curso-intensivo-final',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-15'),
      images: ['/assets/images/columna-2.png'],
      planIds: [],
      discountsIds: [5],
      paymentsIds: [1, 2],
      modality: STUDY_MODALITY.ASINCRONICO,
      type: COURSE_TYPE.INTENSIVO_FINAL,
    },
    {
      id: 5,
      description:
        'Clase asincrónica de imágenes anatómicas orientada a correlación clínico-anatómica y reconocimiento de estructuras en estudios frecuentes de la carrera de Medicina.',
      title: 'Clase de Imágenes',
      price: 120000,
      slug: 'clase-de-imagenes',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-15'),
      images: ['/assets/images/brazo-derecho.png'],
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
