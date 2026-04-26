import { Component, computed, input } from '@angular/core';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BadgeType = 'primary' | 'secondary' | 'accent' | 'warning' | 'success' | 'error' | 'info';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
})
export class Badge {
  title = input.required<string>();
  size = input.required<BadgeSize>();
  type = input.required<BadgeType>();
  classes = input<string>('');
  icon = input<string | null>(null);
  iconClasses = input<string>('material-symbols-outlined text-[0.45rem] leading-none');

  badgeClasses = computed(() => {
    const customClasses = this.classes().trim();
    const baseClasses = `badge badge-${this.size()} badge-${this.type()} inline-flex items-center gap-1.5`;
    return customClasses ? `${baseClasses} ${customClasses}` : baseClasses;
  });
}
