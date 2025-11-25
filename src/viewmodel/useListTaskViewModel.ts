import { CameraType, useCameraPermissions, CameraView } from "expo-camera";
import * as Location from "expo-location";
import { useState, useRef } from "react";
import { MyPhoto } from "../model/entities/Task";
import { photoRepository } from "../model/repositories/taskRepository";

type IndexState = {
    facing: CameraType;
    loading: boolean;
    cameraRef: React.RefObject<CameraView|null>;
    cameraPermission: boolean;
    locationPermission: boolean;
}

type IndexActions = {
    toggleFacing: () => void;
    takePhoto: () => void;
    requestCameraPermission: () => Promise<void>;
    requestLocationPermission: () => Promise<void>;
}

export function useIndexViewModel(): IndexState & IndexActions {
    const [facing, setFacing] = useState<CameraType>("back");
    const [loading, setLoading] = useState(false);

    const cameraRef = useRef<CameraView>(null);

    const [permission, requestPermission] = useCameraPermissions();
    const [cameraPermission, setCameraPermission] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);

    const requestCameraPermission = async () => {
        const res = await requestPermission();
        setCameraPermission(res.granted);
    };

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === "granted");
    };

    const toggleFacing = () => {
        setFacing(prev => (prev === "back" ? "front" : "back"));
    };

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        setLoading(true);
        try {
            const result = await cameraRef.current.takePictureAsync({ quality: 0.5 });

            let latitude: number | null = null;
            let longitude: number | null = null;

            if (locationPermission) {
                const loc = await Location.getCurrentPositionAsync({});
                latitude = loc.coords.latitude;
                longitude = loc.coords.longitude;
            }

            const newPhoto: MyPhoto = {
                uri: result.uri,
                latitude,
                longitude,
                timestamp: Date.now()
            };

            photoRepository.add(newPhoto); // 🔥 ADD NO REPOSITÓRIO
        } finally {
            setLoading(false);
        }
    };

    return {
        // STATE
        facing,
        loading,
        cameraRef,
        cameraPermission,
        locationPermission,

        // ACTIONS
        toggleFacing,
        takePhoto,
        requestCameraPermission,
        requestLocationPermission,
    };
}
