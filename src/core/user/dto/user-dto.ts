interface UserBase {
  email: string
  name: string
}

export interface CreateUserDTO extends UserBase {
  password: string
}

export interface ReadUserDTO extends UserBase {
  id: string
}