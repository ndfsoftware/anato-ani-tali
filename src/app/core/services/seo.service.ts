import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RUNTIME_CONFIG } from '@app/core/config/runtime-config';
import { SEO_DEFAULT_KEYWORDS, SEO_SITE_NAME, SEO_TWITTER_CARD, SeoConfig } from '@app/core/config/seo.config';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly runtimeConfig = inject(RUNTIME_CONFIG);

  private readonly defaultImagePath = '/assets/images/home-3.png';

  setPageSeo(config: SeoConfig): void {
    const canonical = this.getAbsoluteUrl(config.path);
    const imageUrl = this.getAbsoluteUrl(config.image ?? this.defaultImagePath);
    const type = config.type ?? 'website';
    const keywords = (config.keywords?.length ? config.keywords : SEO_DEFAULT_KEYWORDS).join(', ');

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: config.noIndex ? 'noindex, nofollow' : 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:site_name', content: SEO_SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'es_AR' });

    this.meta.updateTag({ name: 'twitter:card', content: SEO_TWITTER_CARD });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setCanonical(canonical);
  }

  setJsonLd(key: string, schema: unknown): void {
    const scriptId = `seo-jsonld-${key}`;
    const existing = this.document.getElementById(scriptId);

    if (existing) {
      existing.textContent = JSON.stringify(schema);
      return;
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  removeJsonLd(key: string): void {
    const scriptId = `seo-jsonld-${key}`;
    const script = this.document.getElementById(scriptId);
    if (script?.parentNode) {
      script.parentNode.removeChild(script);
    }
  }

  getAbsoluteUrl(path: string): string {
    const siteUrl = (this.runtimeConfig.siteUrl || '').replace(/\/+$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${siteUrl}${cleanPath}`;
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
