import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LangSelectorComponent } from '../../../shared/components/lang-selector/lang-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageComponent } from '../../../shared/components/message/message.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import * as EMPLOYEE_ROUTE from '../../constants/employee-route';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslateModule,
    MessageComponent,
    LangSelectorComponent,
    RouterLink,
    MatButton,
    MatAnchor,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;
}
