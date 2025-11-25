import { Task } from "../entities/Task";
import { TaskRepository } from "../entities/Repository";

class TaskRepositoryImpl implements TaskRepository {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }
    

    getByIndex(index: number): Task | null {
        return this.tasks[index] || null;
    }

    add(task: Task): void {
        this.tasks = [task, ...this.tasks];
    }

    update(index: number, task: Task): void {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index] = task;
        }
    }

    remove(index: number): void {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks = this.tasks.filter((_, i) => i !== index);
        }
    }
}

export const taskRepository = new TaskRepositoryImpl();
