import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fileTypeValidator(allowedTypes: string[], allowedExtensions: string[]): ValidatorFn {
  const lowerCaseAllowedExtensions = allowedExtensions.map(ext => ext.toLowerCase());

  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) {
      return null;
    }

    if (!(file instanceof File)) {
      return { 'invalidFileObject': true };
    }

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    const hasValidType = allowedTypes.includes(fileType);
    const hasValidExtension = lowerCaseAllowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidType && !hasValidExtension) {
      return { 'invalidFileType': true };
    }
    return null;
  };
}
