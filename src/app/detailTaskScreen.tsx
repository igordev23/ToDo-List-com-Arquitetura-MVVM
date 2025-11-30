import { useRouter, useLocalSearchParams } from "expo-router"; // Corrigido para usar useLocalSearchParams
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { TextInput } from "react-native";
import { useDetailTaskViewModel } from "../viewmodel/useDetailTaskViewModel";
import { useEffect, useState } from "react";

export default function DetailTaskScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams(); // Obtém o índice da tarefa a partir dos parâmetros da URL
  const { state, actions } = useDetailTaskViewModel(null);
  const { task, loading, error } = state;
  const { loadTask, updateTask, deleteTask } = actions;

  // Estados locais para os campos de entrada
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (index !== undefined) {
      loadTask(Number(index)); // Carrega a tarefa com base no índice
    }
  }, [index]);

  // Atualiza os campos de entrada quando a tarefa é carregada
  useEffect(() => {
    if (task) {
      setTitle(task.titulo ?? "");
      setDescription(task.descricao ?? "");
    }
  }, [task]);

  const handleUpdateTask = () => {
    if (task && index !== undefined) {
      // Atualiza a tarefa com os novos valores de título e descrição
      const updatedTask = {
        ...task,
        titulo: title,
        descricao: description,
      };
      updateTask(Number(index), updatedTask);
    }
  };

  const handleDeleteTask = () => {
    if (index !== undefined) {
      deleteTask(Number(index)); // Deleta a tarefa
      router.replace("./listTaskScreen"); // Redireciona para a lista de tarefas
    }
  };

  return (
    <Box className="flex-1 bg-white p-4">
      {/* Header */}
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Detalhes da Tarefa</Text>
      </Box>

      {/* Conteúdo principal */}
      <Box className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        {loading ? (
          <Text className="text-center text-gray-500">Carregando...</Text>
        ) : error ? (
          <Text className="text-center text-red-500">{error}</Text>
        ) : task ? (
          <>
            <Text className="text-black font-medium mb-2">Título</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Digite o título da tarefa"
              className="p-4 bg-gray-100 rounded-lg shadow mb-4"
            />

            <Text className="text-black font-medium mb-2">Descrição</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Digite a descrição da tarefa"
              className="p-4 bg-gray-100 rounded-lg shadow"
            />

            <Text className="text-gray-600 text-sm mt-4">
              TimeStamp: {new Date(task.timeStamp ?? 0).toLocaleString()}
            </Text>
          </>
        ) : (
          <Text className="text-center text-gray-500">
            Nenhuma tarefa encontrada.
          </Text>
        )}
      </Box>

      {/* Botões de ação */}
      <Box className="mt-4 space-y-4">
        {/* Botão para atualizar a tarefa */}
        <Pressable
          onPress={handleUpdateTask}
          disabled={loading || !task} // Desabilita se estiver carregando ou sem tarefa
          className={`px-6 py-3 rounded-xl shadow-lg ${
            loading || !task ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-bold">
            {loading ? "Atualizando..." : "Atualizar Tarefa"}
          </Text>
        </Pressable>

        {/* Botão para deletar a tarefa */}
        <Pressable
          onPress={handleDeleteTask}
          disabled={loading || !task} // Desabilita se estiver carregando ou sem tarefa
          className={`px-6 py-3 rounded-xl shadow-lg ${
            loading || !task ? "bg-gray-400" : "bg-red-500"
          }`}
        >
          <Text className="text-white font-bold">
            {loading ? "Deletando..." : "Deletar Tarefa"}
          </Text>
        </Pressable>

        {/* Botão para voltar */}
        <Pressable
          onPress={() => router.replace("./listTaskScreen")}
          className="px-6 py-3 bg-primary-500 rounded-xl shadow-lg"
        >
          <Text className="text-white font-bold">Voltar para Lista</Text>
        </Pressable>
      </Box>
    </Box>
  );
}
