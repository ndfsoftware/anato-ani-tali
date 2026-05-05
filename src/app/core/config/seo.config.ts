export const SEO_DEFAULT_KEYWORDS = [
  'anatomía',
  'cursos de anatomía',
  'medicina UBA',
  'facultad de medicina',
  'cátedra 1 anatomía',
  'cátedra 2 anatomía',
  'cátedra 3 anatomía',
  'locomotor',
  'esplacnología',
  'imágenes anatomía',
  'intensivo locomotor',
  'intensivo final anatomía',
];

export const SEO_SITE_NAME = 'Anatomía con Ani y Tali';
export const SEO_TWITTER_CARD = 'summary_large_image';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}
