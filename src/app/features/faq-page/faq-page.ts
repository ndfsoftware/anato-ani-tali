import { Component } from '@angular/core';
import { Faq } from '@app/core/interfaces/faq.interface';
import { SeoService } from '@app/core/services/seo.service';

@Component({
  selector: 'faq-page',
  imports: [],
  standalone: true,
  templateUrl: './faq-page.html',
})
export default class FaqPage {
  constructor(private readonly seoService: SeoService) {
    this.seoService.setPageSeo({
      title: 'Preguntas Frecuentes de Cursos de Anatomia | AnatoAniTali',
      description:
        'Respondemos las dudas mas comunes sobre nuestros cursos de anatomia para Medicina UBA: catedras, clases grabadas, modalidad y preparacion para examenes.',
      path: '/faq',
    });

    this.seoService.setJsonLd('faq-page', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  faqs: Faq[] = [
    {
      question: 'El curso es para todas las catedras?',
      answer:
        'Si. El contenido esta pensado para estudiantes de Catedra 1, 2 y 3, con aclaraciones sobre bibliografia y enfoque de cada catedra.',
    },
    {
      question: 'Si no puedo conectarme en vivo, puedo ver las clases grabadas?',
      answer:
        'Si. Todas las clases quedan grabadas para que puedas repasarlas cuando quieras y organizar tu estudio segun tus tiempos.',
    },
    {
      question: 'El contenido del curso alcanza para aprobar anatomia?',
      answer:
        'El curso esta disenado para cubrir los temas centrales de la materia y acompanarte en parciales y final. Siempre recomendamos complementarlo con bibliografia oficial.',
    },
    {
      question: 'El curso es solamente para anatomia de la UBA?',
      answer:
        'Nuestro foco principal es Medicina UBA, pero tambien ayudamos a estudiantes de otras universidades segun disponibilidad.',
    },
  ];
}
