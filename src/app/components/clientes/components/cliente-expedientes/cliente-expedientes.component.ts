import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Table, TableModule } from 'primeng/table';
import { TieredMenu } from 'primeng/tieredmenu';
import { Expediente } from '../../../../shared/interfaces/expediente';
import { Paginacion } from '../../../../shared/interfaces/paginacion.interface';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { Archivo } from '../../../../shared/interfaces/archivo';

@Component({
  selector: 'app-cliente-expedientes',
  templateUrl: './cliente-expedientes.component.html',
  styleUrls: ['./cliente-expedientes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BadgeModule,
    TableModule,
    TieredMenu,
    ButtonModule,
    TagModule,
    TooltipModule,
    DialogModule,
  ],
})
export class ClienteExpedientesComponent implements OnInit {
  @Input() expedientes: any[] = [];
  menuOptions: MenuItem[] = [];
  totalCount = 0;
  currentPage = 1;
  pageLimit = 10;
  loading = false;
  showDialog = false;
  expedienteSeleccionado: Expediente | null = null;
  @Input() paginacion: Paginacion[] = [];
  @ViewChild('dt', { static: true }) dt!: Table;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  getEstadoSeverity(
    estado: string
  ): 'success' | 'info' | 'warning' | 'danger' | undefined {
    switch (estado) {
      case 'Abierto':
        return 'info';
      case 'En Proceso':
        return 'success';
      case 'En Conciliación':
        return 'warning';
      case 'Suspendido':
        return 'danger';
      case 'Cerrado':
        return 'success';
      case 'Archivado':
        return 'secondary' as any;
      default:
        return undefined;
    }
  }

  setMenuOptions(expediente: Expediente): void {
    this.menuOptions.push({
      label: 'Detalle',
      icon: 'pi pi-eye',
      command: () => this.verExpediente(expediente),
    });
    this.menuOptions.push({
      label: 'Modificar',
      icon: 'pi pi-pencil',
      command: () => this.editarExpediente(expediente),
    });
    this.menuOptions.push({
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => this.eliminarExpediente(expediente),
    });
  }

  addExpediente() {
    console.log('Nuevo expediente');
  }

  verExpediente(expediente: Expediente) {
    console.log('Ver', expediente);
    this.expedienteSeleccionado = expediente;
    this.showDialog = true;
  }

  editarExpediente(expediente: Expediente) {
    console.log('Editar', expediente);
  }

  eliminarExpediente(expediente: Expediente) {
    console.log('Eliminar', expediente);
  }

  descargarArchivo(archivo: Archivo) {
    // Asume que tienes un campo `url` o debes construirlo desde tu backend
    window.open(archivo.url, '_blank');
  }
}
