import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackNofifyService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };

    this.snackBar.open(message, 'Cerrar', config);
  }

  showError(message: string, duration: number = 5000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };

    this.snackBar.open(message, 'Cerrar', config);
  }
}
