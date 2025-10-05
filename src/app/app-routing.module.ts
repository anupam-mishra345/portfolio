import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeV2Component } from 'src/components/home-v2/home-v2.component';
import { AboutMeV2Component } from 'src/components/about-me-v2/about-me-v2.component';
import { AllProjectsV3Component } from 'src/components/all-projects-v3/all-projects-v3.component';
import { TechstackV3Component } from 'src/components/techstack-v3/techstack-v3.component';
import { ProjectDetailsV2Component } from 'src/components/project-details-v2/project-details-v2.component';
import { AboutMeV3Component } from 'src/components/about-me-v3/about-me-v3.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeV2Component },
  {
    path: 'all-projects',
    component: AllProjectsV3Component,
  },
  {
    path: 'techstack',
    component: TechstackV3Component,
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsV2Component,
  },
  {
    path: 'about-me',
    component: AboutMeV3Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
