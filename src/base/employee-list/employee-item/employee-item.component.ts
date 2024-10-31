import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseService} from '../../../shared/service/base.service';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {Employee} from '../../../shared/models/employee';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-employee-item',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-item.component.html',
  styleUrl: './employee-item.component.css'
})
export class EmployeeItemComponent extends BaseComponent<Employee> implements OnInit {
  public formGroup: FormGroup;
  public object: Employee = new Employee();

  constructor(private http: HttpClient) {
    super(http, URLS.EMPLOYEE);
  }

  public ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      registration: new FormControl('', Validators.required),
    })
  }

  public saveOrUpdate(): void {
    if (this.formGroup.valid) {
      Object.keys(this.formGroup.getRawValue()).forEach((key: string) => {
        const value = this.formGroup.getRawValue()[key];
        if (value !== null && value !== undefined) {
          this.object[key] = value;
        }
      })
      this.service.save(this.object).subscribe((response) => {
        this.goToPage('employee')
      })
    }
  }
}
