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
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';
import {Employee} from '../../shared/models/employee';

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
    MatIcon
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  public dataSource: Employee[] = [];
  public displayedColumns: string[] = ['id', 'name', 'registration'];
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
}
