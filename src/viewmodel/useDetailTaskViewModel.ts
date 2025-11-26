import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

export type UseDetailTaskViewModelState = {
    loading: boolean;
    task: Task | null;
    error: string | null;
};

export type UseDetailTaskViewModelActions = {
    loadTask: (index: number) => void;
    updateTask: (index: number, task: Task) => void;
    deleteTask: (index: number) => void;
};

export const useDetailTaskViewModel = (
    initialTask: Task | null
): { state: UseDetailTaskViewModelState; actions: UseDetailTaskViewModelActions } => {
    const [task, setTask] = useState<Task | null>(initialTask);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadTask = (index: number) => {
        setLoading(true);
        setError(null);
        const found = taskRepository.getByIndex(index);
        if (!found) {
            setError("Tarefa não encontrada");
        }
        setTask(found);
        setLoading(false);
    };

    const updateTask = (index: number, task: Task) => {
        taskRepository.update(index, task);
        loadTask(index);
    };

    const deleteTask = (index: number) => {
        taskRepository.delete(index);
        loadTask(index);
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
