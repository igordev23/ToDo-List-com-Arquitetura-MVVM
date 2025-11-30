import { useRouter, useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { TextInput } from "react-native";
import { useDetailTaskViewModel } from "../viewmodel/useDetailTaskViewModel";
import { useEffect, useState } from "react";

export default function DetailTaskScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const { state, actions } = useDetailTaskViewModel(null);
  const { task, loading, error } = state;
  const { loadTask, updateTask, deleteTask } = actions;

  // Estados locais para os campos de entrada
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Estado para exibir mensagem dinâmica
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (index !== undefined) {
      loadTask(Number(index));
    }
  }, [index]);

  useEffect(() => {
    if (task) {
      setTitle(task.titulo ?? "");
      setDescription(task.descricao ?? "");
    }
  }, [task]);

  const handleUpdateTask = async () => {
    if (task && index !== undefined) {
      const updatedTask = {
        ...task,
        titulo: title,
        descricao: description,
      };
      const success = await updateTask(Number(index), updatedTask);
      if (success) {
        setSuccessMessage("Tarefa atualizada com sucesso!");
        setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
      }
    }
  };

  const handleDeleteTask = async () => {
    if (index !== undefined) {
      const success = await deleteTask(Number(index));
      if (success) {
        setSuccessMessage("Tarefa deletada com sucesso!");
        setTimeout(() => {
          setSuccessMessage(null);
          router.replace("./listTaskScreen");
        }, 3000); // Redireciona após 3 segundos
      }
    }
  };

  return (
    <Box className="flex-1 bg-white p-4">
      {/* Header */}
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Detalhes da Tarefa</Text>
      </Box>

      {/* Mensagem dinâmica */}
      {successMessage && (
        <Box className="mt-4 p-4 bg-green-100 rounded-lg shadow">
          <Text className="text-green-700 font-medium">{successMessage}</Text>
        </Box>
      )}

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
        <Pressable
          onPress={handleUpdateTask}
          disabled={loading || !task}
          className={`px-6 py-3 rounded-xl shadow-lg ${
            loading || !task ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-bold">
            {loading ? "Atualizando..." : "Atualizar Tarefa"}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDeleteTask}
          disabled={loading || !task}
          className={`px-6 py-3 rounded-xl shadow-lg ${
            loading || !task ? "bg-gray-400" : "bg-red-500"
          }`}
        >
          <Text className="text-white font-bold">
            {loading ? "Deletando..." : "Deletar Tarefa"}
          </Text>
        </Pressable>

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
