import pool from "../../db";
import User from "../models/User";
import { DataAccess } from "./DataAccess";

export class UserDataAccessSQL implements DataAccess<User> {
  async add(user: User): Promise<void> {
    const query = `INSERT INTO public.user (first_name, surname, email, color) VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [
      user.first_name,
      user.surname,
      user.email,
      user.color,
    ]);
  }

  async getAll(): Promise<User[]> {
    const query = "SELECT * FROM public.user";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error(`No users`);
    }
    return result.rows;
  }

  async get(userId: number): Promise<User> {
    const query = "SELECT * FROM public.user WHERE id = $1";
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return result.rows[0];
  }

  async getUserByEmail(email: string): Promise<User> {
    const query = "SELECT * FROM public.user WHERE email = $1";
    const {
      rows: [rows],
    } = await pool.query(query, [email]);
    return rows;
  }

  async update(userId: number, updateUser: Partial<User>): Promise<void> {
    let query = "UPDATE public.user SET ";
    const updates: string[] = [];
    const values: (string | number | Date)[] = [];

    Object.entries(updateUser).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });
    query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
    values.push(userId);

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
  }

  async delete(userId: number): Promise<void> {
    const query = "DELETE FROM public.user WHERE id = $1";
    const result = await pool.query(query, [userId]);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
  }
}
