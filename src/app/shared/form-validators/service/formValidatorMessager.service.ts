import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorMessagerService {
  private readonly errorMessages: Record<string, (error: any) => string> = {
    required: () => 'Este campo es obligatorio',
    minlength: (error) => `Mínimo ${error.requiredLength} caracteres`,
    maxlength: (error) => `Máximo ${error.requiredLength} caracteres`,
    fileTooLarge: (error) => `El archivo no puede ser mayor a ${(error.maxSize / (1024 * 1024)).toFixed(1)} MB`,
    invalidFileType: () => 'El archivo debe ser un Excel (.xls, .xlsx)',
    invalidFileObject: () => 'El archivo seleccionado no es válido'
  };

  getErrorMessage(control: AbstractControl, fieldName?: string): string {
    if (!control.errors || !control.touched) {
      return '';
    }

    const firstErrorKey = Object.keys(control.errors)[0];
    const errorValue = control.errors[firstErrorKey];

    if (this.errorMessages[firstErrorKey]) {
      let message = this.errorMessages[firstErrorKey](errorValue);

      if (fieldName && firstErrorKey === 'required') {
        message = `${fieldName} es obligatorio`;
      }

      return message;
    }

    return 'Campo inválido';
  }
}
