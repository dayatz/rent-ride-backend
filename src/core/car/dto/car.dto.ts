export interface CarBase {
  make: string
  model: string
  year: number
  isAvailale: boolean
}

export interface CreateCarDTO extends CarBase {}

export interface ReadCarDTO extends CarBase {
  id: string
}