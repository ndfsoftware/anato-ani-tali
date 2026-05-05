import { Component } from '@angular/core';
import { SeoService } from '@app/core/services/seo.service';
import { ContactForm } from '@app/shared/ui/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm],
  templateUrl: './contact-page.html',
})
export default class ContactPage {
  constructor(private readonly seoService: SeoService) {
    this.seoService.setPageSeo({
      title: 'Contacto | Anatomía con Ani y Tali',
      description:
        'Contactanos para consultas sobre cursos de anatomía sincrónicos y asincrónicos para estudiantes de Medicina UBA.',
      path: '/contact',
    });
  }
}
