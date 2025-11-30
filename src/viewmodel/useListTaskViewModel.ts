import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

export type ListTaskState = {
    loading: boolean;
    tasks: Task[];
    error: string | null; // Adicionado para armazenar mensagens de erro
};

export type ListTaskActions = {
    loadTasks: () => Promise<void>;
    deleteTask: (index: number) => Promise<void>;
};

export function useListTaskViewModel(): { state: ListTaskState; actions: ListTaskActions } {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const loadTasks = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await new Promise((resolve) => setTimeout(resolve, 0)); // ✅ garante re-render
            const tasks = await taskRepository.getAll();
            setTasks(tasks);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao carregar tarefas");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (index: number) => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await taskRepository.delete(index);
            await loadTasks();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao deletar a tarefa");
        } finally {
            setLoading(false);
        }
    };

    return {
        state: {
            loading,
            tasks,
            error, // Incluído no estado retornado
        },
        actions: {
            loadTasks,
            deleteTask,
        },
    };
}
