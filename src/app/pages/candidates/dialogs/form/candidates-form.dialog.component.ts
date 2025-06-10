import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './candidates-form.dialog.component.html',
  styleUrl: './candidates-form.dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesFormDialogComponent {

}
