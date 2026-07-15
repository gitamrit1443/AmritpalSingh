import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgClass }           from '@angular/common';
import { RevealDirective }   from '../../core/directives/reveal.directive';
import { PORTFOLIO, Project } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, NgClass],
  template: `
    <section id="projects" class="section-pad relative overflow-hidden">

      <!-- Section number watermark -->
      <div class="absolute top-16 right-8 md:right-16 pointer-events-none select-none">
        <span class="font-display text-[6rem] md:text-[9rem] font-bold text-[rgba(255,255,255,0.012)]
                     leading-none tracking-tighter">004</span>
      </div>

      <div class="container-wide">
        <!-- Section header -->
        <div appReveal class="flex items-center gap-5 mb-6">
          <span class="label-tag">Selected Work</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">004</span>
        </div>

        <div appReveal [delay]="100" class="flex flex-col md:flex-row md:items-end
              md:justify-between gap-6 mb-16">
          <h2
            class="font-display text-ink-primary leading-tight"
            style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;"
          >
            Featured<br />
            <em class="text-gold">projects</em>
          </h2>

          <!-- Count label -->
          <span class="font-mono text-[11px] tracking-widest text-ink-muted uppercase self-end pb-1">
            {{ projects.length }} case studies
          </span>
        </div>

        <!-- ── Project list ────────────────────────────────── -->
        <div class="flex flex-col gap-1">
          @for (project of projects; track project.id; let i = $index) {
            <article
              appReveal
              [delay]="i * 80"
              (mouseenter)="hovered.set(project.id)"
              (mouseleave)="hovered.set(null)"
              [ngClass]="{
                'bg-[rgba(200,146,58,0.028)] border-[rgba(200,146,58,0.15)]': hovered() === project.id
              }"
              class="group relative border border-[rgba(255,255,255,0.05)]
                     transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                     overflow-hidden"
            >
              <!-- Hover line on left edge -->
              <div
                [ngClass]="{ 'h-full': hovered() === project.id, 'h-0': hovered() !== project.id }"
                class="absolute left-0 top-0 w-[2px] bg-gold transition-all duration-500 origin-top"
              ></div>

              <div class="flex flex-col lg:flex-row lg:items-center gap-6 px-6 py-7 md:px-8 md:py-8">

                <!-- Number -->
                <span class="font-mono text-[11px] text-gold tracking-widest flex-shrink-0 w-8">
                  {{ project.number }}
                </span>

                <!-- Title + category -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 class="font-display text-ink-primary font-medium transition-colors duration-300
                               group-hover:text-gold"
                        style="font-size: clamp(1.1rem, 2.5vw, 1.45rem);">
                      {{ project.title }}
                    </h3>
                    <span class="font-mono text-[10px] tracking-widest uppercase text-ink-muted">
                      {{ project.year }}
                    </span>
                  </div>
                  <span class="label-tag">{{ project.category }}</span>
                </div>

                <!-- Description (revealed on hover on desktop) -->
                <div class="lg:w-80 xl:w-96 flex-shrink-0">
                  <p class="font-body text-[13px] text-ink-secondary leading-relaxed font-light
                             line-clamp-3 lg:line-clamp-none">
                    {{ project.description }}
                  </p>
                </div>

                <!-- Tech stack chips -->
                <div class="flex flex-wrap gap-2 lg:w-52 xl:w-64 flex-shrink-0">
                  @for (tech of project.tech.slice(0, 4); track tech) {
                    <span class="font-mono text-[9px] tracking-wider uppercase
                                 border border-[rgba(255,255,255,0.07)] text-ink-muted
                                 px-2.5 py-1.5 group-hover:border-[rgba(200,146,58,0.2)]
                                 group-hover:text-gold/70 transition-all duration-300">
                      {{ tech }}
                    </span>
                  }
                </div>

                <!-- CTAs -->
                <div class="flex items-center gap-4 flex-shrink-0">
                  @if (project.githubUrl) {
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="$event.stopPropagation()"
                      class="font-mono text-[10px] tracking-widest uppercase text-ink-muted
                             hover:text-ink-primary transition-colors duration-300"
                      aria-label="View source code on GitHub"
                    >Code</a>
                  }
                  <a
                    [href]="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    (click)="$event.stopPropagation()"
                    class="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase
                           text-gold hover:text-gold-light transition-colors duration-300"
                    aria-label="View live project"
                  >
                    View
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H4M11 1V8"
                            stroke="currentColor" stroke-width="1.2"
                            stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Project image (visible on hover, desktop) -->
              @if (project.image && hovered() === project.id) {
                <div class="hidden xl:block absolute right-0 top-0 h-full w-72 pointer-events-none overflow-hidden">
                  <div class="absolute inset-y-0 left-0 w-16 z-10"
                       style="background: linear-gradient(to right, rgba(7,7,7,0.01), transparent);"></div>
                  <img
                    [src]="project.image"
                    [alt]="project.title"
                    class="w-full h-full object-cover opacity-20 transition-opacity duration-500"
                    loading="lazy"
                    onerror="this.parentElement.style.display='none';"
                  />
                </div>
              }
            </article>
          }
        </div>

        <!-- All projects link -->
        <div appReveal [delay]="400" class="flex justify-end mt-10">
          <a
            href="https://github.com/gitamrit1443"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase
                   text-ink-muted hover:text-gold transition-colors duration-300"
          >
            More on GitHub
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6"
                    stroke="currentColor" stroke-width="1.2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  readonly projects = PORTFOLIO.projects;
  readonly hovered  = signal<number | null>(null);
}
