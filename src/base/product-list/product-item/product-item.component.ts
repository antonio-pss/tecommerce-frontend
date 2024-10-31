import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {BaseComponent} from '../../base.component';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';

@Component({
  selector: 'app-product-item',
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
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent extends BaseComponent<Product> implements OnInit {
  public formGroup: FormGroup;
  public object: Product = new Product();

  constructor(private http: HttpClient) {
    super(http, URLS.PRODUCT);
  }

  public ngOnInit() {
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
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
        this.goToPage('product')
      })
    }
  }
}
