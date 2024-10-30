import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';
import {Sale} from '../../shared/models/sale';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-sale-list',
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
    MatHeaderCellDef,
    MatFabButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.css'
})
export class SaleListComponent implements OnInit {
  public dataSource: Sale[] = [];
  public displayedColumns: string[] = ['id', 'nrf', 'id_client', 'id_employee', 'id_product', 'actions'];
  public searchNRF: string = '';
  public searchIdClient: string = '';

  private router: Router = new Router();
  private service: BaseService<Sale>

  constructor(private http: HttpClient) {
    this.service = new BaseService<Sale>(http, URLS.SALE)
  }

  public ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter()
    this.service.addParameter('nrf', this.searchNRF)
    this.service.addParameter('id_client', this.searchIdClient)
    this.service.getAll().subscribe({
      next: (data: Sale[]) => {
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

