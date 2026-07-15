import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PORTFOLIO } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-achievements',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section id="achievements" class="section-pad relative overflow-hidden">

      <!-- Ambient background fill -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,146,58,0.03) 0%, transparent 70%);"
      ></div>

      <!-- Top edge line -->
      <div class="absolute top-0 inset-x-0 h-px"
           style="background: linear-gradient(90deg, transparent 0%, rgba(200,146,58,0.15) 50%, transparent 100%);">
      </div>

      <!-- Section number watermark -->
      <div class="absolute top-16 right-8 md:right-16 pointer-events-none select-none">
        <span class="font-display text-[6rem] md:text-[9rem] font-bold text-[rgba(255,255,255,0.012)]
                     leading-none tracking-tighter">006</span>
      </div>

      <div class="container-wide">
        <!-- Section header -->
        <div appReveal class="flex items-center gap-5 mb-6">
          <span class="label-tag">By the Numbers</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">006</span>
        </div>

        <div appReveal [delay]="100" class="mb-16">
          <h2
            class="font-display text-ink-primary leading-tight"
            style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;"
          >
            Milestones &amp;<br />
            <em class="text-gold">achievements</em>
          </h2>
        </div>

        <!-- Metrics grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.04)]">
          @for (item of achievements; track item.id; let i = $index) {
            <div
              appReveal
              [delay]="i * 100"
              class="group relative bg-surface-base p-8 md:p-12 overflow-hidden
                     hover:bg-[rgba(200,146,58,0.025)] transition-colors duration-500"
            >
              <!-- Hover top accent -->
              <span class="absolute top-0 left-0 right-0 h-[1px] bg-gold scale-x-0
                           group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

              <!-- Value -->
              <div
                class="font-display text-gold leading-none mb-4 transition-all duration-300"
                style="font-size: clamp(2.8rem, 6vw, 4.5rem); font-weight: 600;"
              >
                {{ item.value }}
              </div>

              <!-- Label -->
              <h3 class="font-body font-semibold text-ink-primary text-[14px] mb-2 tracking-wide">
                {{ item.label }}
              </h3>

              <!-- Description -->
              <p class="font-body text-[12px] text-ink-muted font-light leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          }
        </div>

        <!-- Certifications / extra context row -->
        <div appReveal [delay]="400" class="mt-16 pt-12 border-t border-[rgba(255,255,255,0.05)]">
          <div class="flex flex-wrap gap-x-10 gap-y-6">
            <!-- ✏️  Add your certifications here -->
            <div class="flex items-center gap-3">
              <span class="w-[6px] h-[6px] rounded-full bg-gold flex-shrink-0"></span>
              <span class="font-mono text-[11px] tracking-widest text-ink-secondary uppercase">
                Azure Cloud Services — Coursera
              </span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-[6px] h-[6px] rounded-full bg-gold flex-shrink-0"></span>
              <span class="font-mono text-[11px] tracking-widest text-ink-secondary uppercase">
                JWT · RBAC · TOTP Auth Systems
              </span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-[6px] h-[6px] rounded-full bg-gold flex-shrink-0"></span>
              <span class="font-mono text-[11px] tracking-widest text-ink-secondary uppercase">
                Angular · ASP.NET Core · SQL Server
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AchievementsComponent {
  readonly achievements = PORTFOLIO.achievements;
}
