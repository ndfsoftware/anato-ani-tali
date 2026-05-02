import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styles: [`
    :host {
      --navbar-primary: #8B1A3A;
    }

    .menu li > a.active-link {
      background-color: transparent !important;
      border-radius: 0 !important;
    }

    .active-link {
      position: relative;
      padding-bottom: 4px;
    }

    .active-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--navbar-primary);
    }
  `]
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly mobileMenuButton = viewChild<ElementRef<HTMLDivElement>>('mobileMenuButton');
  protected readonly isDropdownOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.closeDropdown());
  }

  toggleDropdown() {
    this.isDropdownOpen.update((open) => !open);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
    this.mobileMenuButton()?.nativeElement.blur();
    (this.document.activeElement as HTMLElement | null)?.blur();
  }
}
