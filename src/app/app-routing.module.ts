import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertiseComponent } from 'src/components/expertise/expertise.component';
import { AllProjectsComponent } from 'src/components/all-projects/all-projects.component';
import { HomeComponent } from 'src/components/home/home.component';
import { ProjectDetailsComponent } from 'src/components/project-details/project-details.component';
import { HomeV2Component } from 'src/components/home-v2/home-v2.component';
import { AboutMeV2Component } from 'src/components/about-me-v2/about-me-v2.component';
import { AllProjectsV3Component } from 'src/components/all-projects-v3/all-projects-v3.component';
import { TechstackV3Component } from 'src/components/techstack-v3/techstack-v3.component';
import { ProjectDetailsV2Component } from 'src/components/project-details-v2/project-details-v2.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-v2', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'expertise', component: ExpertiseComponent },
  {
    path: 'all-projects',
    component: AllProjectsComponent,
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
  },
  { path: 'home-v2', component: HomeV2Component },
  {
    path: 'all-projects-v3',
    component: AllProjectsV3Component,
  },
  {
    path: 'techstack-v3',
    component: TechstackV3Component,
  },
  {
    path: 'project-details-v2/:id',
    component: ProjectDetailsV2Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
