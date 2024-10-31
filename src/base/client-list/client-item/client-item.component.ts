import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseService} from '../../../shared/service/base.service';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {Client} from '../../../shared/models/client';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-client-item',
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
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.css'
})
export class ClientItemComponent extends BaseComponent<Client> implements OnInit {
  public formGroup: FormGroup;
  public object: Client = new Client();

  constructor(private http: HttpClient) {
    super(http, URLS.CLIENT);
  }

  public ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      rg: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
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
        this.goToPage('client')
      })
    }
  }
}
