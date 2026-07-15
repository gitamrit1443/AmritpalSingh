import {
  Component,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PORTFOLIO } from '../../core/data/portfolio.data';

/**
 * PageLoaderComponent
 *
 * A cinematic entrance animation shown for ~2 seconds on first load.
 * Displays the initials mark, a loading bar that fills, then fades out
 * and removes itself from the DOM — freeing paint resources.
 *
 * Timing:
 *  0ms    → component mounts, bar begins filling (CSS animation, 1.6s)
 *  1700ms → trigger exit: loader fades up and out
 *  2300ms → hidden signal set true → @if removes element from DOM
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: block; }

    .loader-wrap {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #070707;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1),
                  transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }

    .loader-wrap.exiting {
      opacity: 0;
      transform: translateY(-16px);
      pointer-events: none;
    }

    /* Fine grid — same as hero background */
    .loader-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
      background-size: 72px 72px;
    }

    /* Radial fade over grid */
    .loader-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 80% 80% at 50% 50%,
        transparent 0%,
        #070707 100%
      );
    }

    /* Monogram mark */
    .loader-mark {
      position: relative;
      width: 64px;
      height: 64px;
      border: 1px solid rgba(200, 146, 58, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Corner accents on the mark */
    .loader-mark::before,
    .loader-mark::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-color: #c8923a;
      border-style: solid;
      opacity: 0.8;
    }
    .loader-mark::before {
      top: -1px; left: -1px;
      border-width: 1px 0 0 1px;
    }
    .loader-mark::after {
      bottom: -1px; right: -1px;
      border-width: 0 1px 1px 0;
    }

    /* Progress track */
    .loader-track {
      width: 160px;
      height: 1px;
      background: rgba(255,255,255,0.06);
      position: relative;
      overflow: hidden;
    }

    /* Animated fill bar */
    .loader-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      background: #c8923a;
      animation: loaderFill 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
    }

    @keyframes loaderFill {
      0%   { width: 0%; }
      40%  { width: 45%; }
      70%  { width: 72%; }
      100% { width: 100%; }
    }
  `],
  template: `
    @if (!hidden()) {
      <div
        class="loader-wrap"
        [ngClass]="{ exiting: exiting() }"
        aria-hidden="true"
        role="presentation"
      >
        <!-- Background layers -->
        <div class="loader-grid"></div>
        <div class="loader-vignette"></div>

        <!-- Content (above the grid layers) -->
        <div style="position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:2.5rem;">

          <!-- Monogram -->
          <div class="loader-mark">
            <span
              style="
                font-family: 'Playfair Display', Georgia, serif;
                color: #c8923a;
                font-size: 1.1rem;
                font-weight: 500;
                letter-spacing: 0.08em;
              "
            >{{ initials }}</span>
          </div>

          <!-- Name -->
          <div style="text-align:center;">
            <span
              style="
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.6rem;
                letter-spacing: 0.28em;
                text-transform: uppercase;
                color: #44403c;
              "
            >{{ name }}</span>
          </div>

          <!-- Loading bar -->
          <div class="loader-track">
            <div class="loader-bar"></div>
          </div>
        </div>
      </div>
    }
  `,
})
export class LoaderComponent implements OnInit {
  readonly exiting = signal(false);
  readonly hidden  = signal(false);

  readonly initials = PORTFOLIO.personal.firstName.charAt(0) + PORTFOLIO.personal.lastName.charAt(0);
  readonly name     = PORTFOLIO.personal.name;

  ngOnInit(): void {
    // Begin exit at 1.7s
    setTimeout(() => this.exiting.set(true), 1700);

    // Remove from DOM at 2.3s (after exit transition completes)
    setTimeout(() => this.hidden.set(true),  2300);
  }
}
