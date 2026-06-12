import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const LandingPage = () => {
  useDocumentMetadata({
    title: 'Sistema de Eventos | Inicio',
    description: 'Explora el sistema de eventos y accede al panel de gestión con autenticación por roles.',
  });

  return (
    <main className="page auth-layout">
      <section className="panel auth-card hero-card">
        <p className="eyebrow">Sistema de Eventos</p>
        <h1 className="hero-card__title">Gestiona eventos con control de acceso y experiencia clara</h1>
        <p className="hero-card__text">
          Consulta el catálogo de eventos, administra altas y ediciones cuando tengas rol de administrador y navega desde cualquier dispositivo.
        </p>
        <div className="hero-card__actions">
          <Link to="/login" className="button button--primary">
            Ingresar al sistema
          </Link>
        </div>
      </section>
    </main>
  );
};