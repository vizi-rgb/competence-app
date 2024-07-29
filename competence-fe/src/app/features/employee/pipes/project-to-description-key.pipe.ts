import { Pipe, PipeTransform } from '@angular/core';
import { ProjectModel } from '../models/project.model';

@Pipe({
  name: 'projectToDescriptionKey',
  standalone: true,
})
export class ProjectToDescriptionKeyPipe implements PipeTransform {
  transform(value: ProjectModel): string {
    const projectTitle: string = value.title;
    return this.format(projectTitle.toLowerCase());
  }

  private format(value: string) {
    return `project.${value}.description`;
  }
}
