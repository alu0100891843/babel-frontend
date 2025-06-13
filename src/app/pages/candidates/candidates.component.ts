import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CandidatesService } from '../../../services/candidates.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Candidate } from '../../../models/candidate/candidate';
import { CandidatesFormDialogComponent } from './dialogs/form/candidates-form.dialog.component';
import { TableComponent, TableDefinitionType } from '../../shared/components/table/table.component';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackNofifyService } from '../../shared/form-validators/service/snackNotify.service';
@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, TableComponent, AsyncPipe],
  providers: [SnackNofifyService],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnDestroy {
  public candidateList$: Observable<Candidate[]> = this.candidatesService.candidates$;
  private destroy$ = new Subject<void>();

  public tableDefinition: TableDefinitionType = {
    title: 'Listado de candidatos',
    columns: [
      { key: 'name', label: 'Nombre', type: 'text' },
      { key: 'surname', label: 'Apellido', type: 'text' },
      { key: 'seniority', label: 'Nivel', type: 'text' },
      { key: 'experience', label: 'Años de experiencia', type: 'number' },
      { key: 'availability', label: 'Disponible', type: 'boolean' }
    ]
  };

  constructor(
    private dialog: MatDialog,
    private candidatesService: CandidatesService,
    private snackBar: SnackNofifyService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addCandidate(): void {
    const dialogRef = this.dialog.open(CandidatesFormDialogComponent, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.candidatesService.createCandidate(result)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.snackBar.showSuccess('Candidato creado exitosamente');
              },
              error: (errResponse) => {
                this.snackBar.showError('Error al crear el candidato: ' + errResponse?.error?.message || 'Error desconocido');
              }
            });
        }
      });
  }
}
