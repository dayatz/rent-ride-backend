import { Service } from "typedi";
// import { nanoid } from "nanoid";
import { User } from "../entities/user.entity";
import { IUserRepository } from "./user-repository.interface";

@Service()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    const newUser = {
      id: this.generateId(),
      ...user,
    }
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email == email);
    return user ?? null;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  generateId(): string {
    // return nanoid();
    const lastUser = this.users[this.users.length - 1]
    return lastUser ? String(parseInt(lastUser.id!) + 1) : "1"
  }
}
