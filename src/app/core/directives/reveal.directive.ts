import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

/**
 * Scroll-reveal directive using IntersectionObserver.
 * Usage: <div appReveal delay="200">...</div>
 *
 * Elements start invisible (opacity:0, translateY:32px) and
 * transition to visible when they enter the viewport.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Delay in ms before the reveal animation plays */
  @Input() delay = 0;

  /** Animation duration in ms */
  @Input() duration = 700;

  /** Y-axis offset to slide from (px) */
  @Input() distance = 28;

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;

    // Set initial hidden state
    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', `translateY(${this.distance}px)`);
    this.renderer.setStyle(
      el,
      'transition',
      `opacity ${this.duration}ms cubic-bezier(0.16,1,0.3,1) ${this.delay}ms,
       transform ${this.duration}ms cubic-bezier(0.16,1,0.3,1) ${this.delay}ms`,
    );

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(el, 'opacity', '1');
          this.renderer.setStyle(el, 'transform', 'translateY(0)');
          // Stop observing — fire once only
          this.observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
