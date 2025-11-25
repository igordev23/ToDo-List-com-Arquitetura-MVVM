import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function DetailTaskScreen() {
  const router = useRouter();

  return (
    <Box className="flex-1 bg-white p-4">
      {/* Header */}
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Detalhes da Tarefa</Text>
      </Box>

      {/* Detalhes da tarefa */}
      <Box className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <Text className="text-black font-medium">Título: Tarefa 1</Text>
        <Text className="text-gray-600 text-sm mt-2">
          Descrição: Esta é a descrição detalhada da tarefa 1.
        </Text>
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
