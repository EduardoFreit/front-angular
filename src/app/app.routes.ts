import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { DevelopersComponent } from './screens/developers/developers.component';
import { ProjectsComponent } from './screens/projects/projects.component';
import { AllocationsComponent } from './screens/allocations/allocations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'developers', component: DevelopersComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'allocations', component: AllocationsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
];
