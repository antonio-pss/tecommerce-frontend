import { Routes } from '@angular/router';
import {ProductListComponent} from '../base/product-list/product-list.component';
import {ClientListComponent} from '../base/client-list/client-list.component';
import {EmployeeListComponent} from '../base/employee-list/employee-list.component';
import {SaleListComponent} from '../base/sale-list/sale-list.component';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductListComponent,
  },
  {
    path: 'client',
    component: ClientListComponent,
  },
  {
    path: 'employee',
    component: EmployeeListComponent
  },
  {
    path: 'sale',
    component: SaleListComponent
  }
];
