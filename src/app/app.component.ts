import { CandidatesService } from './../services/candidates.service';
import { Component } from '@angular/core';
import { CandidatesComponent } from "./pages/candidates/candidates.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CandidatesComponent],
  providers: [CandidatesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'babel-frontend';
}
