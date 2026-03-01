import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { RoleGuard } from './guards/role.guard';
import { DevelopersComponent } from './screens/developers/developers.component';
import { CreateDeveloperComponent } from './screens/developers/create-developer/create-developer.component';
import { EditarDeveloperComponent } from './screens/developers/edit-developer/edit-developer.component';
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
      {
        path: 'developers',
        component: DevelopersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'developers/create',
        component: CreateDeveloperComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'developers/:id/edit',
        component: EditarDeveloperComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'allocations',
        component: AllocationsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
