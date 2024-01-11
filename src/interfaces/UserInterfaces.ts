export interface User {
  name: string,
  email: string,
  password: string,
  password_confirm: string
}

type UserClient = User & {
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

type IUserClient = Prettify<UserClient>
type IUserProvider = Prettify<UserProvider>
type IUserBusiness = Prettify<UserBusiness>

const client: IUserClient = { name: "Lucas Delmonte", email: 'delmontelucas@gmail.com', password: 'test123', password_confirm: 'test123' , name: 'Lucas', lastname: 'Delmonte' }

const provider: IUserProvider = { name: "Fullhard", email: 'worklink@gmail.com', password: 'test123', password_confirm: 'test123' , service: 'Reparación de PCs' }

const business: IUserBusiness = { name: "Teraflop", email: 'worklink@gmail.com', password: 'test123', password_confirm: 'test123' , dedication: 'Informatica' }

export {
  type IUserClient,
  type IUserProvider,
  type IUserBusiness
}

