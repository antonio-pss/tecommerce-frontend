import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {Observable} from 'rxjs';
import {URLS} from '../../shared/urls';
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
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {HttpOptions} from '../../shared/http/http-options';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatInput,
    MatFormField,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatHeaderCellDef,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  public dataSource: Product[] = [];
  public displayedColumns: string[] = ['id', 'description', 'quantity'];
  public searchValue: string = '';
  public searchQtd: string = '';

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameters()
    this.addParameters('description', this.searchValue)
    this.addParameters('quantity', this.searchQtd)
    this.getAll<Product>(URLS.PRODUCT).subscribe({
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
