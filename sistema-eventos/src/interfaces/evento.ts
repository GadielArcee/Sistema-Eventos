export interface Evento {
  id?: string | number;
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  categoria: string;
  imagen: string;
  estado: boolean;
}

export type EventoFormValues = Omit<Evento, 'id'>;

export type EventoFormErrors = Partial<Record<keyof EventoFormValues, string>>;