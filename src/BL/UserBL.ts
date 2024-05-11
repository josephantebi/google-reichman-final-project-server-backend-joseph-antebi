import { DataAccess } from "../DAL/DataAccess";
import User from "../models/User";

export class UserBL {
  private userDataAccess: DataAccess<User>;

  constructor(userDataAccess: DataAccess<User>) {
    this.userDataAccess = userDataAccess;
  }

  async addUser(user: User): Promise<void> {
    try {
      await this.userDataAccess.add(user);
    } catch (error) {
      throw new Error(`Unable to add User: ${(error as Error).message}`);
    }
  }

  async getUser(userId: number): Promise<User> {
    const User = await this.userDataAccess.get(userId);
    if (!User) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const User = await this.userDataAccess.getUserByEmail(email);
    if (!User) {
      return null;
    }
    return User;
  }

  async getAllUsers(): Promise<User[]> {
    const Users = await this.userDataAccess.getAll();
    if (Users.length === 0) {
      throw new Error(`Users not found`);
    }
    return Users;
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
    try {
      await this.userDataAccess.update(userId, updateData);
    } catch (error) {
      throw new Error(`Unable to update User: ${(error as Error).message}`);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.userDataAccess.delete(userId);
    } catch (error) {
      throw new Error(`Unable to delete User: ${(error as Error).message}`);
    }
  }
}
