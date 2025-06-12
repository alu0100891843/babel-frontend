import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fileSizeValidator(max_file_size: number, selectedFile: File | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!selectedFile) {
      return null;
    }

    if (selectedFile.size > max_file_size) {
      return { 'fileTooLarge': true };
    }

    return null;
  }
  }
