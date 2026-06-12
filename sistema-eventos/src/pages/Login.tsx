import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Usuario } from '../interfaces/auth';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

const USUARIOS_MOCK: Usuario[] = [
  { id: 1, username: 'admin', rol: 'Administrador' },
  { id: 2, username: 'joaquin', rol: 'Usuario' },
];

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, authState } = useAuth();
  const navigate = useNavigate();

  useDocumentMetadata({
    title: 'Sistema de Eventos | Login',
    description: 'Accede al panel de gestión de eventos con usuarios de prueba y control por roles.',
  });

  useEffect(() => {
    if (authState.isLogged) {
      navigate('/dashboard');
    }
  }, [authState.isLogged, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    const validUser = USUARIOS_MOCK.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());

    if (validUser && password === '123456') {
      login(validUser);
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <main className="page auth-layout">
      <section className="panel auth-card">
        <p className="eyebrow">Acceso seguro</p>
        <h1>Iniciar sesión</h1>
        <p className="section-text">Ingresa con los usuarios de prueba para validar los roles del sistema.</p>

        <form onSubmit={handleSubmit} className="form-stack">
          {error && <p className="field-error field-error--global">{error}</p>}

          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              className="input"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button button--primary button--full">
            Ingresar
          </button>
        </form>

        <div className="helper-box">
          <p>Usuarios de prueba</p>
          <span>admin / 123456</span>
          <span>joaquin / 123456</span>
        </div>
      </section>
    </main>
  );
};