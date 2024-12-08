import { Component } from '@angular/core';
import {NavigationExtras, Router, RouterOutlet} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from '@angular/common';

interface Menu{
  title: string;
  route: string;
  isCurrent: boolean;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFabButton, MatIcon, MatButton, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public menuList: Menu[];

  private router: Router = new Router();

  constructor() {
    this.menuList = [
      {title: 'PRODUTOS', route: '/product', isCurrent: false},
      {title: 'CLIENTES', route: '/client', isCurrent: false},
      {title: 'EMPREGADOS', route: '/employee', isCurrent: false},
      {title: 'VENDAS', route: '/sale', isCurrent: false},
      {title: 'JOGO', route: '/jogo', isCurrent: false},
    ];
    this.changeMenu(this.menuList[0]);
  }

  public changeMenu(menu: Menu): void {
    this.menuList.forEach((m: Menu) => {
      m.isCurrent = m.route === menu.route;
    });
    this.goToPage(menu.route);
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras = {queryParamsHandling: 'merge'};
    this.router.navigate([route], extras).then();
  }

}
