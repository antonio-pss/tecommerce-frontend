import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule,
    FormsModule,
    MatHeaderCellDef
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{
  public dataSource: Product[] = [];
  public displayedColumns: string[] = ['id', 'name', 'registration'];
  public searchName: string = '';
  public searchRegistration: string = '';

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameters()
    this.addParameters('name', this.searchName)
    this.addParameters('registration', this.searchRegistration)
    this.getAll<Product>(URLS.EMPLOYEE).subscribe({
      next: (data: Product[]) => {
        this.dataSource = data;

      },
      error: (err) => {
        console.error('Error loading products');
      }
    })
  }

  public getAll<T>(route: string): Observable<T[]> {
    const url = URLS.BASE + route
    return this.http.get<T[]>(url, this.getOptions());
  }

  public clearParameters(): void {
    this.parameters = new HttpParams();
  }

  public addParameters(key: string, value: string): void {
    this.parameters = this.parameters.set(key, value);
  }

  public getOptions(): HttpOptions {
    const httpOptions: HttpOptions = {}
    if (this.parameters) {
      httpOptions.params = this.parameters;
    }
    return httpOptions;
  }
}
