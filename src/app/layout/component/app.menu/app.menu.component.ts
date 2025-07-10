import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';

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
  ],
  standalone: true,
})
export class AppMenuComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Clientes', icon: 'pi pi-users', routerLink: '/clientes' },
    {
      label: 'Expedientes',
      icon: 'pi pi-briefcase',
      routerLink: '/expedientes',
    },
    { label: 'Archivos', icon: 'pi pi-folder', routerLink: '/archivos' },
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

  ngOnInit() {
    //   this.items = [
    //     {
    //       label: 'Inicio',
    //       icon: 'pi pi-home',
    //       routerLink: ['/'],
    //     },
    //     {
    //       label: 'Clientes',
    //       icon: 'pi pi-users',
    //       routerLink: ['/clientes'],
    //     },
    //     {
    //       label: 'Expedientes',
    //       icon: 'pi pi-briefcase',
    //       routerLink: ['/expedientes'],
    //     },
    //     {
    //       label: 'Archivos',
    //       icon: 'pi pi-folder',
    //       routerLink: ['/archivos'],
    //     },
    //     {
    //       label: 'Configuración',
    //       icon: 'pi pi-cog',
    //       routerLink: ['/configuracion'],
    //     },
    //   ];
    //   this.userItems = [
    //     {
    //       label: 'Ver Perfil',
    //       icon: 'pi pi-user',
    //       command: () => {
    //         // lógica para ir al perfil
    //         console.log('Ver perfil');
    //       },
    //     },
    //     {
    //       label: 'Cerrar sesión',
    //       icon: 'pi pi-sign-out',
    //       command: () => {
    //         // lógica para cerrar sesión
    //         console.log('Cerrar sesión');
    //       },
    //     },
    //   ];
  }
}
