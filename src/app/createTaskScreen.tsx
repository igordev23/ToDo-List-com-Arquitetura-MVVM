import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { usePhotoDetailViewModel } from "../viewmodel/usePhotoDetailViewModel";
import { useRouter, useLocalSearchParams } from "expo-router";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { uri, latitude, longitude, timestamp } = useLocalSearchParams();

  const initialPhoto = {
    uri: uri as string,
    latitude: latitude ? parseFloat(latitude as string) : null,
    longitude: longitude ? parseFloat(longitude as string) : null,
    timestamp: timestamp ? parseInt(timestamp as string, 10) : Date.now(),
  };

  const { state: { photo } } = usePhotoDetailViewModel(initialPhoto);

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

  if (!photo) {
    return (
      <Box className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500 text-lg">
          Erro ao carregar detalhes.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-black p-4">

      {/* Botão Voltar */}
      <Pressable onPress={() => router.replace("/galery")} className="mb-4">
        <Text className="text-white text-lg">⬅ Voltar</Text>
      </Pressable>

      {/* Foto */}
      <Image
        source={{ uri: photo.uri }}
        alt="photo"
        className="w-full h-[300px] rounded-xl"
        resizeMode="cover"
      />

      {/* Data */}
      <Text className="text-white mt-4 text-base">
        📅 {formatDate(photo.timestamp)}
      </Text>

      {/* Coordenadas */}
      <Text className="text-white mt-2">
        📍 Latitude: {photo.latitude ?? "N/A"}
      </Text>
      <Text className="text-white">
        📍 Longitude: {photo.longitude ?? "N/A"}
      </Text>

      {/* MAPA */}
      {photo.latitude && photo.longitude ? (
        <Box className="mt-4 h-[250px] rounded-xl overflow-hidden">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: photo.latitude,
              longitude: photo.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: photo.latitude,
                longitude: photo.longitude,
              }}
            />
          </MapView>
        </Box>
      ) : (
        <Text className="text-gray-400 text-center mt-4">
          Localização não disponível
        </Text>
      )}
    </Box>
  );
}
