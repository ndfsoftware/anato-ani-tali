import { Component, inject } from '@angular/core';
import { RUNTIME_CONFIG } from '@app/core/config/runtime-config';
import { HomeResourceCard } from '../../interfaces/homeResourceCard.interface';

@Component({
  selector: 'app-home-links-cards',
  standalone: true,
  templateUrl: './home-links-cards.html',
})
export class HomeLinksCards {
  private readonly runtimeConfig = inject(RUNTIME_CONFIG);

  readonly cards: HomeResourceCard[] = [
    {
      title: 'Introduccion',
      description: 'Accede al material inicial para organizar tu cursada desde el primer dia.',
      image: '/assets/images/home-3.png',
      href: this.runtimeConfig.introduction,
    },
    {
      title: 'Generalidades',
      description: 'Consulta el contenido general de anatomia para repasar conceptos clave.',
      image: '/assets/images/home-3.png',
      href: this.runtimeConfig.overview,
    },
  ];
}
