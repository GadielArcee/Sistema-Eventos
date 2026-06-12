import { createContext, useContext } from 'react';
import type { AuthState, Usuario } from '../interfaces/auth';

export type AuthContextProps = {
  authState: AuthState;
  login: (user: Usuario) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);