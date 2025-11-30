import { Task } from "./Task";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  add(task: Task): Promise<void>;
  update(id: string, task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}

