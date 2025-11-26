import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

export type UseDetailTaskViewModelState = {
    loading: boolean;
    task: Task | null;
    error: string | null;
};

export type UseDetailTaskViewModelActions = {
    loadTask: (index: number) => Promise <void>;
    updateTask: (index: number, task: Task) => Promise <void>;
    deleteTask: (index: number) => Promise <void>;
};

export const useDetailTaskViewModel = (
    initialTask: Task | null
): { state: UseDetailTaskViewModelState; actions: UseDetailTaskViewModelActions } => {
    const [task, setTask] = useState<Task | null>(initialTask);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadTask = async (index: number) => {
        setLoading(true);
        setError(null);
        const found = await taskRepository.getByIndex(index);
        if (!found) {
            setError("Tarefa não encontrada");
        }
        setTask(found);
        setLoading(false);
    };
    
    const updateTask = async (index: number, task: Task) => {
        await taskRepository.update(index, task);
        await loadTask(index);
    };

    const deleteTask = async (index: number) => {
        await taskRepository.delete(index);
        await loadTask(index);
    };

    return {
        state: {
            task,
            loading,
            error,
        },
        actions: {
            loadTask,
            updateTask,
            deleteTask,
        },
    };
};
