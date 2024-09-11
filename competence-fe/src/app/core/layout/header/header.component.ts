import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LangSelectorComponent } from '../../../shared/components/lang-selector/lang-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageComponent } from '../../../shared/components/message/message.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { EMPLOYEE_ROUTE } from '../../constants/employee-route';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AUTH_ROUTE } from '../../constants/auth-route';

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
    MatIconButton,
    MatIcon,
    AsyncPipe,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;
  protected readonly AUTH_ROUTE = AUTH_ROUTE;

  constructor(public auth: AuthService) {}

  onLogout() {
    this.auth.logout();
  }
}
