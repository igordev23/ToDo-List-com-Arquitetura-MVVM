import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function ListTaskScreen() {
  const router = useRouter();

  return (
    <Box className="flex-1 bg-white">
      {/* Header */}
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Lista de Tarefas</Text>
      </Box>

      {/* Lista de Tarefas */}
      <Box className="flex-1 p-4">
        {/* Exemplo de tarefa com redirecionamento para detalhes */}
        <Pressable
          onPress={() => router.push("./detailTaskScreen")}
          className="mb-4 p-4 bg-gray-100 rounded-lg shadow"
        >
          <Text className="text-black font-medium">Tarefa 1</Text>
          <Text className="text-gray-600 text-sm">Descrição da tarefa 1</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("./detailTaskScreen")}
          className="mb-4 p-4 bg-gray-100 rounded-lg shadow"
        >
          <Text className="text-black font-medium">Tarefa 2</Text>
          <Text className="text-gray-600 text-sm">Descrição da tarefa 2</Text>
        </Pressable>

        {/* Botão para criar nova tarefa */}
        <Pressable
          onPress={() => router.push("./createTaskScreen")}
          className="mt-4 px-6 py-3 bg-primary-500 rounded-xl shadow-lg"
        >
          <Text className="text-white font-bold">Adicionar Nova Tarefa</Text>
        </Pressable>
      </Box>
    </Box>
  );
}
