import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { TextInput } from "react-native";
import { useCreateTaskViewModel } from "../viewmodel/useCreateTaskViewModel";
import { useState } from "react";
import { Task } from "../model/entities/Task";
import { FeedbackCard } from "../view/components/FeedbackCard";

export default function CreateTaskScreen() {
  const router = useRouter();

  const { state, actions } = useCreateTaskViewModel({
    id: "",
    titulo: "",
    descricao: "",
    timeStamp: Date.now(),
  });

  const { loading, error } = state;
  const { createTask } = actions;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSaveTask = async () => {
    const newTask: Task = {
      id: `${Date.now()}`,
      titulo: title,
      descricao: description,
      timeStamp: Date.now(),
    };

    const success = await createTask(newTask);
    if (success) {
      setSuccessMessage("Tarefa criada com sucesso!");
      setTimeout(() => {
        setSuccessMessage(null);
        router.back();
      }, 1500);
    }
  };

  return (
    <Box className="flex-1 bg-gray-100">
      
      {/* Header */}
      <Box className="py-5 px-6 bg-gray-600 shadow-md rounded-b-3xl">
        <Text className="text-center text-white text-xl font-extrabold">
          Criar Nova Tarefa
        </Text>
      </Box>

      {/* Feedback Cards */}
      {error ? (
        <Box className="mt-4 px-4">
          <FeedbackCard
            type="error"
            title="Erro"
            message={error}
            onClose={() => {}}
          />
        </Box>
      ) : null}

      {successMessage ? (
        <Box className="mt-4 px-4">
          <FeedbackCard
            type="success"
            title="Sucesso"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        </Box>
      ) : null}

      {/* Form Container */}
      <Box className="mt-6 px-5">
        <Box className="bg-white p-5 rounded-2xl shadow-md">
          
          <Text className="text-black font-semibold mb-2">Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título da tarefa"
            className="p-4 bg-gray-100 rounded-xl border border-gray-200"
          />

          <Text className="text-black font-semibold mt-4 mb-2">Descrição</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Digite a descrição da tarefa"
            className="p-4 bg-gray-100 rounded-xl border border-gray-200"
            multiline
          />

          {error && (
            <Text className="text-red-500 mt-2">{error}</Text>
          )}

        </Box>

        {/* Save Button */}
        <Pressable
          onPress={handleSaveTask}
          disabled={loading}
          className={`mt-6 p-4 rounded-2xl shadow-xl ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-center text-white text-lg font-bold">
            {loading ? "Salvando..." : "Salvar Tarefa"}
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
}
