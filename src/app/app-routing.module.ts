import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertiseComponent } from 'src/components/expertise/expertise.component';
import { AllProjectsComponent } from 'src/components/all-projects/all-projects.component';
import { HomeComponent } from 'src/components/home/home.component';
import { ProjectDetailsComponent } from 'src/components/project-details/project-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
