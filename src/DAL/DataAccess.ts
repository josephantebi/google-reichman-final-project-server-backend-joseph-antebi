export interface DataAccess<T> {
  add(t: T): Promise<void>;
  delete(id: number): Promise<void>;
  update(id: number, updateData: Partial<T>): Promise<void>;
  get(id: number): Promise<T>;
  getUserByEmail(email: string): Promise<T>;
  getAll(text?: string, from?: Number, to?: Number): Promise<T[]>;
}
