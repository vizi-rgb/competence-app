import { Technology } from '../../core/constants/technology.enum';
import { SoftSkill } from '../../core/constants/soft-skill.enum';
import { ProjectModel } from '../../features/employee/models/project.model';
import { PROJECTS } from '../../mocks/projects.mock';

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
