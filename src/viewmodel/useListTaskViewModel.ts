import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

export type ListTaskState = {
    loading: boolean;
    tasks: Task[];
    error: string | null;
};

export type ListTaskActions = {
    loadTasks: () => Promise<void>;
    deleteTask: (index: number) => Promise<void>;
};

export function useListTaskViewModel() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const result = await taskRepository.getAll();
      setTasks(result);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await taskRepository.delete(id);
      await loadTasks();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir tarefa");
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { loading, tasks, error },
    actions: { loadTasks, deleteTask },
  };
}
