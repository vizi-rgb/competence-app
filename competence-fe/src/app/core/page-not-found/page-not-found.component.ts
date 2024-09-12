import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { EMPLOYEE_ROUTE } from '../constants/employee-route';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink, MatButton, TranslateModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('void => *', [animate('600ms ease-in-out')]),
    ]),
  ],
})
export class PageNotFoundComponent {
  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;
}
