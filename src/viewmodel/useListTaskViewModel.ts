import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

type ListTaskState = {
    loading: boolean;
    tasks: Task[];
};

type ListTaskActions = {
    loadTasks: () => void;
    addTask: (task: Task) => void;
    deleteTask: (index: number) => void;
    updateTask: (index: number, task: Task) => void;
};

export function useListTaskViewModel(): ListTaskState & ListTaskActions {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = () => {
        setLoading(true);
        const tasks = taskRepository.getAll();
        setTasks(tasks);
        setLoading(false);
    };

    const addTask = (task: Task) => {
        taskRepository.add(task);
        loadTasks();
    };

    const deleteTask = (index: number) => {
        taskRepository.delete(index);
        loadTasks();
    };

    const updateTask = (index: number, task: Task) => {
        taskRepository.update(index, task);
        loadTasks();
    };

    return {
        // STATE
        loading,
        tasks,

        // ACTIONS
        loadTasks,
        addTask,
        deleteTask,
        updateTask,
    };
}
