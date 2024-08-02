import { Component } from '@angular/core';
import { LangSelectorComponent } from '../../../shared/components/lang-selector/lang-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageComponent } from '../../../shared/components/message/message.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, MessageComponent, LangSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
