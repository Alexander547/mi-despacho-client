import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Cliente } from '../../../../shared/interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Paginacion } from '../../../../shared/interfaces/paginacion.interface';
import { take } from 'rxjs';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    TieredMenu,
  ],
  providers: [ClientesService],
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];

  menuOptions: MenuItem[] = [];

  totalCount = 0;
  currentPage = 1;
  pageLimit = 10;
  loading = false;
  @Input() paginacion: Paginacion[] = [];

  @ViewChild('dt', { static: true }) dt!: Table;
  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes(event?: any) {
    this.loading = true;

    const page = event?.first ? Math.floor(event.first / event.rows) + 1 : 1;
    const limit = event?.rows || this.pageLimit;

    this.clientesService
      .getClientesLazyload({ page, limit })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.clientes = res.clientes;
          this.totalCount = res.total;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  setMenuOptions(cliente: Cliente): void {
    this.menuOptions.push({
      label: 'Detalle',
      icon: 'pi pi-eye',
      command: () => this.verCliente(cliente),
    });
    this.menuOptions.push({
      label: 'Modificar',
      icon: 'pi pi-pencil',
      command: () => this.editarCliente(cliente),
    });
    this.menuOptions.push({
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => this.eliminarCliente(cliente),
    });
  }

  addCliente() {
    console.log('Nuevo Cliente');
  }

  verCliente(cliente: Cliente) {
    console.log('Ver', cliente);
  }

  editarCliente(cliente: Cliente) {
    console.log('Editar', cliente);
  }

  eliminarCliente(cliente: Cliente) {
    console.log('Eliminar', cliente);
  }
}
