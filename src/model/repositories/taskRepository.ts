import { Task } from "../entities/Task";
import { TaskRepository } from "../entities/Repository";

class TaskRepositoryImpl implements TaskRepository {
  private tasks: Task[] = [];

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async getByIndex(index: number): Promise<Task | null> {
    return this.tasks[index] || null;
  }

  async add(task: Task): Promise<void> {
    this.tasks = [task, ...this.tasks];
  }

  async update(index: number, task: Task): Promise<void> {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index] = task;
    }
  }

  async delete(index: number): Promise<void> {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks = this.tasks.filter((_, i) => i !== index);
    }
  }
}

export const taskRepository = new TaskRepositoryImpl();