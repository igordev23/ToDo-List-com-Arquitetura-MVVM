import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

// Definição dos tipos para State e Actions
export type CreateTaskState = {
    task: Task;
    loading: boolean;
    error: string | null;
};

export type CreateTaskActions = {
    createTask: (task: Task) => Promise<void>;
};

export const useCreateTaskViewModel = (
    initialTask: Task
): { state: CreateTaskState; actions: CreateTaskActions } => {
    // Estado
    const [task, setTask] = useState<Task>(initialTask);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const createTask = async (newTask: Task) => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await taskRepository.add(newTask);
            setTask(newTask);
        } catch (err) {
            // Captura e armazena o erro
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };
    // Retorno no formato MVVM
    return {
        state: {
            task,
            loading,
            error,
        },
        actions: {
            createTask,
        },
    };
};
