import bcrypt from "bcrypt"
import { Service } from "typedi";
import { IPasswordService } from "./password-interface";

@Service()
export class PasswordService implements IPasswordService {
  hash(rawPassword: string): string {
    return bcrypt.hashSync(rawPassword, 10)
  }

  compare(rawPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
