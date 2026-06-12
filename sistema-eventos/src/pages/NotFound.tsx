import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const NotFound = () => {
  useDocumentMetadata({
    title: 'Sistema de Eventos | 404',
    description: 'La ruta solicitada no existe dentro del Sistema de Eventos.',
  });

  return (
    <main className="page auth-layout">
      <section className="panel auth-card centered-card">
        <p className="eyebrow">Error 404</p>
        <h1>Página no encontrada</h1>
        <p>La ruta solicitada no existe o fue movida.</p>
        <Link to="/" className="button button--primary">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
};