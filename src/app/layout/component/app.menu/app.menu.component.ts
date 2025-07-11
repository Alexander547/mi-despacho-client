import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.css'],
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    TieredMenuModule,
    CommonModule,
    RouterModule,
  ],
  standalone: true,
})
export class AppMenuComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      routerLink: '/',
    },
    { separator: true },
    { label: 'Clientes', icon: 'pi pi-users', routerLink: '/clientes' },
    { separator: true },
    {
      label: 'Audiencias',
      icon: 'pi pi-briefcase',
    },
    { separator: true },
    { label: 'Documentación', icon: 'pi pi-folder' },
    { separator: true },
    { separator: true },
    {
      label: 'Notas',
      icon: 'pi pi-book',
    },
  ];

  userItems: MenuItem[] = [
    {
      label: 'Ver Perfil',
      icon: 'pi pi-user',
      command: () => console.log('Perfil'),
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => console.log('Cerrar sesión'),
    },
  ];

  @ViewChild('userMenu') userMenu!: TieredMenu;

  toggleUserMenu(event: Event) {
    this.userMenu.toggle(event);
  }
  constructor() {}

  ngOnInit() {}
}
