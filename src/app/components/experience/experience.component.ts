import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PORTFOLIO } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section id="experience" class="section-pad relative overflow-hidden bg-surface-raised">

      <!-- Top edge line -->
      <div class="absolute top-0 inset-x-0 h-px"
           style="background: linear-gradient(90deg, transparent 0%, rgba(200,146,58,0.15) 50%, transparent 100%);">
      </div>

      <!-- Section number watermark -->
      <div class="absolute top-16 right-8 md:right-16 pointer-events-none select-none">
        <span class="font-display text-[6rem] md:text-[9rem] font-bold text-[rgba(255,255,255,0.015)]
                     leading-none tracking-tighter">005</span>
      </div>

      <div class="container-wide">
        <!-- Section header -->
        <div appReveal class="flex items-center gap-5 mb-6">
          <span class="label-tag">Journey</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">005</span>
        </div>

        <div appReveal [delay]="100" class="mb-16">
          <h2
            class="font-display text-ink-primary leading-tight"
            style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;"
          >
            Work<br />
            <em class="text-gold">experience</em>
          </h2>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute left-0 lg:left-[220px] top-0 bottom-0 w-px
                      bg-gradient-to-b from-gold/40 via-gold/10 to-transparent hidden md:block">
          </div>

          <div class="flex flex-col gap-12 md:gap-16">
            @for (job of experience; track job.id; let i = $index) {
              <div
                appReveal
                [delay]="i * 120"
                class="group relative flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <!-- Period (left column on desktop) -->
                <div class="md:w-[220px] md:text-right flex-shrink-0 md:pr-10 relative">
                  <span class="font-mono text-[11px] tracking-widest text-gold uppercase block mb-1">
                    {{ job.period }}
                  </span>
                  <span class="font-mono text-[10px] tracking-wider text-ink-muted uppercase">
                    {{ job.location }}
                  </span>

                  <!-- Timeline dot -->
                  <span
                    class="absolute right-[-4.5px] lg:right-[-5px] top-1 hidden md:block
                           w-[9px] h-[9px] rounded-full bg-surface-raised border-2 border-gold
                           group-hover:bg-gold transition-colors duration-300"
                    style="top: 2px;"
                  ></span>
                </div>

                <!-- Content (right column on desktop) -->
                <div class="flex-1 pl-0 md:pl-10 pb-4 border-b border-[rgba(255,255,255,0.04)]">
                  <!-- Role & Company -->
                  <div class="mb-4">
                    <h3 class="font-display font-medium text-ink-primary leading-tight mb-1
                               group-hover:text-gold transition-colors duration-300"
                        style="font-size: clamp(1.1rem, 2vw, 1.35rem);">
                      {{ job.role }}
                    </h3>
                    <span class="font-body text-[13px] text-ink-secondary font-medium">
                      {{ job.company }}
                    </span>
                  </div>

                  <!-- Description -->
                  <p class="font-body text-[13px] text-ink-secondary leading-relaxed font-light mb-6">
                    {{ job.description }}
                  </p>

                  <!-- Achievement bullets -->
                  <ul class="flex flex-col gap-3">
                    @for (achievement of job.achievements; track $index) {
                      <li class="flex items-start gap-3">
                        <span class="w-[5px] h-[5px] rounded-full bg-gold mt-[7px] flex-shrink-0"></span>
                        <span class="font-body text-[13px] text-ink-secondary font-light leading-relaxed">
                          {{ achievement }}
                        </span>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experience = PORTFOLIO.experience;
}
