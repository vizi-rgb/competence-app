import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './features/employee/components/employee-list/employee-list.component';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './core/layout/header/header.component';
import { MessageComponent } from './shared/components/message/message.component';
import { MatButton } from '@angular/material/button';

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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.use(this.translate.defaultLang);
  }
}
