import type { IBusiness } from "./BusinessInterfaces"

export interface IServiceRequestPost {
  cliente: string | undefined,
  categoria: string,
  fechaLimite: string,
  titulo: string,
  descripcion: string,
  imagenes: string[],
  negocio: IBusiness | undefined
}

export interface IServiceRequestUpdate {
  fechaLimite: string,
  titulo: string,
  descripcion: string,
  imagenes: string[]
}

export interface IServiceRequestGet {
  _id: string | undefined,
  cliente: {
    _id: string,
    nombre_apellido: string,
  } | undefined,
  categoria: string,
  fechaCreacion: string | undefined,
  fechaLimite: string,
  titulo: string,
  descripcion: string,
  imagenes: string[],
  negocio: IBusiness | undefined
  estado: string | undefined
}