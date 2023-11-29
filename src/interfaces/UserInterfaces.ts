export interface User {
  email: string,
  password: string
}

type UserClient = User & {
  name: string,
  lastname: string
}

type UserProvider = User & {
  service: string
}

type UserBusiness = User & {
  dedication: string
}

type Prettify<T> = {
  [K in keyof T] : T[K]
} & {}

type client = Prettify<UserClient>
type provider = Prettify<UserProvider>
type business = Prettify<UserBusiness>

const cliente: client = { email: 'delmontelucas@gmail.com', password: 'test123', name: 'Lucas', lastname: 'Delmonte' }

const servicio: provider = { email: 'worklink@gmail.com', password: 'test123', service: 'Reparación de PCs' }

const negocio: business = { email: 'worklink@gmail.com', password: 'test123', dedication: 'Informatica' }

