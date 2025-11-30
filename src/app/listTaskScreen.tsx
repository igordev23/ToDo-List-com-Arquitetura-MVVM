import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useListTaskViewModel } from "../viewmodel/useListTaskViewModel";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Trash2 } from "lucide-react-native";
import { truncate } from "../utils/textUtils";
import { FeedbackCard } from "../view/components/FeedbackCard";

export default function ListTaskScreen() {
  const router = useRouter();
  const { state, actions } = useListTaskViewModel();
  const { tasks, loading, error } = state;
  const { loadTasks, deleteTask } = actions;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useFocusEffect(() => {
    loadTasks();
  });

  // Se acontecer um erro, mostrar feedback
  useEffect(() => {
    if (error) {
      setSuccessMessage(null); // apaga mensagem de sucesso
    }
  }, [error]);

  const handleDelete = async (index: number) => {
    await deleteTask(index);

    // Se após o delete NÃO houver erro → sucesso
    if (!state.error) {
      setSuccessMessage("Tarefa excluída com sucesso!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2500);
    }
  };

  const renderTaskItem = ({ item: task, index }: { item: any; index: number }) => (
    <Pressable
      onPress={() => router.replace(`./detailTaskScreen?index=${index}`)}
      className="mb-4 p-4 bg-white rounded-2xl shadow-md border border-gray-200 active:opacity-90 flex-row justify-between items-center"
    >
      <Box className="flex-1 pr-3">
        <Text className="text-black font-bold text-lg">
          {truncate(task.titulo, 30)}
        </Text>

        <Text className="text-gray-600 text-sm mt-1">
          {truncate(task.descricao, 50)}
        </Text>

        <Text className="text-gray-400 text-xs mt-1">
          {new Date(task.timeStamp ?? 0).toLocaleString()}
        </Text>
      </Box>

      <Pressable
        onPress={() => handleDelete(index)}
        className="p-2 bg-red-500 rounded-full active:opacity-80"
      >
        <Trash2 size={20} color="white" />
      </Pressable>
    </Pressable>
  );

  return (
    <Box className="flex-1 bg-white">
      <Box className="py-4 px-6 bg-primary-500">
        <Text className="text-white text-lg font-bold">Lista de Tarefas</Text>
      </Box>

      <Box className="flex-1 p-4">

        {/* FEEDBACK DE SUCESSO */}
        {successMessage && (
          <Box className="mb-4">
            <FeedbackCard
              type="success"
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
            />
          </Box>
        )}

        {/* FEEDBACK DE ERRO (DO VIEWMODEL) */}
        {error && (
          <Box className="mb-4">
            <FeedbackCard
              type="error"
              message={error}
              onClose={() => {}}
            />
          </Box>
        )}

        {loading ? (
          <Text className="text-center text-gray-500">Carregando...</Text>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 26 }}
          />
        )}

        <Pressable
          onPress={() => router.push("./createTaskScreen")}
          className="mt-4 px-6 mb-6 py-3 bg-primary-500 rounded-xl shadow-lg"
        >
          <Text className="text-white font-bold">Adicionar Nova Tarefa</Text>
        </Pressable>
      </Box>
    </Box>
  );
}
