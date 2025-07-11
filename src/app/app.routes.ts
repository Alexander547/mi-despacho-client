import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesListComponent } from './components/clientes/components/clientes-list/clientes-list.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Inicio',
  },
  {
    path: 'clientes',
    component: ClientesListComponent,
    title: 'Lista de Clientes',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
