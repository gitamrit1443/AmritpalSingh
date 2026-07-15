import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, share } from 'rxjs/operators';

/**
 * ScrollService
 *
 * Provides a single shared scroll observable that any component can subscribe to.
 * Running scroll events through a shared observable means we only attach ONE
 * native scroll listener to the window — regardless of how many components need it.
 *
 * Usage:
 *   constructor(private scroll: ScrollService) {}
 *
 *   ngOnInit() {
 *     this.scroll.scrollY$.subscribe(y => { ... });
 *   }
 *
 * Currently used by: NavbarComponent, ScrollProgressComponent
 * (Both are standalone and use HostListener internally — this service is here
 * as a foundation if you later add more scroll-dependent features.)
 */
@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  /** Shared, zone-free scroll observable — subscribers get scrollY value */
  readonly scrollY$ = fromEvent(window, 'scroll', { passive: true }).pipe(
    debounceTime(8),   // ~1 frame debounce to avoid excessive emissions
    share(),           // Multicasts to all subscribers, single listener
    takeUntil(this.destroy$),
  );

  /** Smooth-scroll to any element by selector or id */
  scrollTo(target: string, offset = 72): void {
    const el = document.querySelector(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /** Current scroll position as a 0–1 progress ratio */
  get progress(): number {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    return scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
