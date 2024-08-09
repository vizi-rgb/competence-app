import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './features/employee/pages/employee-list/employee-list.component';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './core/layout/header/header.component';
import { MessageComponent } from './shared/components/message/message.component';
import { MatButton } from '@angular/material/button';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EmployeeListComponent,
    HeaderComponent,
    MessageComponent,
    MatButton,
  ],
  providers: [provideMomentDateAdapter()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.use(this.translate.defaultLang);
  }
}
