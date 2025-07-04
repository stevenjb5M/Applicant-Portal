import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ApplicationDetailComponent } from './components/application-detail/application-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'applications', component: ApplicationListComponent },
  { path: 'applications/new', component: ApplicationFormComponent },
  { path: 'applications/:id', component: ApplicationDetailComponent },
  { path: 'applications/:id/edit', component: ApplicationFormComponent },
  { path: '**', redirectTo: '' }
];
