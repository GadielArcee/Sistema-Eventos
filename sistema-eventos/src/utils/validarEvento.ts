import type { EventoFormErrors, EventoFormValues } from '../interfaces/evento';

const isValidUrl = (value: string) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const isFutureOrToday = (value: string) => {
  const selectedDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selectedDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate >= today;
};

export const validarEvento = (values: EventoFormValues): EventoFormErrors => {
  const errors: EventoFormErrors = {};

  if (values.titulo.trim().length < 5) {
    errors.titulo = 'El título debe tener al menos 5 caracteres';
  }

  if (values.descripcion.trim().length < 20) {
    errors.descripcion = 'La descripción debe tener al menos 20 caracteres';
  }

  if (!values.fecha.trim()) {
    errors.fecha = 'La fecha es obligatoria';
  } else if (!isFutureOrToday(values.fecha.trim())) {
    errors.fecha = 'La fecha no puede ser pasada';
  }

  if (values.ubicacion.trim().length < 3) {
    errors.ubicacion = 'La ubicación debe tener al menos 3 caracteres';
  }

  if (values.categoria.trim().length < 3) {
    errors.categoria = 'La categoría debe tener al menos 3 caracteres';
  }

  if (values.imagen.trim() && !isValidUrl(values.imagen.trim())) {
    errors.imagen = 'La imagen debe ser una URL válida';
  }

  return errors;
};

export const validarCampoEvento = (campo: keyof EventoFormValues, values: EventoFormValues) => {
  return validarEvento(values)[campo] ?? '';
};