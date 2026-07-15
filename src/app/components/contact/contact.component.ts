import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { PORTFOLIO } from '../../core/data/portfolio.data';

interface ContactForm {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RevealDirective],
  template: `
    <section id="contact" class="section-pad relative overflow-hidden">

      <!-- Ambient light -->
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style="background: radial-gradient(ellipse, rgba(200,146,58,0.042) 0%, transparent 70%);"
      ></div>

      <!-- Top edge line -->
      <div class="absolute top-0 inset-x-0 h-px"
           style="background: linear-gradient(90deg, transparent 0%, rgba(200,146,58,0.15) 50%, transparent 100%);">
      </div>

      <div class="container-wide relative z-10">
        <!-- Section header -->
        <div appReveal class="flex items-center gap-5 mb-6">
          <span class="label-tag">Contact</span>
          <span class="rule-gold"></span>
          <span class="font-mono text-[10px] tracking-widest text-ink-muted">008</span>
        </div>

        <!-- Big headline -->
        <div appReveal [delay]="100" class="mb-16">
          <h2
            class="font-display text-ink-primary leading-tight"
            style="font-size: clamp(2.4rem, 6vw, 5rem); font-weight: 500;"
          >
            Let's build<br />
            <em class="text-gold">something great.</em>
          </h2>
        </div>

        <!-- Two-column grid -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24">

          <!-- Left — Contact form -->
          <div appReveal [delay]="200">
            @if (!submitted()) {
              <form
                #contactForm="ngForm"
                (ngSubmit)="onSubmit(contactForm.valid)"
                class="flex flex-col gap-5"
                novalidate
              >
                <!-- Name + Email row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div class="flex flex-col gap-2">
                    <label class="label-tag">Name</label>
                    <input
                      type="text"
                      name="name"
                      [(ngModel)]="form.name"
                      required
                      placeholder="Your full name"
                      class="w-full px-4 py-3.5 font-body text-[14px] transition-all duration-300"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="label-tag">Email</label>
                    <input
                      type="email"
                      name="email"
                      [(ngModel)]="form.email"
                      required
                      placeholder="your@email.com"
                      class="w-full px-4 py-3.5 font-body text-[14px] transition-all duration-300"
                    />
                  </div>
                </div>

                <!-- Subject -->
                <div class="flex flex-col gap-2">
                  <label class="label-tag">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    [(ngModel)]="form.subject"
                    required
                    placeholder="Project enquiry / Collaboration / Hiring"
                    class="w-full px-4 py-3.5 font-body text-[14px] transition-all duration-300"
                  />
                </div>

                <!-- Message -->
                <div class="flex flex-col gap-2">
                  <label class="label-tag">Message</label>
                  <textarea
                    name="message"
                    [(ngModel)]="form.message"
                    required
                    rows="6"
                    placeholder="Tell me about your project, timeline, and goals…"
                    class="w-full px-4 py-3.5 font-body text-[14px] resize-none transition-all duration-300"
                  ></textarea>
                </div>

                <!-- Submit -->
                <div class="flex justify-start pt-2">
                  <button
                    type="submit"
                    class="btn-gold"
                    [disabled]="submitting()"
                  >
                    @if (submitting()) {
                      <span class="inline-block w-4 h-4 border-2 border-surface-base/30
                                   border-t-surface-base rounded-full animate-spin"></span>
                      Sending…
                    } @else {
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor"
                              stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    }
                  </button>
                </div>
              </form>
            } @else {
              <!-- Success state -->
              <div class="flex flex-col gap-6 py-8">
                <div class="w-12 h-12 border border-gold flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9l5 5 7-8" stroke="#c8923a" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3 class="font-display text-ink-primary text-2xl font-medium">
                  Message received.
                </h3>
                <p class="font-body text-ink-secondary text-[14px] leading-relaxed">
                  I'll review your message and get back to you within 1–2 business days.
                </p>
                <button
                  (click)="reset()"
                  class="btn-outline self-start text-[11px] py-2.5 px-5"
                >Send Another</button>
              </div>
            }
          </div>

          <!-- Right — Contact info sidebar -->
          <div appReveal [delay]="300" class="flex flex-col gap-10">

            <!-- Direct email -->
            <div>
              <span class="label-tag block mb-3">Direct</span>
              <a
                [href]="'mailto:' + personal.email"
                class="font-body text-[15px] text-ink-primary link-underline
                       hover:text-gold transition-colors duration-300"
              >{{ personal.email }}</a>
            </div>

            <!-- Location -->
            <div>
              <span class="label-tag block mb-3">Location</span>
              <span class="font-body text-[14px] text-ink-secondary">{{ personal.location }}</span>
            </div>

            <!-- Availability -->
            <div>
              <span class="label-tag block mb-3">Status</span>
              <div class="flex items-center gap-2">
                <span class="relative flex h-2 w-2 flex-shrink-0">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span class="font-body text-[14px] text-ink-secondary">{{ personal.availability }}</span>
              </div>
            </div>

            <!-- Resume / Cover Letter -->
            <div>
              <span class="label-tag block mb-4">Documents</span>
              <div class="grid grid-cols-1 gap-3">
                <a [href]="personal.resumeUrl" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between group py-2.5 border-b border-[rgba(255,255,255,0.05)] hover:border-[rgba(200,146,58,0.18)] transition-colors duration-300">
                  <span class="font-body text-[13px] text-ink-secondary group-hover:text-gold transition-colors duration-300">Resume PDF</span>
                  <span class="font-mono text-[9px] tracking-widest text-ink-muted group-hover:text-gold transition-colors duration-300">OPEN</span>
                </a>
                <a [href]="personal.coverLetterUrl" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between group py-2.5 border-b border-[rgba(255,255,255,0.05)] hover:border-[rgba(200,146,58,0.18)] transition-colors duration-300">
                  <span class="font-body text-[13px] text-ink-secondary group-hover:text-gold transition-colors duration-300">Cover Letter PDF</span>
                  <span class="font-mono text-[9px] tracking-widest text-ink-muted group-hover:text-gold transition-colors duration-300">OPEN</span>
                </a>
              </div>
            </div>

            <!-- Social links -->
            <div>
              <span class="label-tag block mb-4">On the Web</span>
              <div class="flex flex-col gap-3">
                @for (link of social; track link.name) {
                  <a
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-between group py-2.5
                           border-b border-[rgba(255,255,255,0.05)]
                           hover:border-[rgba(200,146,58,0.18)] transition-colors duration-300"
                  >
                    <span class="font-body text-[13px] text-ink-secondary
                                 group-hover:text-gold transition-colors duration-300">
                      {{ link.name }}
                    </span>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                         class="text-ink-muted group-hover:text-gold transition-colors duration-300">
                      <path d="M1 10L10 1M10 1H4M10 1V7"
                            stroke="currentColor" stroke-width="1.1"
                            stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly personal   = PORTFOLIO.personal;
  readonly social     = PORTFOLIO.social;

  readonly submitting = signal(false);
  readonly submitted  = signal(false);

  form: ContactForm = { name: '', email: '', subject: '', message: '' };

  onSubmit(valid: boolean | null): void {
    if (!valid) return;

    this.submitting.set(true);

    /**
     * ✏️  CUSTOMIZE: Replace this timeout with your actual form submission.
     * Options:
     *  - Formspree: fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: JSON.stringify(this.form) })
     *  - EmailJS:   emailjs.send('service_id', 'template_id', this.form)
     *  - Your API:  fetch('/api/contact', { method: 'POST', ... })
     */
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 1400);
  }

  reset(): void {
    this.form = { name: '', email: '', subject: '', message: '' };
    this.submitted.set(false);
  }
}
