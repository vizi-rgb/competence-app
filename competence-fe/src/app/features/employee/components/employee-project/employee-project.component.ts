import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectToDescriptionKeyPipe } from '../../pipes/project-to-description-key.pipe';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [TranslateModule, ProjectToDescriptionKeyPipe],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss',
})
export class EmployeeProjectComponent {
  @Input({ required: true })
  project!: ProjectModel;
}
