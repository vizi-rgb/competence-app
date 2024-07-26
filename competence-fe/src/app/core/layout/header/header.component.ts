import { Component } from '@angular/core';
import { LangSelectorComponent } from '../../../shared/components/lang-selector/lang-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LangSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
