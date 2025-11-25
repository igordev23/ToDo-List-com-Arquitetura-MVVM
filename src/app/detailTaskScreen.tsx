import { useRouter, useLocalSearchParams } from "expo-router"; // Corrigido para usar useLocalSearchParams
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useDetailTaskViewModel } from "../viewmodel/useDetailTaskViewModel";
import { useEffect } from "react";

export default function DetailTaskScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams(); // Obtém o índice da tarefa a partir dos parâmetros da URL
  const { state, actions } = useDetailTaskViewModel(null);
  const { task, loading, error } = state;
  const { loadTask } = actions;

  useEffect(() => {
    if (index !== undefined) {
      loadTask(Number(index)); // Carrega a tarefa com base no índice
    }
  }, [index]);

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
            <Text className="text-black font-medium">Título: {task.titulo}</Text>
            <Text className="text-gray-600 text-sm mt-2">
              Descrição: {task.decricao}
            </Text>
            <Text className="text-gray-600 text-sm mt-2">
              TimeStamp: {new Date(task.timeStamp ?? 0).toLocaleString()}

            </Text>
          </>
        ) : (
          <Text className="text-center text-gray-500">Nenhuma tarefa encontrada.</Text>
        )}
      </Box>

      {/* Botão para voltar */}
      <Pressable
        onPress={() => router.replace("./listTaskScreen")}
        className="mt-4 px-6 py-3 bg-primary-500 rounded-xl shadow-lg"
      >
        <Text className="text-white font-bold">Voltar para Lista</Text>
      </Pressable>
    </Box>
  );
}
