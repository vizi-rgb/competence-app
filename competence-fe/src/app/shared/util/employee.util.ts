import {
  Technology,
  TechnologyKey,
} from '../../core/constants/technology.enum';
import { SoftSkill, SoftSkillKey } from '../../core/constants/soft-skill.enum';
import { ProjectModel } from '../../features/employee/models/project.model';
import { TranslateService } from '@ngx-translate/core';

export interface SkillTranslation {
  skillKey: string;
  skillValue: string;
}

export const getAvailableSkills = (
  allSkillsKeys: (SoftSkillKey | TechnologyKey)[],
  employeeSkillsKeys: (SoftSkillKey | TechnologyKey)[]
): (SoftSkillKey | TechnologyKey)[] => {
  const skillsSet: Set<string> = new Set<string>(employeeSkillsKeys);

  return allSkillsKeys.filter((skill: string) => !skillsSet.has(skill));
};

export const getSkillsTranslations = (
  skillsKeys: (SoftSkillKey | TechnologyKey)[],
  translate: TranslateService
): SkillTranslation[] => {
  const translation: SkillTranslation[] = [];

  skillsKeys
    .filter((skill: string) => skill in Technology)
    .forEach((skill: string) =>
      translation.push({
        skillKey: skill,
        skillValue: Technology[skill as keyof typeof Technology],
      })
    );

  skillsKeys
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

export const getAvailableSkillsSorted = (
  allSkillsKeys: (SoftSkillKey | TechnologyKey)[],
  employeeSkillsKeys: (SoftSkillKey | TechnologyKey)[],
  translate: TranslateService
): SkillTranslation[] => {
  const availableSkills: (SoftSkillKey | TechnologyKey)[] = getAvailableSkills(
    allSkillsKeys,
    employeeSkillsKeys
  );

  return getSkillsTranslations(availableSkills, translate).sort(
    (a: SkillTranslation, b: SkillTranslation) =>
      a.skillValue.localeCompare(b.skillValue)
  );
};

export const getAvailableProjects = (
  allProjects: ProjectModel[],
  employeeProjects: ProjectModel[]
): ProjectModel[] => {
  const projectsSet: Set<ProjectModel> = new Set<ProjectModel>(
    employeeProjects
  );

  return allProjects.filter(
    (project: ProjectModel) => !projectsSet.has(project)
  );
};

export const getAvailableProjectsSorted = (
  allProjects: ProjectModel[],
  employeeProjects: ProjectModel[]
): ProjectModel[] => {
  return getAvailableProjects(allProjects, employeeProjects).sort(
    (a: ProjectModel, b: ProjectModel) => a.title.localeCompare(b.title)
  );
};
