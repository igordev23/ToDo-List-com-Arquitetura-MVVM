import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";


export type ListTaskState = {
    loading: boolean;
    tasks: Task[];
};

export type ListTaskActions = {
    loadTasks: () => Promise <void>;
    deleteTask: (index: number) => Promise <void>;
};

export function useListTaskViewModel(): { state: ListTaskState; actions: ListTaskActions } {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async () => {
        setLoading(true);
        const tasks = await taskRepository.getAll();
        setTasks(tasks);
        setLoading(false);
    };

    const deleteTask = async (index: number) => {
        await taskRepository.delete(index);
        await loadTasks();
    };

    return {
        state: {
            loading,
            tasks,
        },
        actions: {
            loadTasks,
            deleteTask,
        },
    };
}
