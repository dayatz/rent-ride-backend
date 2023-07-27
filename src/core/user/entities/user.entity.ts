export class User {
  id?: string

  constructor(
    public name: string,
    public email: string,
    public hashedPassword: string,
  ) {}
}
