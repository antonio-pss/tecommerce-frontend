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
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NavigationExtras, Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';
import {Employee} from '../../shared/models/employee';
import {Product} from '../../shared/models/product';

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
    MatHeaderCellDef,
    MatFabButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  public dataSource: Employee[] = [];
  public displayedColumns: string[] = ['id', 'name', 'registration', 'actions'];
  public searchName: string = '';
  public searchRegistration: string = '';

  private router: Router = new Router();
  private service: BaseService<Employee>

  constructor(private http: HttpClient) {
    this.service = new BaseService<Employee>(http, URLS.EMPLOYEE)
  }


  public ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter()
    this.service.addParameter('name', this.searchName)
    this.service.addParameter('registration', this.searchRegistration)
    this.service.getAll().subscribe({
      next: (data: Employee[]) => {
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
