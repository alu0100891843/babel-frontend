import { CandidatesService } from './../services/candidates.service';
import { Component } from '@angular/core';
import { CandidatesComponent } from "./pages/candidates/candidates.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CandidatesComponent, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule],
  providers: [CandidatesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'babel-frontend';
}
