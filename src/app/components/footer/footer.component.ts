import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PORTFOLIO } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="relative border-t border-[rgba(255,255,255,0.05)] bg-surface-base">

      <!-- Top decorative line -->
      <div class="absolute top-0 inset-x-0 h-px"
           style="background: linear-gradient(90deg, transparent 0%, rgba(200,146,58,0.2) 30%, rgba(200,146,58,0.2) 70%, transparent 100%);">
      </div>

      <div class="container-wide py-10 md:py-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">

          <!-- Logo / Name -->
          <div class="flex items-center gap-3">
            <span
              class="w-[24px] h-[24px] flex items-center justify-center border border-[rgba(200,146,58,0.4)]
                     text-gold font-mono text-[9px] tracking-wider font-medium"
            >APS</span>
            <span class="font-display text-ink-secondary text-[14px]">
              {{ personal.firstName }}
              <span class="text-gold">{{ personal.lastName }}</span>
            </span>
          </div>

          <!-- Social links -->
          <div class="flex items-center gap-6">
            @for (link of social; track link.name) {
              <a
                [href]="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-[10px] tracking-widest uppercase text-ink-muted
                       hover:text-gold transition-colors duration-300"
              >{{ link.name }}</a>
            }
          </div>

          <!-- Copyright -->
          <p class="font-mono text-[10px] tracking-wider text-ink-muted text-center md:text-right">
            &copy; {{ year }} {{ personal.name }}.
            <span class="block sm:inline">All rights reserved.</span>
          </p>
        </div>

        <!-- Bottom line: designed with precision -->
        <div class="flex justify-center mt-8 pt-8 border-t border-[rgba(255,255,255,0.03)]">
          <p class="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-faint">
            Designed &amp; engineered with precision
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly personal = PORTFOLIO.personal;
  readonly social   = PORTFOLIO.social;
  readonly year     = new Date().getFullYear();
}
