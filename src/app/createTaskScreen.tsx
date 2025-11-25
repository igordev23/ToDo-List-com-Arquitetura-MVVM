import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { TextInput } from "react-native";
import { useCreateTaskViewModel } from "../viewmodel/useCreateTaskViewModel";
import { useState } from "react";
import { Task } from "../model/entities/Task";

export default function CreateTaskScreen() {
  const router = useRouter();

  // Inicializa o ViewModel com uma tarefa vazia
  const { state, actions } = useCreateTaskViewModel({
    id: "",
    titulo: "",
    decricao: "",
    timeStamp: Date.now(),
  });

  const { task, loading } = state;
  const { createTask } = actions;

  // Estados locais para os campos de entrada
  const [title, setTitle] = useState(task.titulo ?? ""); // Garante que o valor inicial seja uma string
  const [description, setDescription] = useState(task.decricao ?? ""); // Garante que o valor inicial seja uma string

  const handleSaveTask = () => {
    // Cria a nova tarefa usando o ViewModel
    const newTask: Task = {
      id: `${Date.now()}`, // Gera um ID único baseado no timestamp atual
      titulo: title,
      decricao: description,
      timeStamp: Date.now(),
    };
    createTask(newTask);
    // Redireciona para a lista de tarefas
    router.replace("./listTaskScreen");
  };

  return (
    <Box className="flex-1 bg-white p-4">
      {/* Header */}
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Criar Nova Tarefa</Text>
      </Box>

      {/* Formulário para criar tarefa */}
      <Box className="mt-4">
        <Text className="text-black font-medium mb-2">Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título da tarefa"
          className="p-4 bg-gray-100 rounded-lg shadow"
        />

        <Text className="text-black font-medium mt-4 mb-2">Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Digite a descrição da tarefa"
          className="p-4 bg-gray-100 rounded-lg shadow"
        />
      </Box>

      {/* Botão para salvar tarefa */}
      <Pressable
        onPress={handleSaveTask}
        disabled={loading} // Desabilita o botão enquanto está carregando
        className={`mt-4 px-6 py-3 rounded-xl shadow-lg ${
          loading ? "bg-gray-400" : "bg-primary-500"
        }`}
      >
        <Text className="text-white font-bold">
          {loading ? "Salvando..." : "Salvar Tarefa"}
        </Text>
      </Pressable>
    </Box>
  );
}
