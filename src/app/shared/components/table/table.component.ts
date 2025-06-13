import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatTooltipModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  public tableDefinition!: TableDefinitionType;
  @Input()
  public data!: T[] | null;
  @Output()
  public addAction = new EventEmitter<void>();

  public dataSource = new MatTableDataSource<T>([]);
  public displayedColumns!: string[];
  public componentInitialized = false;

  ngOnInit() {
    this.displayedColumns = this.tableDefinition.columns.map(x => x.key);
    this.updateDataSource();
    this.componentInitialized = true;
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    if (data && data.currentValue !== data.previousValue) {
      this.updateDataSource();
    }
  }

  onAddButtonClick(): void {
    this.addAction.emit();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private updateDataSource() {
    this.dataSource.data = this.data as T[] || [];
  }
}
