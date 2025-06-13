import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fileSizeValidator(max_file_size: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) {
      return null;
    }

    if (file.size > max_file_size) {
      return { fileTooLarge: { actualSize: file.size, maxSize: max_file_size } };
    }

    return null;
  }
  }
