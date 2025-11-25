import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { TextInput } from "react-native";

export default function CreateTaskScreen() {
  const router = useRouter();

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
          placeholder="Digite o título da tarefa"
          className="p-4 bg-gray-100 rounded-lg shadow"
        />

        <Text className="text-black font-medium mt-4 mb-2">Descrição</Text>
        <TextInput
          placeholder="Digite a descrição da tarefa"
          className="p-4 bg-gray-100 rounded-lg shadow"
        />
      </Box>

      {/* Botão para salvar tarefa */}
      <Pressable
        onPress={() => {
          // Lógica para salvar a tarefa
          router.replace("./listTaskScreen");
        }}
        className="mt-4 px-6 py-3 bg-primary-500 rounded-xl shadow-lg"
      >
        <Text className="text-white font-bold">Salvar Tarefa</Text>
      </Pressable>
    </Box>
  );
}
