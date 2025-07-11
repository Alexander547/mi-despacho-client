import { Archivo } from './archivo';
import { Cliente } from './cliente';
import { TipoExpediente } from './tipoExpediente';

export interface Expediente {
  id: string;
  titulo: string;
  descripcion: string;
  numeroReferencia: string;
  tipoExpedienteId: string;
  estado: string;
  fechaApertura: string; // Puedes usar Date si haces transformación
  fechaCierre?: string;
  etapaProcesal?: string;
  juzgado?: string;
  clienteId: string;
  cliente?: Cliente;
  archivos?: Archivo[];
  tipoExpediente?: TipoExpediente;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
