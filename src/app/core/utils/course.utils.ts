import { COURSE_STATUS, CourseStatus } from '@app/core/interfaces/course-status';
import {
  CourseDetail,
  StudyModality,
  STUDY_MODALITY,
} from '@app/features/courses-page/interfaces/course.interface';

export function getCourseStatus(course: CourseDetail, now = new Date()): CourseStatus {
  const start = new Date(course.startDate);
  const end = new Date(course.endDate);

  if (end < now) return COURSE_STATUS.FINALIZADO;
  if (start <= now) return COURSE_STATUS.EN_CURSO;
  return COURSE_STATUS.PROXIMAMENTE;
}

export function getCourseModality(course: CourseDetail, now = new Date()) {
  const end = new Date(course.endDate);
  return end < now ? STUDY_MODALITY.ASINCRONICO : course.modality;
}

export function getCourseStatusColor(status: CourseStatus): string {
  const colors: Record<CourseStatus, string> = {
    [COURSE_STATUS.FINALIZADO]: 'text-red-700',
    [COURSE_STATUS.EN_CURSO]: 'text-green-700',
    [COURSE_STATUS.PROXIMAMENTE]: 'text-blue-700',
  };
  return colors[status];
}

export function getCourseStatusIcon(status: CourseStatus): string | null {
  const icons: Record<CourseStatus, string> = {
    [COURSE_STATUS.FINALIZADO]: 'android_cell_4_bar',
    [COURSE_STATUS.EN_CURSO]: 'android_cell_4_bar',
    [COURSE_STATUS.PROXIMAMENTE]: 'android_cell_4_bar',
  };

  return icons[status];
}

export function getCourseStatusIconClasses(status: CourseStatus): string {
  const classes: Record<CourseStatus, string> = {
    [COURSE_STATUS.FINALIZADO]: 'material-symbols-outlined  leading-none text-red-500',
    [COURSE_STATUS.EN_CURSO]: 'material-symbols-outlined leading-none text-green-500',
    [COURSE_STATUS.PROXIMAMENTE]: 'material-symbols-outlined  leading-none text-blue-500',
  };

  return classes[status];
}

export function getCourseModalityIcon(modality: StudyModality): string | null {
  const icons: Record<StudyModality, string> = {
    [STUDY_MODALITY.SINCRONICO]: 'schedule',
    [STUDY_MODALITY.ASINCRONICO]: 'computer',
  };

  return icons[modality];
}
