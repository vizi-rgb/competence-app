import { AbstractControl } from '@angular/forms';

export const isMissing = (field: AbstractControl | null): boolean =>
  (field?.invalid && field?.hasError('required')) ?? false;

export const isModifiedAndInvalid = (field: AbstractControl | null): boolean =>
  (field?.invalid && (field?.dirty || field?.touched)) ?? false;
