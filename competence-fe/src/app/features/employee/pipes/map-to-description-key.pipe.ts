import { Pipe, PipeTransform } from '@angular/core';
import { ProjectModel } from '../models/project.model';

@Pipe({
  name: 'projectToDescriptionKey',
  standalone: true,
})
export class ProjectToDescriptionKeyPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: ProjectModel, ...args: unknown[]): string {
    const projectTitle: string = value.title;
    return this.format(projectTitle.toLowerCase());
  }

  private format(value: string) {
    return `project.${value}.description`;
  }
}
