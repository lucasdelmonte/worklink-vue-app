export interface IBusiness {
  _id: string,
  proveedor: IProvider | undefined,
  categoria: string,
  nombre: string,
  descripcion: string,
  publicaciones: string[],
  imagenes: string[],
  fechaCreacion: string,
  isActive: boolean,
  puntuacion: number | undefined,
  __v: number
}

export interface IBusinessFiltered {
  id: string,
  name: string,
  rating: number | undefined,
  category: string,
  description: string,
  is_active: boolean,
  images: string[], 
  provider: {
    id: string,
    full_name: string,
    email: string,
    phone: string,
    rating: number | undefined,
    is_active: boolean
  }
}

export interface IProvider {
  _id: string,
  email: string,
  firebaseUid: string,
  isActive: boolean,
  nombre_apellido: string,
  password: string,
  puntuacion: number,
  rol: string,
  telefono: string,
  __v: number
}