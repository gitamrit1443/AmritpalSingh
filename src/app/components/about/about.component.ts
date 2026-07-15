import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PORTFOLIO } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section id="about" class="section-pad relative overflow-hidden">

      <!-- Subtle section number watermark -->
      <div class="absolute top-16 right-8 md:right-16 pointer-events-none select-none">
        <span class="font-display text-[6rem] md:text-[9rem] font-bold text-[rgba(255,255,255,0.012)]
                     leading-none tracking-tighter">002</span>
      </div>

      <div class="container-wide">
        <!-- ── Section header ───────────────────────────────── -->
        <div appReveal class="flex items-center gap-5 mb-20">
          <span class="label-tag">About</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">002</span>
        </div>

        <!-- ── Two-column layout ─────────────────────────────── -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <!-- Left — portrait -->
          <div appReveal [delay]="100" class="relative">
            <!-- Portrait frame -->
            <div class="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 overflow-hidden">
              <!-- ✏️  Replace src with your profile image path -->
              <img
                [src]="personal.profileImage"
                [alt]="personal.name"
                class="w-full h-full object-cover"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />

              <!-- Fallback placeholder shown when no image is set -->
              <div
                class="w-full h-full bg-surface-float flex-col items-center justify-center gap-4"
                style="display: none;"
              >
                <div class="w-20 h-20 rounded-full bg-surface-overlay flex items-center justify-center">
                  <span class="font-display text-gold text-2xl">{{ initials }}</span>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                  Add Your Photo
                </span>
              </div>

              <!-- Gold corner accents -->
              <span class="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold opacity-60"></span>
              <span class="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold opacity-60"></span>
            </div>

            <!-- Location tag -->
            <div class="mt-6 flex items-center gap-3">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="text-gold flex-shrink-0">
                <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor"/>
              </svg>
              <span class="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                {{ personal.location }}
              </span>
            </div>
          </div>

          <!-- Right — copy -->
          <div class="flex flex-col gap-10">
            <!-- Headline -->
            <div appReveal [delay]="200">
              <h2
                class="font-display text-ink-primary leading-tight mb-6"
                style="font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 500;"
              >
                Backend strength.<br>
                <em class="text-gold">Full-stack execution.</em>
              </h2>

              @for (paragraph of personal.bio; track $index) {
                <p class="font-body text-ink-secondary leading-[1.85] mb-4 text-[15px]">
                  {{ paragraph }}
                </p>
              }
            </div>

            <!-- Strengths list -->
            <div class="flex flex-col gap-px">
              @for (strength of personal.strengths; track strength.label; let i = $index) {
                <div
                  appReveal
                  [delay]="300 + i * 100"
                  class="group flex gap-5 py-5 border-b border-[rgba(255,255,255,0.05)]
                         hover:border-[rgba(200,146,58,0.18)] transition-colors duration-400"
                >
                  <!-- Index -->
                  <span class="font-mono text-[10px] text-gold mt-1 flex-shrink-0 pt-0.5">
                    0{{ i + 1 }}
                  </span>
                  <div>
                    <h3 class="font-body font-semibold text-ink-primary text-[14px] tracking-wide mb-1.5
                               group-hover:text-gold transition-colors duration-300">
                      {{ strength.label }}
                    </h3>
                    <p class="font-body text-ink-secondary text-[13px] leading-relaxed font-light">
                      {{ strength.description }}
                    </p>
                  </div>
                </div>
              }
            </div>

            <!-- Documents CTA -->
            <div appReveal [delay]="600" class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <article class="group border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.018)] overflow-hidden hover:border-[rgba(200,146,58,0.32)] transition-colors duration-300">
                <div class="h-36 overflow-hidden bg-surface-float border-b border-[rgba(255,255,255,0.05)]">
                  <img src="/assets/doc-previews/resume-preview.png" alt="Resume preview" class="w-full h-full object-cover object-top opacity-90 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
                <div class="p-5">
                  <span class="label-tag block mb-2">Resume</span>
                  <p class="font-body text-[13px] text-ink-secondary leading-relaxed mb-4">One-page full-stack developer resume with projects, skills, experience, education, and Azure certification.</p>
                  <div class="flex flex-wrap gap-3">
                    <a [href]="personal.resumeUrl" target="_blank" rel="noopener noreferrer" class="link-underline font-mono text-[10px] tracking-widest uppercase text-gold">Open PDF</a>
                    <a [href]="personal.resumeDocxUrl" class="link-underline font-mono text-[10px] tracking-widest uppercase text-ink-muted hover:text-gold">DOCX</a>
                  </div>
                </div>
              </article>

              <article class="group border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.018)] overflow-hidden hover:border-[rgba(200,146,58,0.32)] transition-colors duration-300">
                <div class="h-36 overflow-hidden bg-surface-float border-b border-[rgba(255,255,255,0.05)]">
                  <img src="/assets/doc-previews/cover-letter-preview.png" alt="Cover letter preview" class="w-full h-full object-cover object-top opacity-90 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
                <div class="p-5">
                  <span class="label-tag block mb-2">Cover Letter</span>
                  <p class="font-body text-[13px] text-ink-secondary leading-relaxed mb-4">Targeted full-stack/SDE cover letter highlighting CodeSoft backend work, HireFlow, InsightFlow, and deployment skills.</p>
                  <div class="flex flex-wrap gap-3">
                    <a [href]="personal.coverLetterUrl" target="_blank" rel="noopener noreferrer" class="link-underline font-mono text-[10px] tracking-widest uppercase text-gold">Open PDF</a>
                    <a [href]="personal.coverLetterDocxUrl" class="link-underline font-mono text-[10px] tracking-widest uppercase text-ink-muted hover:text-gold">DOCX</a>
                  </div>
                </div>
              </article>
            </div>

            <!-- Email CTA -->
            <div appReveal [delay]="700" class="flex items-center gap-4 pt-2">
              <a
                [href]="'mailto:' + personal.email"
                class="link-underline font-mono text-[11px] tracking-widest uppercase text-gold"
              >{{ personal.email }}</a>
              <span class="w-12 h-px bg-[rgba(200,146,58,0.3)]"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly personal = PORTFOLIO.personal;

  get initials(): string {
    return 'APS';
  }
}
