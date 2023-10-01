export interface user {
  NOMBRE: string;
  APELLIDOS: string;
  ROLE: string;
  PROG_DEPEND: string;
}

export interface userResponse {
  codigo: string;
  descripcion: string;
  resultado: user;
}
