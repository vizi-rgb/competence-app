import { Pipe, PipeTransform } from '@angular/core';
import { SoftSkill } from '../../../core/constants/soft-skill.enum';
import { Technology } from '../../../core/constants/technology.enum';

@Pipe({
  name: 'skillToTranslationKey',
  standalone: true,
})
export class SkillToTranslationKeyPipe implements PipeTransform {
  transform(value: string): string {
    if (value in SoftSkill) {
      return this.format(value.toLowerCase());
    } else if (value in Technology) {
      return Technology[value as keyof typeof Technology];
    }

    return value;
  }

  private format(value: string): string {
    return `softSkill.${value}`;
  }
}
