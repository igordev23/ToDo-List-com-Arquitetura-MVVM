import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

export type UseDetailTaskViewModelState = {
    loading: boolean;
    task: Task | null;
    error: string | null;
};

export type UseDetailTaskViewModelActions = {
    loadTask: (index: number) => Promise<void>;
    updateTask: (index: number, task: Task) => Promise<void>;
    deleteTask: (index: number) => Promise<void>;
};

export const useDetailTaskViewModel = (
  initialTask: Task | null
) => {
  const [task, setTask] = useState<Task | null>(initialTask);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTask = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const found = await taskRepository.getById(id);
      if (!found) throw new Error("Tarefa não encontrada");
      setTask(found);

    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, updated: Task): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await taskRepository.update(id, updated);
      setTask(updated);
      return true;

    } catch (err: any) {
      setError(err.message);
      return false;

    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await taskRepository.delete(id);
      setTask(null);
      return true;

    } catch (err: any) {
      setError(err.message);
      return false;

    } finally {
      setLoading(false);
    }
  };

  return {
    state: { task, loading, error },
    actions: { loadTask, updateTask, deleteTask },
  };
};
