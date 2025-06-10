import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
})
export class TableComponent<T> implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Input()
  public tableDefinition!: TableDefinitionType;
  @Input()
  public data!: T[];

  public dataSource!: MatTableDataSource<T>;
  public displayedColumns!: string[];

  ngOnInit() {
    this.displayedColumns = this.tableDefinition.columns.map(x => x.key);
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<T>(this.data);
    this.dataSource.paginator = this.paginator;
  }
}
