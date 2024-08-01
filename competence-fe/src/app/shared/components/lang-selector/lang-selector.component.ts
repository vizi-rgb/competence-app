import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

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

  constructor(private translate: TranslateService) {
    this.languages = this.translate.getLangs();
    this.selectedLanguage = this.translate.currentLang;
  }

  onLangChange(language: string): void {
    if (this.languages.includes(language)) {
      this.selectedLanguage = language;
    }

    this.translate.use(this.selectedLanguage);
  }
}
