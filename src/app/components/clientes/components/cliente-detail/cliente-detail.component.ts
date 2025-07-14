import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Cliente } from '../../../../shared/interfaces/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClienteExpedientesComponent } from '../cliente-expedientes/cliente-expedientes.component';
import { refreshExpedientesSignal } from '../../../../shared/signals/refresh-expedientes.signal';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
  standalone: true,
  imports: [CommonModule, ClienteExpedientesComponent, ToastModule],
  providers: [MessageService],
})
export class ClienteDetailComponent implements OnInit {
  clienteId!: string;
  cliente!: Cliente;
  // loading = true;
  loading = signal(true);
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService
  ) {
    // Obtenemos el clienteId de la ruta
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.clienteId = id;
        this.getClienteById(id);
      }
    });

    // Este efecto reactivo escucha si hay que refrescar
    effect(() => {
      if (refreshExpedientesSignal()) {
        this.getClienteById(this.clienteId);
        refreshExpedientesSignal.set(false);
      }
    });
  }

  ngOnInit() {}

  getClienteById(id: string) {
    this.loading.set(true);
    this.clientesService.getClienteById(id).subscribe({
      next: (data: Cliente) => {
        this.cliente = data;
      },
      error: (err) => {
        console.error('Error al obtener cliente:', err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
