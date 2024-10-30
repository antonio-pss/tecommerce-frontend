import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {URLS} from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {NavigationExtras, Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';
import {elementAt} from 'rxjs';


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
    MatLabel,
    MatHeaderCellDef,
    MatIconModule,
    MatFabButton,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns: string[] = ['id', 'description', 'quantity', 'actions'];
  public searchValue: string = '';
  public searchQtd: string = '';

  private router: Router = new Router();
  private service: BaseService<Product>

  constructor(private http: HttpClient) {
    this.service = new BaseService<Product>(http, URLS.PRODUCT)
  }

  public ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter()
    this.service.addParameter('description', this.searchValue)
    this.service.addParameter('quantity', this.searchQtd)
    this.service.getAll().subscribe({
      next: (data: Product[]) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Error loading products');
      }
    })
  }

  public deleteObject(id: number): void {
    this.service.delete(id).subscribe({
      next: (data: Product[]) => {
        this.search();
      },
      error: (_) => {
        console.error('Error deleting products');
      }
    })
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras = {queryParamsHandling: 'merge'};
    this.router.navigate([route], extras).then();
  }
}
