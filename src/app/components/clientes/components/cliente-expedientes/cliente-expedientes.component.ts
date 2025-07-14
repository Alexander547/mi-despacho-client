import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExpedienteAddComponent } from '../../../expedientes/components/expediente-add/expediente-add.component';
import { refreshExpedientesSignal } from '../../../../shared/signals/refresh-expedientes.signal';
import { ExpedienteService } from '../../../expedientes/services/expediente.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

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
    ConfirmDialog,
    ToastModule,
  ],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class ClienteExpedientesComponent implements OnInit {
  @Input() expedientes: Expediente[] = [];
  menuOptions: MenuItem[] = [];
  totalCount = 0;
  currentPage = 1;
  pageLimit = 10;
  loading = false;
  showDialog = false;
  expedienteSeleccionado: Expediente | null = null;
  @Input() paginacion: Paginacion[] = [];
  @ViewChild('dt', { static: true }) dt!: Table;

  ref!: DynamicDialogRef;
  clienteId!: string;
  constructor(
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private expedienteService: ExpedienteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.clienteId = id;
      } else {
        console.error('No se encontró el ID del cliente en la ruta');
      }
    });
  }

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

  //Retorno true o false, valida si tiene archivos o no
  get tieneArchivos(): boolean {
    return !!this.expedienteSeleccionado?.archivos?.length;
  }

  setMenuOptions(expediente: Expediente): void {
    this.menuOptions = [
      {
        label: 'Detalle',
        icon: 'pi pi-eye',
        command: () => this.verExpediente(expediente),
      },
      {
        label: 'Modificar',
        icon: 'pi pi-pencil',
        command: () => this.editarExpediente(expediente),
      },
      {
        label: 'Comentarios',
        icon: 'pi pi-comments',
        command: () => this.comentarExpediente(expediente),
      },
      {
        label: 'Seguimiento',
        icon: 'pi pi-history',
        command: () => this.seguimientoExpediente(expediente),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.eliminarExpediente(expediente),
      },
    ];
  }
  seguimientoExpediente(expediente: Expediente): void {
    console.log('Muestra los seguimientos/historial del expediente');
  }
  comentarExpediente(expediente: Expediente): void {
    console.log('Comentarios sobre el expediente');
  }

  addExpediente() {
    this.ref = this.dialogService.open(ExpedienteAddComponent, {
      header: 'Nuevo',
      width: '45vw',
      closable: true,
      dismissableMask: true,
      data: {
        clienteId: this.clienteId,
      },
    });

    this.ref.onClose.subscribe((nuevoExpediente) => {
      if (nuevoExpediente) {
        console.log('Expediente recibido:', nuevoExpediente);
        refreshExpedientesSignal.update(() => true); // Activa el refresco
      }
    });
  }

  verExpediente(expediente: Expediente) {
    this.expedienteSeleccionado = expediente;
    this.showDialog = true;
  }

  editarExpediente(expediente: Expediente) {
    this.ref = this.dialogService.open(ExpedienteAddComponent, {
      header: 'Modificar',
      width: '45vw',
      closable: true,
      dismissableMask: true,
      data: expediente,
    });

    this.ref.onClose.subscribe((nuevoExpediente) => {
      if (nuevoExpediente) {
        refreshExpedientesSignal.update(() => true);
      }
    });
  }

  eliminarExpediente(expediente: Expediente) {
    if (!expediente.id) return;

    this.confirmationService.confirm({
      message: 'Deseas eliminar este registro?',
      header: 'Zona de Peligro',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger',
      },

      accept: () => {
        this.expedienteService.eliminarExpediente(expediente.id).subscribe({
          next: () => {
            refreshExpedientesSignal.update(() => true);
          },
          error: (err) => {
            console.error('Error eliminando expediente:', err);
          },
          complete: () => {
            this.show();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazar',
          detail: 'Rechazaste',
        });
      },
    });
  }

  descargarArchivo(archivo: Archivo) {
    window.open(archivo.url, '_blank');
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sticky',
      detail: 'Expediente Eliminado',
      sticky: true,
    });
  }
}
