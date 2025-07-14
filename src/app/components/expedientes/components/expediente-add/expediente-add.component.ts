import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { EstadoExpediente } from '../../../../shared/enums/estadoExpediente.enum';
import { TipoExpediente } from '../../../../shared/interfaces/tipoExpediente';
import { TipoExpedienteService } from '../../../tipo-expedientes/services/tipoExpediente.service';
import { ExpedienteService } from '../../services/expediente.service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Expediente } from '../../../../shared/interfaces/expediente';

interface ArchivoFormulario {
  file?: File;
  titulo: string;
  descripcion: string;
  nombreOriginal?: string;
}

@Component({
  selector: 'app-expediente-add',
  templateUrl: './expediente-add.component.html',
  styleUrls: ['./expediente-add.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    TextareaModule,
  ],
  providers: [MessageService],
})
export class ExpedienteAddComponent implements OnInit {
  expedienteForm!: FormGroup;
  esEdicion = false;
  expedienteEnEdicion?: Expediente;
  tiposExpediente: TipoExpediente[] = [];

  estadosExpediente = [
    { label: EstadoExpediente.ABIERTO, value: EstadoExpediente.ABIERTO },
    { label: EstadoExpediente.EN_PROCESO, value: EstadoExpediente.EN_PROCESO },
    {
      label: EstadoExpediente.EN_CONCILIACION,
      value: EstadoExpediente.EN_CONCILIACION,
    },
    { label: EstadoExpediente.SUSPENDIDO, value: EstadoExpediente.SUSPENDIDO },
    { label: EstadoExpediente.CERRADO, value: EstadoExpediente.CERRADO },
    { label: EstadoExpediente.ARCHIVADO, value: EstadoExpediente.ARCHIVADO },
  ];

  archivosSeleccionados: File[] = [];

  archivos: ArchivoFormulario[] = [];
  clienteId!: string;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private tipoExpedienteService: TipoExpedienteService,
    private expedienteService: ExpedienteService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.expedienteEnEdicion = this.config.data;
    this.clienteId = this.config.data?.clienteId;

    this.getTipoExpedientes();
    this.initFormExpediente();
    if (this.expedienteEnEdicion) {
      this.esEdicion = true;
      this.expedienteForm.patchValue(this.expedienteEnEdicion);

      // Mapear archivos existentes
      if (this.expedienteEnEdicion.archivos?.length) {
        this.archivos = this.expedienteEnEdicion.archivos.map((archivo) => ({
          titulo: archivo.titulo,
          descripcion: archivo.descripcion,
          nombreOriginal: archivo.nombreOriginal,
        }));
      }
    }
  }
  getTipoExpedientes() {
    this.tipoExpedienteService.getTiposExpediente().subscribe({
      next: (tipos) => (this.tiposExpediente = tipos),
      error: (err) => console.error('Error al cargar tipos', err),
    });
  }
  initFormExpediente() {
    this.expedienteForm = this.fb.group({
      titulo: [null, Validators.required],
      descripcion: [null],
      tipoExpedienteId: [null, Validators.required],
      estado: [null, Validators.required],
      etapaProcesal: [null, Validators.required],
      juzgado: [null, Validators.required],

      clienteId: [this.clienteId, Validators.required],
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const nuevosArchivos: ArchivoFormulario[] = Array.from(input.files).map(
      (file) => ({
        file,
        titulo: '',
        descripcion: '',
      })
    );

    this.archivos.push(...nuevosArchivos);

    // Limpia el input para poder volver a seleccionar el mismo archivo si se quiere
    input.value = '';
  }

  removeArchivo(index: number) {
    this.archivos.splice(index, 1);
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  guardar() {
    if (this.expedienteForm.invalid) return;

    const formData = new FormData();

    // Datos del expediente
    const expediente = this.expedienteForm.value;
    for (const key in expediente) {
      if (expediente.hasOwnProperty(key)) {
        const value = expediente[key];
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    }

    // Archivos seleccionados
    if (this.archivos?.length > 0) {
      this.archivos.forEach((archivo: ArchivoFormulario) => {
        if (archivo.file) {
          formData.append('files', archivo.file); // solo si es nuevo
          formData.append('titulos', archivo.titulo);
          formData.append('descripciones', archivo.descripcion);
        }
      });
    }

    const peticion = this.esEdicion
      ? this.expedienteService.actualizarExpedienteConArchivos(
          this.expedienteEnEdicion!.id,
          formData
        )
      : this.expedienteService.crearExpedienteConArchivos(formData);

    peticion.pipe(take(1)).subscribe({
      next: (res) => this.ref.close(res),
      error: (err) => console.error('Error:', err),
      complete: () => this.show(),
    });

    // this.expedienteService
    //   .crearExpedienteConArchivos(formData)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (res) => {
    //       this.ref.close(res);
    //     },
    //     error: (err) => {
    //       console.error('Error al crear expediente:', err);
    //     },
    //     complete: () => {
    //       this.show();
    //     },
    //   });
  }

  cancelar() {
    this.ref.close(null);
  }

  camposArchivosCompletos(): boolean {
    if (!this.archivos.length) return true; // ✅ No hay archivos, no validar

    return this.archivos.every(
      (archivo) =>
        archivo.titulo.trim() !== '' && archivo.descripcion.trim() !== ''
    );
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sticky',
      detail: 'Expediente Creado',
      sticky: true,
    });
  }
}
