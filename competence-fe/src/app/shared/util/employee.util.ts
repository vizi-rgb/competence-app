import { Technology } from '../../core/constants/technology.enum';
import { SoftSkill } from '../../core/constants/soft-skill.enum';
import { ProjectModel } from '../../features/employee/models/project.model';
import { PROJECTS } from '../../mocks/projects.mock';
import { TranslateService } from '@ngx-translate/core';

export interface SkillTranslation {
  skillKey: string;
  skillValue: string;
}

export const getAvailableSkills = (employeeSkills: string[]): string[] => {
  const allSkills: string[] = [
    ...Object.keys(Technology),
    ...Object.keys(SoftSkill),
  ];

  const skillsSet: Set<string> = new Set<string>(employeeSkills);

  return allSkills.filter((skill: string) => !skillsSet.has(skill));
};

export const getSkillsTranslations = (
  skills: string[],
  translate: TranslateService
): SkillTranslation[] => {
  const translation: SkillTranslation[] = [];

  skills
    .filter((skill: string) => skill in Technology)
    .forEach((skill: string) =>
      translation.push({
        skillKey: skill,
        skillValue: Technology[skill as keyof typeof Technology],
      })
    );

  skills
    .filter((skill: string) => skill in SoftSkill)
    .forEach((skillKey: string) =>
      translate
        .get(`softSkill.${skillKey.toLowerCase()}`)
        .subscribe((translatedSkill: string) =>
          translation.push({ skillKey: skillKey, skillValue: translatedSkill })
        )
    );

  return translation;
};

export const getAvailableProjects = (
  employeeProjects: ProjectModel[]
): ProjectModel[] => {
  const projectsSet: Set<ProjectModel> = new Set<ProjectModel>(
    employeeProjects
  );

  return PROJECTS.filter((project: ProjectModel) => !projectsSet.has(project));
};
