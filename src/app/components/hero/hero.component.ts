import {
  Component,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PORTFOLIO } from '../../core/data/portfolio.data';

/**
 * HeroComponent
 *
 * Full-screen cinematic opener. Staggered entrance animations play
 * via CSS classes added after a short timeout (allows fonts to load).
 *
 * All transitions use property bindings ([style.opacity], [style.transform])
 * rather than string interpolation inside style="" attributes.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="hero"
      class="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero introduction"
    >
      <!-- ── Background layers ──────────────────────────────── -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 72px 72px;
        "
        aria-hidden="true"
      ></div>

      <div
        class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 0%, #070707 100%);"
        aria-hidden="true"
      ></div>

      <!-- Ambient orb — top left -->
      <div
        class="absolute pointer-events-none"
        style="
          left: -16rem; top: 33%;
          width: 680px; height: 680px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,146,58,0.055) 0%, transparent 70%);
          animation: floatSlow 11s ease-in-out infinite;
        "
        aria-hidden="true"
      ></div>

      <!-- Ambient orb — bottom right -->
      <div
        class="absolute pointer-events-none"
        style="
          right: -24rem; bottom: 0;
          width: 820px; height: 820px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,146,58,0.032) 0%, transparent 65%);
          animation: floatSlow 15s ease-in-out 6s infinite reverse;
        "
        aria-hidden="true"
      ></div>

      <!-- ── Main content ─────────────────────────────────── -->
      <div class="container-wide relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div class="max-w-4xl">

          <!-- Eyebrow -->
          <div
            class="flex items-center gap-4 mb-10 transition-all duration-700 delay-100"
            [style.opacity]="visible() ? 1 : 0"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(16px)'"
          >
            <span class="rule-gold" aria-hidden="true"></span>
            <span class="label-tag">{{ personal.role }}</span>
            <span class="rule-gold" aria-hidden="true"></span>
          </div>

          <!-- Name -->
          <h1
            class="font-display text-ink-primary leading-none tracking-[-0.01em]
                   transition-all duration-[800ms] delay-200"
            style="font-size: clamp(3.4rem, 9vw, 8.5rem); font-weight: 500;"
            [style.opacity]="visible() ? 1 : 0"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(24px)'"
          >
            <span class="block">{{ personal.firstName }}</span>
            <span class="block text-gold italic">{{ personal.lastName }}</span>
          </h1>

          <!-- Tagline -->
          <p
            class="font-display italic text-ink-secondary mt-6 mb-10
                   transition-all duration-700 delay-[300ms]"
            style="font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 400;"
            [style.opacity]="visible() ? 1 : 0"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(20px)'"
          >
            {{ personal.tagline }}
          </p>

          <!-- Sub-tagline -->
          <p
            class="font-body text-ink-secondary leading-relaxed max-w-xl mb-14
                   transition-all duration-700 delay-[380ms]"
            style="font-size: clamp(0.9rem, 1.5vw, 1.05rem); font-weight: 300;"
            [style.opacity]="visible() ? 1 : 0"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(20px)'"
          >
            {{ personal.subTagline }}
          </p>

          <!-- CTA buttons -->
          <div
            class="flex flex-wrap items-center gap-4 transition-all duration-700 delay-500"
            [style.opacity]="visible() ? 1 : 0"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(16px)'"
          >
            <a href="#projects" class="btn-gold">
              View My Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7 1l6 6-6 6"
                      stroke="currentColor" stroke-width="1.25"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a [href]="personal.resumeUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">View Resume</a>
            <a [href]="personal.coverLetterUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">Cover Letter</a>
          </div>

          <!-- Availability badge -->
          <div
            class="flex items-center gap-3 mt-10 transition-all duration-700 delay-[600ms]"
            [style.opacity]="visible() ? 1 : 0"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(16px)'"
          >
            <span class="relative flex h-2 w-2" aria-hidden="true">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span class="font-mono text-[10px] tracking-widest text-ink-secondary uppercase">
              {{ personal.availability }}
            </span>
          </div>
        </div>
      </div>

      <!-- ── Vertical social rail (desktop) ───────────────── -->
      <nav
        class="hidden lg:flex absolute right-14 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-10"
        [style.opacity]="visible() ? 1 : 0"
        style="transition: opacity 0.8s ease 0.8s;"
        aria-label="Social links"
      >
        @for (link of social; track link.name) {
          <a
            [href]="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="writing-vertical font-mono text-[9px] tracking-[0.22em] uppercase
                   text-ink-muted hover:text-gold transition-colors duration-300"
            [attr.aria-label]="link.name + ' profile'"
          >{{ link.name }}</a>
        }
        <span class="w-px h-24 bg-gradient-to-b from-[rgba(200,146,58,0.4)] to-transparent" aria-hidden="true"></span>
      </nav>

      <!-- ── Scroll indicator ─────────────────────────────── -->
      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        [style.opacity]="visible() ? 1 : 0"
        style="transition: opacity 0.7s ease 0.9s;"
        aria-hidden="true"
      >
        <span class="font-mono text-[9px] tracking-[0.25em] uppercase text-ink-muted">Scroll</span>
        <div class="w-[22px] h-[34px] border border-[rgba(255,255,255,0.12)] rounded-full flex justify-center pt-2">
          <span class="w-[3px] h-[7px] bg-gold rounded-full" style="animation: scrollLine 2.4s ease-in-out infinite;"></span>
        </div>
      </div>

      <!-- ── Section counter ──────────────────────────────── -->
      <div
        class="absolute bottom-12 right-14 hidden lg:block"
        [style.opacity]="visible() ? 1 : 0"
        style="transition: opacity 0.7s ease 1s;"
        aria-hidden="true"
      >
        <span class="font-mono text-[10px] tracking-widest text-ink-muted">001 / 008</span>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnInit {
  readonly personal = PORTFOLIO.personal;
  readonly social   = PORTFOLIO.social;
  readonly visible  = signal(false);

  ngOnInit(): void {
    setTimeout(() => this.visible.set(true), 150);
  }
}
