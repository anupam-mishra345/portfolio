import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { FooterV2Component } from 'src/components/footer-v2/footer-v2.component';
import { AboutMeV3Component } from 'src/components/about-me-v3/about-me-v3.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCardV2Component } from 'src/components/project-card-v2/project-card-v2.component';
import { ClientProjectCardComponent } from 'src/components/client-project-card/client-project-card.component';
import { TechnologyCompComponent } from 'src/reusable/technology-comp/technology-comp.component';
import { ContactUsFormComponent } from 'src/components/contact-us-form/contact-us-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessPopupComponent } from 'src/reusable/success-popup/success-popup.component';

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
    FooterV2Component,
    AboutMeV3Component,
    ProjectCardV2Component,
    ClientProjectCardComponent,
    TechnologyCompComponent,
    ContactUsFormComponent,
    SuccessPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CanvasJSAngularChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
