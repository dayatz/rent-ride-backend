export interface IPasswordService {
  hash(rawPassword: string): string
  compare(rawPassword: string, hashedPassword: string): boolean
}