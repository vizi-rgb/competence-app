import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './features/employee/pages/employee-details/employee-details.component';
import { EmployeeListComponent } from './features/employee/pages/employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './features/employee/pages/employee-dashboard/employee-dashboard.component';
import * as EMPLOYEE_ROUTE from './core/constants/employee-route';
import { EmployeeFormComponent } from './features/employee/pages/employee-form/employee-form.component';

export const routes: Routes = [
  { path: EMPLOYEE_ROUTE.DASHBOARD, component: EmployeeDashboardComponent },
  {
    path: EMPLOYEE_ROUTE.LIST,
    component: EmployeeListComponent,
  },
  {
    path: EMPLOYEE_ROUTE.ADD,
    component: EmployeeFormComponent,
  },
  {
    path: EMPLOYEE_ROUTE.DETAILS + '/:id',
    component: EmployeeDetailsComponent,
  },
  {
    path: EMPLOYEE_ROUTE.EDIT + '/:id',
    component: EmployeeFormComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: EMPLOYEE_ROUTE.DASHBOARD },
];
