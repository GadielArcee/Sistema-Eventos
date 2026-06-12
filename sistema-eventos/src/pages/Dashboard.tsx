import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { EventoForm } from '../components/EventoForm';
import { OrganizadoresWidget } from '../components/OrganizadoresWidget';
import { useAuth } from '../context/AuthContext';
import type { Evento, EventoFormValues } from '../interfaces/evento';
import { crearEvento, eliminarEvento, obtenerEventos, actualizarEvento } from '../services/eventosService';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Dashboard = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventoActivo, setEventoActivo] = useState<Evento | null>(null);

  const esAdministrador = authState.user?.rol === 'Administrador';

  useDocumentMetadata({
    title: 'Sistema de Eventos | Dashboard',
    description: 'Panel de gestión de eventos con listado, creación, edición y eliminación según el rol del usuario.',
  });

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        setIsLoading(true);
        setError('');
        const eventosServidor = await obtenerEventos();
        setEventos(eventosServidor);
      } catch {
        setError('No fue posible cargar los eventos');
      } finally {
        setIsLoading(false);
      }
    };

    cargarEventos();
  }, []);

  const abrirFormularioCreacion = () => {
    setEventoActivo(null);
    setIsFormOpen(true);
  };

  const abrirFormularioEdicion = (evento: Evento) => {
    setEventoActivo(evento);
    setIsFormOpen(true);
  };

  const cerrarFormulario = () => {
    setIsFormOpen(false);
    setEventoActivo(null);
  };

  const handleGuardarEvento = async (values: EventoFormValues) => {
    try {
      setError('');

      if (eventoActivo?.id !== undefined) {
        const eventoActualizado = await actualizarEvento(eventoActivo.id, values);
        setEventos((current) =>
          current.map((evento) => (String(evento.id) === String(eventoActualizado.id) ? eventoActualizado : evento))
        );
      } else {
        const nuevoEvento = await crearEvento(values);
        setEventos((current) => [nuevoEvento, ...current]);
      }

      cerrarFormulario();
    } catch {
      setError('No fue posible guardar el evento');
    }
  };

  const handleEliminarEvento = async (evento: Evento) => {
    const confirmed = window.confirm(`¿Deseas eliminar el evento ${evento.titulo}?`);

    if (!confirmed || evento.id === undefined) {
      return;
    }

    try {
      setError('');
      await eliminarEvento(evento.id);
      setEventos((current) => current.filter((item) => String(item.id) !== String(evento.id)));
    } catch {
      setError('No fue posible eliminar el evento');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <Navbar usuario={authState.user} onLogout={handleLogout} />

      <main className="page">
        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow">Panel de gestión</p>
            <h1>Dashboard de eventos</h1>
            <p className="section-text">
              {esAdministrador
                ? 'Como administrador puedes crear, editar y eliminar eventos desde esta pantalla.'
                : 'Como usuario tienes acceso de solo lectura al catálogo de eventos.'}
            </p>
          </div>

          {esAdministrador && (
            <button type="button" className="button button--primary" onClick={abrirFormularioCreacion}>
              Crear evento
            </button>
          )}
        </section>

        {error && <div className="alert alert--error">{error}</div>}

        {isLoading ? (
          <section className="panel state-panel">
            <p>Cargando eventos...</p>
          </section>
        ) : eventos.length === 0 ? (
          <section className="panel state-panel">
            <p>No hay eventos disponibles.</p>
          </section>
        ) : (
          <section className="events-grid">
            {eventos.map((evento) => (
              <article className="event-card" key={String(evento.id)}>
                <div className="event-card__media">
                  <img src={evento.imagen} alt={evento.titulo} />
                </div>

                <div className="event-card__content">
                  <div className="event-card__header">
                    <div>
                      <p className="event-card__category">{evento.categoria}</p>
                      <h2>{evento.titulo}</h2>
                    </div>
                    <span className={evento.estado ? 'badge badge--success' : 'badge badge--neutral'}>
                      {evento.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <p className="event-card__description">{evento.descripcion}</p>

                  <dl className="event-card__details">
                    <div>
                      <dt>Fecha</dt>
                      <dd>{evento.fecha}</dd>
                    </div>
                    <div>
                      <dt>Ubicación</dt>
                      <dd>{evento.ubicacion}</dd>
                    </div>
                  </dl>

                  {esAdministrador && (
                    <div className="event-card__actions">
                      <button type="button" className="button button--secondary" onClick={() => abrirFormularioEdicion(evento)}>
                        Editar
                      </button>
                      <button type="button" className="button button--danger" onClick={() => void handleEliminarEvento(evento)}>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}

        <OrganizadoresWidget />
      </main>

      <EventoForm
        isOpen={isFormOpen}
        initialValues={eventoActivo}
        title={eventoActivo ? 'Editar evento' : 'Crear evento'}
        submitLabel={eventoActivo ? 'Guardar cambios' : 'Crear evento'}
        onClose={cerrarFormulario}
        onSubmit={handleGuardarEvento}
      />
    </div>
  );
};