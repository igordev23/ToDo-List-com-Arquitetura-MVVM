import { useGaleryViewModel } from "../viewmodel/useGaleryViewModel";
import { Modal } from "react-native";
import { useRouter } from "expo-router";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";

export default function GaleryScreen() {
  const router = useRouter();
  const {
    state: { photos, selectedPhoto, isLoading, error },
    actions: { fetchPhotos, deletePhoto, openPhoto, closePhoto },
  } = useGaleryViewModel();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box className="flex-1 bg-black">
      {/* HEADER */}
      <Pressable onPress={() => router.replace("/")} className="px-4 py-4">
        <Text className="text-white text-lg">⬅ Voltar</Text>
      </Pressable>

      {/* BOTÃO PARA ATUALIZAR FOTOS */}
      <Pressable
        onPress={fetchPhotos}
        className="bg-blue-600 mx-4 my-2 py-2 rounded-lg items-center"
      >
        <Text className="text-white font-bold">Atualizar Fotos</Text>
      </Pressable>

      {/* ERRO */}
      {error && (
        <Text className="text-red-500 text-center mt-2">{error}</Text>
      )}

      {/* LOADING */}
      {isLoading && (
        <Text className="text-white text-center mt-2">Carregando...</Text>
      )}

      {/* GRID DE FOTOS */}
      <Box className="flex-row flex-wrap justify-center">
        {photos.map((item) => (
          <Pressable key={item.uri} onPress={() => openPhoto(item)}>
            <Box className="m-1">
              <Image
                source={{ uri: item.uri }}
                alt="photo"
                className="w-[120px] h-[120px] rounded-lg"
              />

              <Pressable onPress={() => deletePhoto(item.uri)}>
                <Text className="text-red-500 text-center mt-1 font-semibold">
                  Excluir
                </Text>
              </Pressable>
            </Box>
          </Pressable>
        ))}
      </Box>

      {/* MODAL DE DETALHES */}
      <Modal visible={!!selectedPhoto} transparent animationType="fade">
        <Box className="flex-1 bg-black/70 justify-center items-center">
          {selectedPhoto && (
            <Box className="bg-[#111] p-5 rounded-xl w-[90%]">
              {/* FOTO */}
              <Image
                source={{ uri: selectedPhoto.uri }}
                alt="selected-photo"
                className="w-full h-[250px] rounded-xl"
                resizeMode="cover"
              />

              {/* DATA E HORA */}
              <Text className="text-white mt-4 text-base font-semibold">
                📅 {formatDate(selectedPhoto.timestamp)}
              </Text>

              {/* BOTÃO DETALHES */}
              <Pressable
                onPress={() => {
                  if (!selectedPhoto) return;

                  router.replace({
                    pathname: "/photoDetail",
                    params: {
                      uri: selectedPhoto.uri,
                      latitude: String(selectedPhoto.latitude ?? ""),
                      longitude: String(selectedPhoto.longitude ?? ""),
                      timestamp: String(selectedPhoto.timestamp),
                    },
                  });
                }}
                className="bg-blue-600 mt-4 py-2 rounded-lg items-center"
              >
                <Text className="text-white font-bold">Detalhes</Text>
              </Pressable>

              {/* FECHAR */}
              <Pressable
                onPress={closePhoto}
                className="bg-red-600 mt-4 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-bold">Fechar</Text>
              </Pressable>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
