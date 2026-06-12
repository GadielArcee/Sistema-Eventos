import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Evento, EventoFormValues } from '../interfaces/evento';
import { validarCampoEvento, validarEvento } from '../utils/validarEvento';

interface EventoFormProps {
  isOpen: boolean;
  initialValues: Evento | null;
  title: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (values: EventoFormValues) => Promise<void> | void;
}

const emptyValues: EventoFormValues = {
  titulo: '',
  descripcion: '',
  fecha: '',
  ubicacion: '',
  categoria: '',
  imagen: '',
  estado: true,
};

const buildValues = (evento: Evento | null): EventoFormValues => {
  if (!evento) {
    return emptyValues;
  }

  return {
    titulo: evento.titulo ?? '',
    descripcion: evento.descripcion ?? '',
    fecha: evento.fecha ?? '',
    ubicacion: evento.ubicacion ?? '',
    categoria: evento.categoria ?? '',
    imagen: evento.imagen ?? '',
    estado: Boolean(evento.estado),
  };
};

const getMinDate = () => new Date().toISOString().split('T')[0];

export const EventoForm = ({ isOpen, initialValues, title, submitLabel, onClose, onSubmit }: EventoFormProps) => {
  const [values, setValues] = useState<EventoFormValues>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues(buildValues(initialValues));
      setErrors({});
      setIsSubmitting(false);
    }
  }, [initialValues, isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && (event.key === 'Escape' || event.key === 'Esc')) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const fieldName = name as keyof EventoFormValues;
    const fieldValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;

    setValues((current) => ({
      ...current,
      [fieldName]: fieldValue,
    }));

    setErrors((current) => {
      const updated = { ...current };
      delete updated[fieldName];
      return updated;
    });
  };

  const handleBlur = (fieldName: keyof EventoFormValues) => {
    const fieldError = validarCampoEvento(fieldName, values);

    setErrors((current) => {
      const updated = { ...current };

      if (fieldError) {
        updated[fieldName] = fieldError;
      } else {
        delete updated[fieldName];
      }

      return updated;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validarEvento(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (fieldName: keyof EventoFormValues) => errors[fieldName];

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <section className="modal__content" role="dialog" aria-modal="true" aria-labelledby="evento-form-title" onClick={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="eyebrow">Formulario de evento</p>
            <h2 id="evento-form-title">{title}</h2>
          </div>
          <button type="button" className="button button--ghost" onClick={onClose}>
            Cerrar
          </button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              name="titulo"
              className="input"
              value={values.titulo}
              onChange={handleChange}
              onBlur={() => handleBlur('titulo')}
              minLength={5}
              required
              placeholder="Conferencia de innovación"
            />
            {getError('titulo') && <span className="field-error">{getError('titulo')}</span>}
          </div>

          <div className="field">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="textarea"
              value={values.descripcion}
              onChange={handleChange}
              onBlur={() => handleBlur('descripcion')}
              minLength={20}
              rows={4}
              placeholder="Describe el objetivo, público y alcance del evento"
            />
            {getError('descripcion') && <span className="field-error">{getError('descripcion')}</span>}
          </div>

          <div className="form-grid form-grid--two">
            <div className="field">
              <label htmlFor="fecha">Fecha</label>
              <input
                id="fecha"
                name="fecha"
                className="input"
                type="date"
                value={values.fecha}
                onChange={handleChange}
                onBlur={() => handleBlur('fecha')}
                min={getMinDate()}
                required
              />
              {getError('fecha') && <span className="field-error">{getError('fecha')}</span>}
            </div>

            <div className="field">
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                id="ubicacion"
                name="ubicacion"
                className="input"
                value={values.ubicacion}
                onChange={handleChange}
                onBlur={() => handleBlur('ubicacion')}
                required
                placeholder="Auditorio principal"
              />
              {getError('ubicacion') && <span className="field-error">{getError('ubicacion')}</span>}
            </div>
          </div>

          <div className="form-grid form-grid--two">
            <div className="field">
              <label htmlFor="categoria">Categoría</label>
              <input
                id="categoria"
                name="categoria"
                className="input"
                value={values.categoria}
                onChange={handleChange}
                onBlur={() => handleBlur('categoria')}
                required
                placeholder="Tecnología"
              />
              {getError('categoria') && <span className="field-error">{getError('categoria')}</span>}
            </div>

            <div className="field">
              <label htmlFor="imagen">Imagen URL</label>
              <input
                id="imagen"
                name="imagen"
                className="input"
                value={values.imagen}
                onChange={handleChange}
                onBlur={() => handleBlur('imagen')}
                placeholder="https://..."
              />
              {getError('imagen') && <span className="field-error">{getError('imagen')}</span>}
            </div>
          </div>

          <div className="field field--inline">
            <input id="estado" name="estado" type="checkbox" checked={values.estado} onChange={handleChange} />
            <label htmlFor="estado">Evento activo</label>
          </div>

          <div className="modal__footer">
            <button type="button" className="button button--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="button button--primary" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : submitLabel}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};