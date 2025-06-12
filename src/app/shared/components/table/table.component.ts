import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export interface TableDefinitionType {
  title: string;
  columns: {
    key: string;
    label: string;
    type: "number" | "boolean" | "text" | "date";
  }[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [MatTableModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatPaginatorModule, MatIconModule, CommonModule],
})
export class TableComponent<T> implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Input()
  public tableDefinition!: TableDefinitionType;
  @Input()
  public data!: T[] | null;
  @Output()
  public addAction = new EventEmitter<void>();

  public dataSource!: MatTableDataSource<T>;
  public displayedColumns!: string[];

  ngOnInit() {
    this.displayedColumns = this.tableDefinition.columns.map(x => x.key);
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<T>(this.data as T[] || []);
    this.dataSource.paginator = this.paginator;
  }

  onAddButtonClick(): void {
    this.addAction.emit();
  }
}
