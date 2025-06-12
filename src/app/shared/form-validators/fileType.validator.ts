import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fileTypeValidator(allowedTypes: string[], allowedExtensions: string[], excelFileStored: File | null): ValidatorFn {
  const lowerCaseAllowedExtensions = allowedExtensions.map(ext => ext.toLowerCase());

  return (control: AbstractControl): ValidationErrors | null => {
    if (!excelFileStored) {
      return null;
    }

    if (!(excelFileStored instanceof File)) {
      return { 'invalidFileObject': true };
    }

    const fileType = excelFileStored.type;
    const fileName = excelFileStored.name.toLowerCase();

    const hasValidType = allowedTypes.includes(fileType);
    const hasValidExtension = lowerCaseAllowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidType && !hasValidExtension) {
      return { 'invalidFileType': true };
    }
    return null;
  };
}
