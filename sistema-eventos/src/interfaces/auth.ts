export type RolUsuario = 'Administrador' | 'Usuario';

export interface Usuario {
  id: number;
  username: string;
  rol: RolUsuario;
}

export interface AuthState {
  isLogged: boolean;
  user: Usuario | null;
}