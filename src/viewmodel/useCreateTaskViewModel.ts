import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

// Definição dos tipos para State e Actions
export type CreateTaskState = {
    task: Task;
    loading: boolean;
};

export type CreateTaskActions = {
    createTask: (task: Task) => void;
};

export const useCreateTaskViewModel = (
    initialTask: Task
): { state: CreateTaskState; actions: CreateTaskActions } => {
    // Estado
    const [task, setTask] = useState<Task>(initialTask);
    const [loading, setLoading] = useState<boolean>(false);


    const createTask = (newTask: Task) => {
        setLoading(true);
        taskRepository.add(newTask);
        setTask(newTask);
        setLoading(false);
    };

    // Retorno no formato MVVM
    return {
        state: {
            task,
            loading,
        },
        actions: {
            createTask,
        },
    };
};
