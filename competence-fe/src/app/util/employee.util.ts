import { Technology } from '../constants/technology.enum';
import { SoftSkill } from '../constants/soft-skill.enum';
import { AbstractControl } from '@angular/forms';
import { ProjectModel } from '../models/project.model';
import { PROJECTS } from '../mocks/projects.mock';

export const getAvailableSkills = (employeeSkills: string[]): string[] => {
  const allSkills: string[] = [
    ...Object.values(Technology),
    ...Object.values(SoftSkill),
  ];

  const skillsSet: Set<string> = new Set<string>(employeeSkills);

  return allSkills
    .filter((skill: string) => !skillsSet.has(skill))
    .sort((a: string, b: string) => a.localeCompare(b));
};

export const getAvailableProjects = (
  employeeProjects: ProjectModel[]
): ProjectModel[] => {
  const projectsSet: Set<ProjectModel> = new Set<ProjectModel>(
    employeeProjects
  );

  return PROJECTS.filter(
    (project: ProjectModel) => !projectsSet.has(project)
  ).sort((a: ProjectModel, b: ProjectModel) => a.title.localeCompare(b.title));
};

export const isMissing = (field: AbstractControl | null): boolean =>
  (field?.invalid && field?.hasError('required')) ?? false;

export const isModifiedAndInvalid = (field: AbstractControl | null): boolean =>
  (field?.invalid && (field?.dirty || field?.touched)) ?? false;

export const getValueFromHtmlSelect = (event: Event): string => {
  const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
  return selectElement.value;
};
