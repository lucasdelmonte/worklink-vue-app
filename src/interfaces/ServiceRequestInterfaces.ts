import type { IBudget } from './BudgetInterfaces'

export interface IServiceRequestPost {
  cliente: string | undefined,
  categoria: string,
  fechaLimite: string,
  titulo: string,
  descripcion: string,
  imagenes: string[],
  negocio: string
}

export interface IServiceRequestUpdate {
  fechaLimite: string,
  titulo: string,
  descripcion: string,
  imagenes: string[]
}

export interface IServiceRequestGet {
  _id: string | undefined,
  presupuestos: IBudget[] | undefined, 
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
  negocio: {
    _id: string,
    nombre: string
  },
  estado: string | undefined
}