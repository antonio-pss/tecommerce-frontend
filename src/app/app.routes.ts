import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from '../base/product-list/product-list.component';
import {ClientListComponent} from '../base/client-list/client-list.component';
import {EmployeeListComponent} from '../base/employee-list/employee-list.component';
import {SaleListComponent} from '../base/sale-list/sale-list.component';
import {ProductItemComponent} from '../base/product-list/product-item/product-item.component';
import {ClientItemComponent} from '../base/client-list/client-item/client-item.component';
import {EmployeeItemComponent} from '../base/employee-list/employee-item/employee-item.component';
import {SaleItemComponent} from '../base/sale-list/sale-item/sale-item.component';
import { GamePageComponent } from '../base/game-page/game-page.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductListComponent,
  },
  {
    path: 'product/:action',
    component: ProductItemComponent,
  },
  {
    path: 'client',
    component: ClientListComponent,
  },
  {
    path: 'client/:action',
    component: ClientItemComponent,
  },
  {
    path: 'employee',
    component: EmployeeListComponent
  },
  {
    path: 'employee/:action',
    component: EmployeeItemComponent
  },
  {
    path: 'sale',
    component: SaleListComponent
  },
  {
    path: 'sale/:action',
    component: SaleItemComponent
  },
  {
    path: 'jogo',
    component: GamePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
