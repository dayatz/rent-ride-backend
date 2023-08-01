export class Car {
  id?: string

  constructor(
    public make: string,
    public model: string,
    public year: number,
    public isAvailale: boolean,
    id?: string
  ) {
    this.id = id
  }
}
