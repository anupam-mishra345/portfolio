import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { HomeComponent } from 'src/components/home/home.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { ContactMeComponent } from 'src/components/contact-me/contact-me.component';
import { AllProjectsComponent } from 'src/components/all-projects/all-projects.component';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from 'src/components/project-card/project-card.component';
import { ProjectDetailsComponent } from 'src/components/project-details/project-details.component';
import { ExpertiseComponent } from 'src/components/expertise/expertise.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SkillSetComponent } from 'src/components/skill-set/skill-set.component';
import { HomeV2Component } from 'src/components/home-v2/home-v2.component';
import { AboutMeV2Component } from 'src/components/about-me-v2/about-me-v2.component';
import { TestimonialsV2Component } from 'src/components/testimonials-v2/testimonials-v2.component';
import { TechstackV2Component } from 'src/components/techstack-v2/techstack-v2.component';
import { AllProjectsV2Component } from 'src/components/all-projects-v2/all-projects-v2.component';
import { AllProjectsV3Component } from 'src/components/all-projects-v3/all-projects-v3.component';
import { ProjectsClientV2Component } from 'src/components/projects-client-v2/projects-client-v2.component';
import { NavbarV2Component } from 'src/components/navbar-v2/navbar-v2.component';
import { TechstackV3Component } from 'src/components/techstack-v3/techstack-v3.component';
import { ProjectDetailsV2Component } from 'src/components/project-details-v2/project-details-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpertiseComponent,
    FooterComponent,
    NavbarComponent,
    ContactMeComponent,
    AllProjectsComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    SkillSetComponent,
    HomeV2Component,
    AboutMeV2Component,
    TestimonialsV2Component,
    TechstackV2Component,
    AllProjectsV2Component,
    AllProjectsV3Component,
    ProjectsClientV2Component,
    NavbarV2Component,
    TechstackV3Component,
    ProjectDetailsV2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
