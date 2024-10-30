import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
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
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BaseService} from '../../shared/service/base.service';
import {NavigationExtras, Router} from '@angular/router';
import {Client} from '../../shared/models/client';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-client-list',
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
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  public dataSource: Client[] = [];
  public displayedColumns: string[] = ['id', 'name', 'age', 'rg', 'cpf', 'actions'];
  public searchName: string = '';
  public searchCpfSW: string = '';

  private router: Router = new Router();
  private service: BaseService<Client>

  constructor(private http: HttpClient) {
    this.service = new BaseService<Client>(http, URLS.CLIENT)
  }

  public ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter()
    this.service.addParameter('name', this.searchName)
    this.service.addParameter('cpf_sw', this.searchCpfSW)
    this.service.getAll().subscribe({
      next: (data: Client[]) => {
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
