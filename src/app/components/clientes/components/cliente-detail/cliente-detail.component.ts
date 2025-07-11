import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../shared/interfaces/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClienteExpedientesComponent } from '../cliente-expedientes/cliente-expedientes.component';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
  standalone: true,
  imports: [CommonModule, ClienteExpedientesComponent],
})
export class ClienteDetailComponent implements OnInit {
  clienteId!: string;
  cliente!: Cliente;
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.clienteId = id;
        this.getClienteById(id);
      }
    });
  }

  getClienteById(id: string) {
    this.loading = true;
    this.clientesService.getClienteById(id).subscribe({
      next: (data: Cliente) => {
        this.cliente = data;
      },
      error: (err) => {
        console.error('Error al obtener cliente:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
