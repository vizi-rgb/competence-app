import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectToDescriptionKeyPipe } from '../../pipes/project-to-description-key.pipe';
import { SkillToTranslationKeyPipe } from '../../pipes/skill-to-translation-key.pipe';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [
    TranslateModule,
    ProjectToDescriptionKeyPipe,
    SkillToTranslationKeyPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss',
})
export class EmployeeProjectComponent {
  @Input({ required: true })
  project!: ProjectModel;
}
