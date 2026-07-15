import {
  Component,
  HostListener,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PORTFOLIO } from '../../core/data/portfolio.data';

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Work',         href: '#projects' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Contact',      href: '#contact' },
] as const;

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  template: `
    <!-- ── Top bar ─────────────────────────────────────────── -->
    <header
      [ngClass]="{ 'bg-[rgba(7,7,7,0.92)] shadow-[0_1px_0_rgba(255,255,255,0.04)]': scrolled() }"
      class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style="backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"
    >
      <div class="container-wide flex items-center justify-between h-16 md:h-[72px]">

        <!-- Logo / Name -->
        <a
          href="#"
          class="flex items-center gap-3 group"
          aria-label="Go to top"
        >
          <!-- Gold mark -->
          <span
            class="w-[26px] h-[26px] flex items-center justify-center border border-gold
                   text-gold font-mono text-[10px] font-medium tracking-wider
                   group-hover:bg-gold group-hover:text-surface-base
                   transition-all duration-300"
          >APS</span>
          <span class="font-display text-ink-primary text-[15px] hidden sm:block">
            {{ firstName }}
            <span class="text-gold">{{ lastName }}</span>
          </span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
          @for (link of navLinks; track link.label) {
            <a
              [href]="link.href"
              class="link-underline font-body text-[13px] font-medium tracking-widest uppercase text-ink-secondary hover:text-ink-primary transition-colors duration-300"
            >{{ link.label }}</a>
          }
        </nav>

        <!-- Resume CTA + mobile trigger -->
        <div class="flex items-center gap-4">
          <a
            [href]="resumeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex btn-outline text-[11px] py-2.5 px-5"
          >Resume</a>
          <a
            [href]="coverLetterUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden lg:inline-flex btn-outline text-[11px] py-2.5 px-5"
          >Cover Letter</a>

          <!-- Mobile hamburger -->
          <button
            (click)="toggleMenu()"
            class="md:hidden flex flex-col gap-[5px] p-2 group"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Toggle navigation"
          >
            <span
              [ngClass]="{ 'rotate-45 translate-y-[7px]': menuOpen() }"
              class="block w-5 h-px bg-ink-primary transition-all duration-300"
            ></span>
            <span
              [ngClass]="{ 'opacity-0 scale-x-0': menuOpen() }"
              class="block w-5 h-px bg-ink-primary transition-all duration-300"
            ></span>
            <span
              [ngClass]="{ '-rotate-45 -translate-y-[7px]': menuOpen() }"
              class="block w-5 h-px bg-ink-primary transition-all duration-300"
            ></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu drawer -->
      <div
        [ngClass]="{ 'max-h-[400px] opacity-100': menuOpen(), 'max-h-0 opacity-0': !menuOpen() }"
        class="md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
               border-t border-[rgba(255,255,255,0.05)]"
        style="background-color: rgba(7,7,7,0.97); backdrop-filter: blur(20px);"
      >
        <nav class="container-wide flex flex-col py-6 gap-1" aria-label="Mobile navigation">
          @for (link of navLinks; track link.label) {
            <a
              [href]="link.href"
              (click)="closeMenu()"
              class="font-body text-[13px] font-medium tracking-widest uppercase text-ink-secondary
                     hover:text-gold py-3 border-b border-[rgba(255,255,255,0.035)]
                     transition-colors duration-200"
            >{{ link.label }}</a>
          }
          <a
            [href]="resumeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold mt-4 text-[11px] py-3 justify-center"
          >View Resume</a>
          <a
            [href]="coverLetterUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline mt-3 text-[11px] py-3 justify-center"
          >View Cover Letter</a>
        </nav>
      </div>
    </header>
  `,
})
export class NavbarComponent implements OnInit {
  readonly navLinks  = NAV_LINKS;
  readonly firstName = PORTFOLIO.personal.firstName;
  readonly lastName  = PORTFOLIO.personal.lastName;
  readonly resumeUrl = PORTFOLIO.personal.resumeUrl;
  readonly coverLetterUrl = PORTFOLIO.personal.coverLetterUrl;

  readonly scrolled  = signal(false);
  readonly menuOpen  = signal(false);

  ngOnInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 48);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
