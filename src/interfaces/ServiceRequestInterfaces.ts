import type { IBusiness } from "./BusinessInterfaces"

export interface IServiceRequest {
  cliente: string,
  categoria: string,
  fechaCreacion: string | undefined,
  fechaLimite: string,
  titulo: string,
  descripcion: string,
  imagenes: string[],
  negocio: IBusiness | undefined
  estado: string | undefined
}