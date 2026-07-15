import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgClass }          from '@angular/common';
import { RevealDirective }  from '../../core/directives/reveal.directive';
import { PORTFOLIO, SkillCategory } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, NgClass],
  template: `
    <section id="skills" class="section-pad relative overflow-hidden bg-surface-raised">

      <!-- Section number watermark -->
      <div class="absolute top-16 right-8 md:right-16 pointer-events-none select-none">
        <span class="font-display text-[6rem] md:text-[9rem] font-bold text-[rgba(255,255,255,0.015)]
                     leading-none tracking-tighter">003</span>
      </div>

      <!-- Top edge line -->
      <div class="absolute top-0 inset-x-0 h-px"
           style="background: linear-gradient(90deg, transparent 0%, rgba(200,146,58,0.18) 50%, transparent 100%);">
      </div>

      <div class="container-wide">
        <!-- Section header -->
        <div appReveal class="flex items-center gap-5 mb-6">
          <span class="label-tag">Expertise</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">003</span>
        </div>

        <div appReveal [delay]="100" class="mb-16">
          <h2
            class="font-display text-ink-primary leading-tight"
            style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;"
          >
            Technical skills<br />
            <em class="text-gold">& capabilities</em>
          </h2>
        </div>

        <!-- Category tabs -->
        <div appReveal [delay]="200" class="flex flex-wrap gap-0 mb-12 border-b border-[rgba(255,255,255,0.05)]">
          @for (cat of categories; track cat.name; let i = $index) {
            <button
              (click)="activeIndex.set(i)"
              [ngClass]="{
                'text-gold border-b-[2px] border-gold': activeIndex() === i,
                'text-ink-muted hover:text-ink-secondary border-b-[2px] border-transparent': activeIndex() !== i
              }"
              class="font-mono text-[11px] tracking-widest uppercase py-3 px-5
                     transition-all duration-300 -mb-px"
            >{{ cat.name }}</button>
          }
        </div>

        <!-- Skills grid — active category -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          @for (skill of activeCategory.skills; track skill; let i = $index) {
            <div
              appReveal
              [delay]="i * 45"
              class="card-premium group relative overflow-hidden px-4 py-4 cursor-default"
            >
              <!-- Gold left accent on hover -->
              <span class="absolute left-0 top-0 bottom-0 w-[2px] bg-gold
                           scale-y-0 group-hover:scale-y-100
                           transition-transform duration-300 origin-bottom"></span>

              <span class="font-body text-[13px] font-medium text-ink-secondary
                           group-hover:text-ink-primary transition-colors duration-300 leading-snug">
                {{ skill }}
              </span>
            </div>
          }
        </div>

        <!-- All categories overview (desktop decorative strip) -->
        <div appReveal [delay]="400" class="hidden md:flex gap-10 mt-16 pt-12
              border-t border-[rgba(255,255,255,0.05)]">
          @for (cat of categories; track cat.name) {
            <div class="flex-1">
              <span class="label-tag block mb-3">{{ cat.name }}</span>
              <span class="font-mono text-[11px] text-ink-muted">
                {{ cat.skills.length }} skills
              </span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly categories  = PORTFOLIO.skillCategories;
  readonly activeIndex = signal(0);

  get activeCategory(): SkillCategory {
    return this.categories[this.activeIndex()];
  }
}
