import { Task } from "./Task";

export interface TaskRepository {
    getAll(): Task[];
    getByIndex(index: number): Task | null;
    add(task: Task): void;
    update(index: number, task: Task): void;
    remove(index: number): void;
}