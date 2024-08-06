import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './features/employee/pages/employee-dashboard/employee-dashboard.component';
import * as EMPLOYEE_ROUTE from './core/constants/employee-route';

export const routes: Routes = [
  { path: EMPLOYEE_ROUTE.DASHBOARD, component: EmployeeDashboardComponent },
  {
    path: EMPLOYEE_ROUTE.LIST,
    loadComponent: () =>
      import(
        './features/employee/pages/employee-list/employee-list.component'
      ).then((m) => m.EmployeeListComponent),
  },
  {
    path: EMPLOYEE_ROUTE.ADD,
    loadComponent: () =>
      import(
        './features/employee/pages/employee-form/employee-form.component'
      ).then((m) => m.EmployeeFormComponent),
  },
  {
    path: EMPLOYEE_ROUTE.DETAILS + '/:id',
    loadComponent: () =>
      import(
        './features/employee/pages/employee-details/employee-details.component'
      ).then((m) => m.EmployeeDetailsComponent),
  },
  {
    path: EMPLOYEE_ROUTE.EDIT + '/:id',
    loadComponent: () =>
      import(
        './features/employee/pages/employee-form/employee-form.component'
      ).then((m) => m.EmployeeFormComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: EMPLOYEE_ROUTE.DASHBOARD },
];
