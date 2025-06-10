import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/candidate/candidate';
import { TableComponent, TableDefinitionType } from "../../shared/table/table.component";

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit {
  public candidateList: Candidate[] = [];
  public tableDefinition: TableDefinitionType = {
    title: 'Candidatos',
    columns: [
      { key: 'name', label: 'Nombre', type: 'text' },
      { key: 'surname', label: 'Apellido', type: 'text' },
      { key: 'seniority', label: 'Experticia', type: 'text' },
      { key: 'years', label: 'Años de experiencia', type: 'number' },
      { key: 'availability', label: 'Disponible', type: 'boolean' }
    ]
  };

  constructor(
  ) { }

  ngOnInit(): void {
    this.candidateList = [
      Candidate.create('Juan', 'Pérez', 'junior', 1, true),
      Candidate.create('María', 'García', 'junior', 2, true),
      Candidate.create('Carlos', 'López', 'junior', 3, true),
      Candidate.create('Ana', 'Martínez', 'junior', 4, true),
      Candidate.create('Pedro', 'Sánchez', 'junior', 5, true),
      Candidate.create('Paco', 'Pérez', 'senior', 6, false)
    ];
  }
}
