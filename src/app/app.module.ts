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
