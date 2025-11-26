import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useListTaskViewModel } from "../viewmodel/useListTaskViewModel";
import { useEffect } from "react";

export default function ListTaskScreen() {
  const router = useRouter();
  const { state, actions } = useListTaskViewModel();
  const { tasks, loading } = state;
  const { loadTasks, deleteTask } = actions;

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Box className="flex-1 bg-white">
      {/* Header */}
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Lista de Tarefas</Text>
      </Box>

      {/* Lista de Tarefas */}
      <Box className="flex-1 p-4">
        {loading ? (
          <Text className="text-center text-gray-500">Carregando...</Text>
        ) : (
          tasks.map((task, index) => (
            <Box
              key={index}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow flex-row justify-between items-center"
            >
              {/* Informações da tarefa */}
              <Box className="flex-1">
                <Text className="text-black font-medium">{task.titulo}</Text>
                <Text className="text-gray-600 text-sm">{task.decricao}</Text>
                <Text className="text-gray-600 text-sm">
                  TimeStamp: {new Date(task.timeStamp ?? 0).toLocaleString()}
                </Text>
              </Box>

              {/* Botões de ação */}
              <Box className="flex-row items-center space-x-2">
                {/* Botão para detalhes */}
                <Pressable
                  onPress={() => router.push(`./detailTaskScreen?index=${index}`)}
                  className="px-4 py-2 bg-blue-500 rounded-lg"
                >
                  <Text className="text-white font-bold">Detalhes</Text>
                </Pressable>

                {/* Botão para deletar */}
                <Pressable
                  onPress={() => deleteTask(index)}
                  className="px-4 py-2 bg-red-500 rounded-lg"
                >
                  <Text className="text-white font-bold">Deletar</Text>
                </Pressable>
              </Box>
            </Box>
          ))
        )}
        

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
