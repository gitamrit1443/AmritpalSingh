import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  ChangeDetectionStrategy,
  NgZone,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';

/**
 * CursorComponent
 *
 * Replaces the system cursor on non-touch devices with a two-layer premium cursor:
 *
 *   Layer 1 — Gold dot (4px):  follows mouse position precisely, no lag.
 *   Layer 2 — Ring (28px):    follows with a smooth lerp delay, creating a trailing effect.
 *
 * States:
 *   - Default:            dot + ring visible
 *   - Hovering a link:    ring expands to 56px spotlight
 *   - Hovering text input:ring becomes thin vertical bar
 *   - Clicking:           both layers compress slightly
 *
 * Performance:
 *   - transform: translate3d() — compositor thread only, zero layout reflow
 *   - requestAnimationFrame loop with lerp for the ring
 *   - NgZone.runOutsideAngular() — zero Angular change detection cost
 *   - Only re-enters zone for NgClass signal updates (rare)
 *   - Hidden entirely on touch devices via @media (hover: none)
 *
 * Angular 21 pattern: uses inject() instead of constructor DI
 */
@Component({
  selector: 'app-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  styles: [`
    :host { pointer-events: none; user-select: none; }

    @media (hover: none) { :host { display: none; } }

    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 4px; height: 4px;
      margin: -2px 0 0 -2px;
      border-radius: 50%;
      background: #c8923a;
      z-index: 9998;
      pointer-events: none;
      will-change: transform;
      transition: opacity 0.3s ease, transform 0.15s ease;
    }
    .cursor-dot.hidden   { opacity: 0; }
    .cursor-dot.on-link  { transform: scale(0); opacity: 0; }
    .cursor-dot.clicking { transform: scale(0.4); }

    .cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 28px; height: 28px;
      margin: -14px 0 0 -14px;
      border-radius: 50%;
      border: 1px solid rgba(200, 146, 58, 0.55);
      z-index: 9997;
      pointer-events: none;
      will-change: transform;
      transition:
        width  0.35s cubic-bezier(0.16, 1, 0.3, 1),
        height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
        margin 0.35s cubic-bezier(0.16, 1, 0.3, 1),
        border-color 0.35s ease,
        background   0.35s ease,
        opacity      0.3s ease;
    }
    .cursor-ring.hidden   { opacity: 0; }
    .cursor-ring.clicking {
      width: 24px; height: 24px;
      margin: -12px 0 0 -12px;
      border-color: rgba(200, 146, 58, 0.8);
    }
    .cursor-ring.on-link {
      width: 56px; height: 56px;
      margin: -28px 0 0 -28px;
      border-color: rgba(200, 146, 58, 0.22);
      background: rgba(200, 146, 58, 0.05);
    }
    .cursor-ring.on-text {
      width: 2px; height: 28px;
      margin: -14px 0 0 -1px;
      border-radius: 1px;
      border-color: rgba(200, 146, 58, 0.5);
    }
  `],
  template: `
    <div
      class="cursor-dot"
      [ngClass]="{
        hidden:   hidden(),
        clicking: clicking(),
        'on-link': onLink()
      }"
    ></div>

    <div
      class="cursor-ring"
      [ngClass]="{
        hidden:   hidden(),
        clicking: clicking(),
        'on-link': onLink(),
        'on-text': onText()
      }"
    ></div>
  `,
})
export class CursorComponent implements OnInit, OnDestroy {
  // Angular 21: inject() function instead of constructor parameter
  private readonly ngZone = inject(NgZone);

  readonly hidden   = signal(true);
  readonly clicking = signal(false);
  readonly onLink   = signal(false);
  readonly onText   = signal(false);

  private mouseX = 0;
  private mouseY = 0;
  private ringX  = 0;
  private ringY  = 0;
  private rafId!: number;

  /** Lerp factor: 0 = max lag, 1 = instant follow */
  private readonly LERP = 0.12;

  // Bound references so we can removeEventListener cleanly
  private readonly onMove  = (e: MouseEvent) => this.handleMove(e);
  private readonly onDown  = ()              => this.ngZone.run(() => this.clicking.set(true));
  private readonly onUp    = ()              => this.ngZone.run(() => this.clicking.set(false));
  private readonly onOver  = (e: MouseEvent) => this.handleOver(e);
  private readonly onLeave = (e: MouseEvent) => { if (!e.relatedTarget) this.ngZone.run(() => this.hidden.set(true)); };

  ngOnInit(): void {
    // Touch-only devices: skip entirely
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.body.classList.add('custom-cursor');

    // All DOM work runs outside Angular zone — zero change detection triggered
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove',  this.onMove,  { passive: true });
      document.addEventListener('mousedown',  this.onDown);
      document.addEventListener('mouseup',    this.onUp);
      document.addEventListener('mouseover',  this.onOver,  { passive: true });
      document.addEventListener('mouseleave', this.onLeave);
      this.startLoop();
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('custom-cursor');
    document.removeEventListener('mousemove',  this.onMove);
    document.removeEventListener('mousedown',  this.onDown);
    document.removeEventListener('mouseup',    this.onUp);
    document.removeEventListener('mouseover',  this.onOver);
    document.removeEventListener('mouseleave', this.onLeave);
    cancelAnimationFrame(this.rafId);
  }

  private startLoop(): void {
    const dot  = document.querySelector('.cursor-dot')  as HTMLElement | null;
    const ring = document.querySelector('.cursor-ring') as HTMLElement | null;

    const tick = () => {
      this.ringX += (this.mouseX - this.ringX) * this.LERP;
      this.ringY += (this.mouseY - this.ringY) * this.LERP;

      dot?.style.setProperty('transform', `translate3d(${this.mouseX}px,${this.mouseY}px,0)`);
      ring?.style.setProperty('transform', `translate3d(${this.ringX}px,${this.ringY}px,0)`);

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private handleMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (this.hidden()) {
      this.ngZone.run(() => this.hidden.set(false));
    }
  }

  private handleOver(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const isLink = !!target.closest('a, button, [role="button"], label');
    const isText = !!target.closest('input[type="text"], input[type="email"], textarea');
    this.ngZone.run(() => {
      this.onLink.set(isLink && !isText);
      this.onText.set(isText);
    });
  }
}
