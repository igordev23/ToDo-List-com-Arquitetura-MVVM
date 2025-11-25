import { CameraView } from "expo-camera";
import { useIndexViewModel } from "../viewmodel/UseIndexViewModel";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";

import { Camera, RefreshCcw, Image as ImageIcon } from "lucide-react-native";

export default function Home() {
  const router = useRouter();
  const vm = useIndexViewModel();

  useEffect(() => {
    vm.requestCameraPermission();
    vm.requestLocationPermission();
  }, []);

  if (!vm.cameraPermission) {
    return (
      <Box className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg mb-4">
          Permita acesso à câmera
        </Text>

        <Pressable
          onPress={vm.requestCameraPermission}
          className="px-6 py-3 bg-primary-500 rounded-xl shadow-lg"
        >
          <Text className="text-white font-bold">Permitir</Text>
        </Pressable>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-black">
      <CameraView
        ref={vm.cameraRef}
        style={{ flex: 1 }}
        facing={vm.facing}
      />

      {/* NOVA ÁREA DE BOTÕES — estilo moderno */}
      <Box
  className="
    absolute bottom-0 w-full 
    bg-black/30 
    flex justify-center items-center
    pb-12 pt-8
  "
  style={{ height: 160 }}   // ← AUMENTA A ALTURA DA BARRA
>
  <HStack
    space="xl"
    className="w-full justify-center items-center"
  >
    {/* BOTÃO FLIP */}
    <Pressable
      onPress={vm.toggleFacing}
      className="
        w-16 h-16 
        bg-white/15 
        rounded-full 
        justify-center items-center 
        shadow-lg 
        backdrop-blur-md
      "
    >
      <RefreshCcw color="white" size={32} />
    </Pressable>

    {/* BOTÃO PRINCIPAL DE FOTO */}
    <Pressable
      onPress={vm.takePhoto}
      className="
        w-24 h-24 
        bg-white 
        rounded-full 
        border-[6px] border-gray-300 
        justify-center items-center 
        shadow-2xl
        active:scale-95
      "
    >
      {vm.loading ? (
        <Text className="text-gray-800 font-bold text-lg">...</Text>
      ) : (
        <Camera color="#111" size={36} />
      )}
    </Pressable>

    {/* BOTÃO GALERIA */}
    <Pressable
      onPress={() => router.replace("/galery")}
      className="
        w-16 h-16 
        bg-white/15 
        rounded-full 
        justify-center items-center 
        shadow-lg 
        backdrop-blur-md
      "
    >
      <ImageIcon color="white" size={32} />
    </Pressable>
  </HStack>
</Box>

    </Box>
  );
}
