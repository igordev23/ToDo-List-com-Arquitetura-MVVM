import { Modal, View } from "react-native";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

interface ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: () => void; // executa o delete
  onCancel: () => void;  // fecha o modal
}

export function ConfirmDeleteModal({
  visible,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white p-6 rounded-xl w-full max-w-sm">
          <Text className="text-lg font-bold text-black mb-4 text-center">
            Deseja mesmo deletar?
          </Text>

          <View className="flex-row justify-around mt-4">
            <Pressable
              onPress={onConfirm}
              className="px-6 py-2 bg-red-500 rounded-lg"
            >
              <Text className="text-white font-semibold">Sim</Text>
            </Pressable>

            <Pressable
              onPress={onCancel}
              className="px-6 py-2 bg-gray-300 rounded-lg"
            >
              <Text className="text-black font-semibold">Não</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
