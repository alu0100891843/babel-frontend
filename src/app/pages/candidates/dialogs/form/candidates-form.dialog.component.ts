import { MatCardModule } from '@angular/material/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { fileSizeValidator } from '../../../../shared/form-validators/fileSize.validator';
import { fileTypeValidator } from '../../../../shared/form-validators/fileType.validator';

@Component({
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatGridListModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './candidates-form.dialog.component.html',
  styleUrl: './candidates-form.dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesFormDialogComponent {
  private readonly MAX_FILE_SIZE = 1 * 1024 * 1024;

  nameErrorMessage = '';
  surNameErrorMessage = '';
  excelFileErrorMessage = '';

  excelFileStored: File | null = null;

  // FormGroup para el formulario completo
  candidateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    surName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    excelFile: new FormControl('', [
      Validators.required,
      fileSizeValidator(this.MAX_FILE_SIZE, this.excelFileStored),
      fileTypeValidator(['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'], ['.xls', '.xlsx'], this.excelFileStored)
    ])
  });

  get formName() { return this.candidateForm.get('name') as FormControl; }
  get formSurName() { return this.candidateForm.get('surName') as FormControl; }
  get formExcelFile() { return this.candidateForm.get('excelFile') as FormControl; }

  constructor(private dialogRef: MatDialogRef<CandidatesFormDialogComponent>) {
    this.formName.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNameErrorMessage());

    this.formSurName?.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateSurNameErrorMessage());

    this.formExcelFile?.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateExcelFileErrorMessage());
  }


  handleFileInputChange(file: FileList | null): void {
    if (file?.length) {
      const f = file[0];
      this.excelFileStored = f;
      this.formExcelFile.patchValue(f.name);
      this.formExcelFile.updateValueAndValidity();
    } else {
      this.excelFileStored = null;
      this.formExcelFile.patchValue("");
      this.formExcelFile.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const formData = {
        name: this.formName.value,
        surName: this.formSurName.value,
        file: this.excelFileStored
      };
      this.dialogRef.close(formData);
    } else {
      this.candidateForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private updateNameErrorMessage() {
    if (this.formName.hasError('required')) {
      this.nameErrorMessage = 'El nombre es obligatorio';
    } else if (this.formName.hasError('minlength')) {
      this.nameErrorMessage = 'El nombre debe tener al menos 2 caracteres';
    } else if (this.formName.hasError('maxlength')) {
      this.nameErrorMessage = 'El nombre no puede tener más de 100 caracteres';
    } else {
      this.nameErrorMessage = '';
    }
  }

  private updateSurNameErrorMessage() {
    if (this.formSurName.hasError('required')) {
      this.surNameErrorMessage = 'El apellido es obligatorio';
    } else if (this.formSurName.hasError('minlength')) {
      this.surNameErrorMessage = 'El apellido debe tener al menos 2 caracteres';
    } else if (this.formSurName.hasError('maxlength')) {
      this.surNameErrorMessage = 'El apellido no puede tener más de 100 caracteres';
    } else {
      this.surNameErrorMessage = '';
    }
  }

  private updateExcelFileErrorMessage() {
    if (this.formExcelFile.hasError('required')) {
      this.excelFileErrorMessage = 'El archivo Excel es obligatorio';
    } else if (this.formExcelFile.hasError('fileTooLarge')) {
      this.excelFileErrorMessage = `El archivo no puede ser mayor a ${this.MAX_FILE_SIZE / (1024 * 1024)} MB`;
    } else if (this.formExcelFile.hasError('invalidFileType')) {
      this.excelFileErrorMessage = 'El archivo debe ser un Excel (.xls, .xlsx)';
    } else if (this.formExcelFile.hasError('invalidFileObject')) {
      this.excelFileErrorMessage = 'El archivo seleccionado no es válido';
    } else {
      this.excelFileErrorMessage = '';
    }
  }
}
