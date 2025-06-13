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
import { FormValidatorMessagerService } from '../../../../shared/form-validators/service/formValidatorMessager.service';

@Component({
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatGridListModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [FormValidatorMessagerService],
  templateUrl: './candidates-form.dialog.component.html',
  styleUrl: './candidates-form.dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesFormDialogComponent {
  private readonly MAX_FILE_SIZE = 1 * 1024 * 1024;

  nameErrorMessage = '';
  surnameErrorMessage = '';
  excelFileErrorMessage = '';

  candidateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    excelFile: new FormControl('', [
      Validators.required,
      fileSizeValidator(this.MAX_FILE_SIZE),
      fileTypeValidator(['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'], ['.xls', '.xlsx'])
    ])
  });

  get formName() { return this.candidateForm.get('name') as FormControl; }
  get formSurname() { return this.candidateForm.get('surname') as FormControl; }
  get formExcelFile() { return this.candidateForm.get('excelFile') as FormControl; }

  constructor(private dialogRef: MatDialogRef<CandidatesFormDialogComponent>, private messagerService: FormValidatorMessagerService) {
    this.formName.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.nameErrorMessage = this.messagerService.getErrorMessage(this.formName!, 'El nombre')
      );

    this.formSurname?.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.surnameErrorMessage = this.messagerService.getErrorMessage(this.formSurname!, 'El apellido')
      );

    this.formExcelFile?.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.excelFileErrorMessage = this.messagerService.getErrorMessage(this.formExcelFile!, 'El fichero Excel')
      );
  }

  handleFileInputChange(file: FileList | null): void {
    this.formExcelFile.markAsTouched();
    if (file?.length) {
      const f = file[0];
      this.formExcelFile.patchValue(f);
      this.formExcelFile.updateValueAndValidity();
    } else {
      this.formExcelFile.patchValue(null);
      this.formExcelFile.setErrors({ required: true });
      this.formExcelFile.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const formData = {
        name: this.formName.value,
        surname: this.formSurname.value,
        excelFile: this.formExcelFile.value instanceof File ? this.formExcelFile.value : null
      };
      this.dialogRef.close(formData);
    } else {
      this.candidateForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
