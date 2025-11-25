import { useState } from "react";
import { Task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

type ListTaskState = {
    loading: boolean;
    tasks: Task[];
}

type ListTaskActions = {
    loadTasks: () => void;
    addTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    setTask: (task: Task) => void;
}

export function useListTaskViewModel(): ListTaskState & ListTaskActions {

    const [loading, setLoading] = useState(false);
                const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async () => {
        setLoading(true);
        const tasks = await taskRepository.getAll();
        setTasks(tasks);
        setLoading(false);
    }
    const addTask = async (task: Task) => {
        await taskRepository.add(task);
        loadTasks();
    }
    const deleteTask = async (task: Task) => {
        await taskRepository.delete(task);
        loadTasks();
    }
    const updateTask = async (task: Task) => {
        await taskRepository.update(task);
        loadTasks();
    }
    const setTask = async (task: Task) => {
        await taskRepository.set(task);
        loadTasks();
    }


    return {

        // STATE
        loading,
        tasks,

        // ACTIONS
        loadTasks,
        addTask,
        deleteTask,
        updateTask,
        setTask,
    }
}