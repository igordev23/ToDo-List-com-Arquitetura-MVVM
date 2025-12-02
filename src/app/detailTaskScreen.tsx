import { useRouter, useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { TextInput } from "react-native";
import { useDetailTaskViewModel } from "../viewmodel/useDetailTaskViewModel";
import { useEffect, useState } from "react";
import { FeedbackCard } from "../view/components/FeedbackCard";
import { ConfirmDeleteModal } from "../view/components/alertMessenger";

// ICONS
import { Save, Trash2 } from "lucide-react-native";

export default function DetailTaskScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const { state, actions } = useDetailTaskViewModel(null);

  const { task, loading, error } = state;
  const { loadTask, updateTask, deleteTask } = actions;

  const [modalVisible, setModalVisible] = useState(false);
  const [taskIndexToDelete, setTaskIndexToDelete] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // FEEDBACK
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (index !== undefined) loadTask(Number(index));
  }, [index]);

  useEffect(() => {
    if (task) {
      setTitle(task.titulo ?? "");
      setDescription(task.descricao ?? "");
    }
  }, [task]);

  const showFeedback = (type: any, message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 2500);
  };

  const askDelete = (index: number) => {
    setTaskIndexToDelete(index);
    setModalVisible(true);
  };

  const handleUpdateTask = async () => {
    if (task && index !== undefined) {
      const updatedTask = {
        ...task,
        titulo: title,
        descricao: description,
      };

      const success = await updateTask(Number(index), updatedTask);

      showFeedback(
        success ? "success" : "error",
        success ? "Tarefa atualizada com sucesso!" : "Erro ao atualizar tarefa."
      );
    }
  };

  const handleDeleteTask = async () => {
    if (index !== undefined) {
      const success = await deleteTask(Number(index));

      showFeedback(
        success ? "success" : "error",
        success ? "Tarefa deletada com sucesso!" : "Erro ao deletar tarefa."
      );

      if (success) setTimeout(() => router.replace("./listTaskScreen"), 2500);
    }
  };

  return (
    <Box className="flex-1 bg-gray-50 p-0">
      {/* HEADER */}
      <Box className="py-5 px-6 bg-gray-600 shadow-md rounded-b-3xl">
        <Text className="text-center text-white text-xl font-bold tracking-wide">
          Detalhes da Tarefa
        </Text>
      </Box>

      {/* FEEDBACK CARD */}
      {feedback && (
        <Box className="mt-4 px-4">
          <FeedbackCard
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        </Box>
      )}

      {/* CARD */}
      <Box className="mt-6 mx-4 p-5 bg-white rounded-2xl shadow-lg border border-gray-200">
        {loading ? (
          <Text className="text-center text-gray-500">Carregando...</Text>
        ) : error ? (
          <FeedbackCard type="error" message={error} />
        ) : task ? (
          <>
            {/* TÍTULO */}
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              Título
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Digite o título da tarefa"
              className="p-4 bg-gray-100 rounded-xl border border-gray-300 mb-5"
            />

            {/* DESCRIÇÃO */}
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              Descrição
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Digite a descrição da tarefa"
              className="p-4 bg-gray-100 rounded-xl border border-gray-300"
            />

            {/* TIMESTAMP */}
            <Text className="text-gray-500 text-sm mt-4 italic text-right">
              Criada em: {new Date(task.timeStamp ?? 0).toLocaleString()}
            </Text>
          </>
        ) : (
          <FeedbackCard type="info" message="Nenhuma tarefa encontrada." />
        )}
      </Box>

      {/* BOTÕES COM ÍCONES */}
      <Box className="mt-8 flex-row justify-around items-center px-6">
        {/* EDITAR */}
        <Pressable onPress={handleUpdateTask} disabled={loading || !task} className="items-center">
          <Save size={32} color={loading ? "#9CA3AF" : "#2563EB"} />
          <Text className={`mt-1 font-medium ${loading ? "text-gray-400" : "text-blue-600"}`}>
            Salvar
          </Text>
        </Pressable>

        {/* DELETAR */}
        <Pressable onPress={() => askDelete(Number(index))} disabled={loading || !task} className="items-center">
          <Trash2 size={32} color={loading ? "#9CA3AF" : "#DC2626"} />
          <Text className={`mt-1 font-medium ${loading ? "text-gray-400" : "text-red-600"}`}>
            Deletar
          </Text>
        </Pressable>
      </Box>

      {/* BOTÃO VOLTAR */}
      <Pressable
        onPress={() => router.replace("./listTaskScreen")}
        className="mx-6 mt-10 py-4 bg-gray-400 rounded-xl shadow-lg"
      >
        <Text className="text-white font-bold text-center">Voltar para Lista</Text>
      </Pressable>

      {/* MODAL DELETAR */}
      <ConfirmDeleteModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          handleDeleteTask();
        }}
      />
    </Box>
  );
}
