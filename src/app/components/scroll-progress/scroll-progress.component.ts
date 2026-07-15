import {
  Component,
  HostListener,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * ScrollProgressComponent
 *
 * A 2px tall gold progress bar fixed to the very top of the viewport.
 * Width updates on every scroll event, calculated as:
 *   (scrollY / (documentHeight - viewportHeight)) * 100
 *
 * Uses will-change: width and transform3d to stay on the compositor thread.
 * Fades in after 5% scroll depth so it doesn't flash on load.
 */
@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: block; }

    .progress-track {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      z-index: 100;
      background: transparent;
      pointer-events: none;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(200, 146, 58, 0.6) 0%,
        #c8923a 50%,
        #dba04a 100%
      );
      transform-origin: left center;
      will-change: transform;
      transition: opacity 0.4s ease;
      box-shadow: 0 0 8px rgba(200, 146, 58, 0.35);
    }
  `],
  template: `
    <div class="progress-track" aria-hidden="true">
      <div
        class="progress-bar"
        [style.width.%]="progress()"
        [style.opacity]="progress() > 2 ? 1 : 0"
      ></div>
    </div>
  `,
})
export class ScrollProgressComponent {
  readonly progress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight;
    const winHeight    = window.innerHeight;
    const scrollable   = docHeight - winHeight;

    if (scrollable <= 0) return;

    const pct = Math.min((scrollTop / scrollable) * 100, 100);
    this.progress.set(pct);
  }
}
