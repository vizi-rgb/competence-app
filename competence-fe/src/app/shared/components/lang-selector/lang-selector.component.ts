import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lang-selector',
  standalone: true,
  imports: [UpperCasePipe, FormsModule],
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

  onLangChange(): void {
    this.translate.use(this.selectedLanguage);
    console.log(this.selectedLanguage);
  }
}
