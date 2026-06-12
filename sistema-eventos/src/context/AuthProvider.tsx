import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthState, Usuario } from '../interfaces/auth';

const INITIAL_STATE: AuthState = {
  isLogged: false,
  user: null,
};

const readStoredUser = (): Usuario | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as Usuario;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const getInitialAuthState = (): AuthState => {
  const storedUser = readStoredUser();

  if (storedUser) {
    return {
      isLogged: true,
      user: storedUser,
    };
  }

  return INITIAL_STATE;
};

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(getInitialAuthState);

  const login = (user: Usuario) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      isLogged: true,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState(INITIAL_STATE);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};