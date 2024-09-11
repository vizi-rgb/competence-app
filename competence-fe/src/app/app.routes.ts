import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './features/employee/pages/employee-dashboard/employee-dashboard.component';
import { EMPLOYEE_ROUTE } from './core/constants/employee-route';
import { AUTH_ROUTE } from './core/constants/auth-route';
import { authGuard } from './core/auth/guards/auth.guard';
import { authWithRedirectGuard } from './core/auth/guards/auth-with-redirect.guard';

export const routes: Routes = [
  {
    path: EMPLOYEE_ROUTE.DASHBOARD,
    component: EmployeeDashboardComponent,
    canActivate: [authWithRedirectGuard],
  },
  {
    path: EMPLOYEE_ROUTE.LIST,
    loadComponent: () =>
      import(
        './features/employee/pages/employee-list/employee-list.component'
      ).then((m) => m.EmployeeListComponent),
    canActivate: [authGuard],
  },
  {
    path: EMPLOYEE_ROUTE.ADD,
    loadComponent: () =>
      import(
        './features/employee/pages/employee-form/employee-form.component'
      ).then((m) => m.EmployeeFormComponent),
    canActivate: [authGuard],
  },
  {
    path: EMPLOYEE_ROUTE.DETAILS + '/:id',
    loadComponent: () =>
      import(
        './features/employee/pages/employee-details/employee-details.component'
      ).then((m) => m.EmployeeDetailsComponent),
    canActivate: [authGuard],
  },
  {
    path: EMPLOYEE_ROUTE.EDIT + '/:id',
    loadComponent: () =>
      import(
        './features/employee/pages/employee-form/employee-form.component'
      ).then((m) => m.EmployeeFormComponent),
    canActivate: [authGuard],
  },
  {
    path: AUTH_ROUTE.LOGIN,
    loadComponent: () =>
      import('./core/auth/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: EMPLOYEE_ROUTE.DASHBOARD,
  },
];
