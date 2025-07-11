export interface Cliente {
  id: string;
  nombres: string;
  apellidos: string;
  identificacion: string;
  tipoIdentificacion: string;
  telefono: string;
  correo: string;
  imgPerfilUrl?: string;
  createdAt: string;
}

export interface ClientesLazyResponse {
  clientes: Cliente[];
  total: number;
}
