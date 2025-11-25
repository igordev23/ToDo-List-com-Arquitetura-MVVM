import { useState, useRef } from "react";
import { task } from "../model/entities/Task";
import { taskRepository } from "../model/repositories/taskRepository";

type ListTaskState = {
    loading: boolean;
    tasks: task[];
}

type ListTaskActions = {
    loadTasks: () => void;
    addTask: (task: task) => void;
    deleteTask: (task: task) => void;
    updateTask: (task: task) => void;
    setTask: (task: task) => void;
}

export function useListTaskViewModel(): ListTaskState & ListTaskActions {

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<task[]>([]);

    const loadTasks = async () => {
        setLoading(true);
        const tasks = await taskRepository.getAll();
        setTasks(tasks);
        setLoading(false);
    }
    const addTask = async (task: task) => {
        await taskRepository.add(task);
        loadTasks();
    }
    const deleteTask = async (task: task) => {
        await taskRepository.delete(task);
        loadTasks();
    }
    const updateTask = async (task: task) => {
        await taskRepository.update(task);
        loadTasks();
    }
    const setTask = async (task: task) => {
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