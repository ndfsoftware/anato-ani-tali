import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { Footer } from '@app/core/components/footer/footer';
import { Navbar } from '@app/core/components/navbar/navbar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  private readonly router = inject(Router);

  private readonly activeRouteData = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route = this.router.routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route?.snapshot?.data;
      }),
    ),
    { initialValue: {} as Record<string, unknown> },
  );

  readonly pageBackgroundClass = computed(() => {
    const data = this.activeRouteData();
    return typeof data['bgImageClass'] === 'string' ? data['bgImageClass'] : '';
  });
}
