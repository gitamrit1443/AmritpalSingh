import { Component } from '@angular/core';
import { CursorComponent }       from './components/cursor/cursor.component';
import { LoaderComponent }       from './components/loader/loader.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';
import { NavbarComponent }       from './components/navbar/navbar.component';
import { HeroComponent }         from './components/hero/hero.component';
import { AboutComponent }        from './components/about/about.component';
import { SkillsComponent }       from './components/skills/skills.component';
import { ProjectsComponent }     from './components/projects/projects.component';
import { ExperienceComponent }   from './components/experience/experience.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent }      from './components/contact/contact.component';
import { FooterComponent }       from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // ── Premium UX layer ────────────────────────────────────────
    CursorComponent,         // Custom magnetic cursor (desktop only, non-touch)
    LoaderComponent,         // Cinematic entrance animation (~2.3s, then removed)
    ScrollProgressComponent, // Gold progress bar along top of viewport

    // ── Page sections ───────────────────────────────────────────
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    AchievementsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <!-- Premium UX overlays (fixed-position, outside normal flow) -->
    <app-cursor />
    <app-loader />
    <app-scroll-progress />

    <!-- Navigation -->
    <app-navbar />

    <!-- Page sections -->
    <main class="overflow-x-hidden">
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-experience />
      <app-achievements />
      <app-testimonials />
      <app-contact />
    </main>

    <app-footer />
  `,
})
export class AppComponent {}
