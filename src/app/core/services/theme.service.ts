import { Injectable, signal, effect } from '@angular/core';

export type ThemeAccent = 'gold' | 'silver' | 'slate';

/**
 * ThemeService
 *
 * Manages runtime theme state for the portfolio.
 * Currently only handles accent switching, but is structured to support
 * full light/dark mode if you choose to add it later.
 *
 * Usage in a component:
 *   constructor(private theme: ThemeService) {}
 *   toggleAccent() { this.theme.cycleAccent(); }
 *
 * ✏️  EXTEND: Add light mode support by toggling the [data-theme] attribute
 *     on document.documentElement and defining a 'portfolio-light' daisyUI theme
 *     in tailwind.config.js with light surface colours.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Current accent colour variant */
  readonly accent = signal<ThemeAccent>('gold');

  // CSS variable values for each accent
  private readonly accentMap: Record<ThemeAccent, { primary: string; light: string; dim: string }> = {
    gold:   { primary: '#c8923a', light: '#dba04a', dim: '#6b4b1a' },
    silver: { primary: '#9ca3af', light: '#c4c9d1', dim: '#374151' },
    slate:  { primary: '#64748b', light: '#94a3b8', dim: '#1e293b' },
  };

  constructor() {
    // Apply the accent CSS variables whenever the signal changes
    effect(() => {
      const vars = this.accentMap[this.accent()];
      const root = document.documentElement;
      root.style.setProperty('--color-gold',       vars.primary);
      root.style.setProperty('--color-gold-light', vars.light);
      root.style.setProperty('--color-gold-dim',   vars.dim);
    });
  }

  /** Cycle through available accents: gold → silver → slate → gold */
  cycleAccent(): void {
    const order: ThemeAccent[] = ['gold', 'silver', 'slate'];
    const current = this.accent();
    const next    = order[(order.indexOf(current) + 1) % order.length];
    this.accent.set(next);
  }

  /** Set a specific accent directly */
  setAccent(accent: ThemeAccent): void {
    this.accent.set(accent);
  }
}
