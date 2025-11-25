import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function Home() {
  const router = useRouter();

  return (
    <Box className="flex-1 justify-center items-center bg-white">
      <Text className="text-black text-lg mb-4">Bem-vindo ao ToDo List!</Text>
      <Pressable
        onPress={() => router.replace("./listTaskScreen")}
        className="px-6 py-3 bg-primary-500 rounded-xl shadow-lg"
      >
        <Text className="text-white font-bold">Ir para Lista de Tarefas</Text>
      </Pressable>
    </Box>
  );
}
