import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PORTFOLIO } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, NgClass],
  template: `
    <section id="testimonials" class="section-pad relative overflow-hidden bg-surface-raised">

      <!-- Top edge line -->
      <div class="absolute top-0 inset-x-0 h-px"
           style="background: linear-gradient(90deg, transparent 0%, rgba(200,146,58,0.15) 50%, transparent 100%);">
      </div>

      <!-- Section number watermark -->
      <div class="absolute top-16 right-8 md:right-16 pointer-events-none select-none">
        <span class="font-display text-[6rem] md:text-[9rem] font-bold text-[rgba(255,255,255,0.015)]
                     leading-none tracking-tighter">007</span>
      </div>

      <div class="container-wide">
        <!-- Section header -->
        <div appReveal class="flex items-center gap-5 mb-6">
          <span class="label-tag">Project Proof</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">007</span>
        </div>

        <div appReveal [delay]="100" class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2
            class="font-display text-ink-primary leading-tight"
            style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;"
          >
            Evidence from<br />
            <em class="text-gold">real builds</em>
          </h2>

          <!-- Navigation arrows -->
          <div class="flex items-center gap-3">
            <button
              (click)="prev()"
              aria-label="Previous project proof"
              class="w-10 h-10 border border-[rgba(255,255,255,0.08)] flex items-center justify-center
                     text-ink-muted hover:border-gold hover:text-gold
                     transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 1L3 7l6 6" stroke="currentColor" stroke-width="1.25"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              (click)="next()"
              aria-label="Next project proof"
              class="w-10 h-10 border border-[rgba(255,255,255,0.08)] flex items-center justify-center
                     text-ink-muted hover:border-gold hover:text-gold
                     transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 1l6 6-6 6" stroke="currentColor" stroke-width="1.25"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Quote display -->
        <div appReveal [delay]="200" class="relative min-h-[260px] md:min-h-[220px]">
          @for (t of testimonials; track t.id; let i = $index) {
            <div
              [ngClass]="{
                'opacity-100 translate-y-0 pointer-events-auto':  active() === i,
                'opacity-0 translate-y-4 pointer-events-none absolute inset-0': active() !== i
              }"
              class="transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <!-- Large decorative quote mark -->
              <div class="flex gap-6 md:gap-10 items-start">
                <span
                  class="font-display text-gold/30 leading-none flex-shrink-0 hidden md:block"
                  style="font-size: 6rem; line-height: 0.7; font-weight: 700;"
                >"</span>

                <div>
                  <!-- Quote text -->
                  <p
                    class="font-display italic text-ink-primary leading-relaxed mb-8"
                    style="font-size: clamp(1rem, 2vw, 1.25rem); font-weight: 400;"
                  >{{ t.quote }}</p>

                  <!-- Attribution -->
                  <div class="flex items-center gap-4">
                    <span class="rule-gold flex-shrink-0"></span>
                    <div>
                      <span class="font-body font-semibold text-[14px] text-ink-primary block">
                        {{ t.author }}
                      </span>
                      <span class="font-mono text-[10px] tracking-widest uppercase text-ink-muted">
                        {{ t.role }}, {{ t.company }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Indicator dots -->
        <div class="flex items-center gap-2 mt-10">
          @for (t of testimonials; track t.id; let i = $index) {
            <button
              (click)="active.set(i)"
              [ngClass]="{
                'bg-gold w-6': active() === i,
                'bg-ink-faint w-2 hover:bg-ink-muted': active() !== i
              }"
              class="h-[3px] transition-all duration-400"
              [attr.aria-label]="'View project proof ' + (i + 1)"
            ></button>
          }
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsComponent {
  readonly testimonials = PORTFOLIO.testimonials;
  readonly active       = signal(0);

  next(): void {
    this.active.update(i => (i + 1) % this.testimonials.length);
  }

  prev(): void {
    this.active.update(i =>
      (i - 1 + this.testimonials.length) % this.testimonials.length
    );
  }
}
