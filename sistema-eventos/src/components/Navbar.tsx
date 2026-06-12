import type { Usuario } from '../interfaces/auth';

interface NavbarProps {
  usuario: Usuario | null;
  onLogout: () => void;
}

export const Navbar = ({ usuario, onLogout }: NavbarProps) => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__title">Sistema de Eventos</span>
        <span className="navbar__subtitle">Gestión y consulta de eventos</span>
      </div>

      {usuario && (
        <div className="navbar__meta">
          <div className="navbar__identity">
            <strong>{usuario.username}</strong>
            <span>{usuario.rol}</span>
          </div>

          <button type="button" className="button button--ghost" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};