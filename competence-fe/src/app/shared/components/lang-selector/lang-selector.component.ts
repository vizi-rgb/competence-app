import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { DateAdapter } from '@angular/material/core';

import 'moment/locale/pl.js';

@Component({
  selector: 'app-lang-selector',
  standalone: true,
  imports: [UpperCasePipe, MatButton, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.scss',
})
export class LangSelectorComponent {
  languages: string[];
  selectedLanguage: string;

  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<unknown>
  ) {
    this.languages = this.translate.getLangs();
    this.selectedLanguage = this.translate.currentLang;
    this.dateAdapter.setLocale(this.selectedLanguage);
  }

  onLangChange(language: string): void {
    if (this.languages.includes(language)) {
      this.selectedLanguage = language;
    }

    this.translate.use(this.selectedLanguage);
    this.dateAdapter.setLocale(this.selectedLanguage);
  }
}
