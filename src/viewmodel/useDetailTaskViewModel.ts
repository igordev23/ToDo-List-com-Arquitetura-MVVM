import { useState, useEffect, useCallback } from "react";
import { photoRepository } from "../model/repositories/taskRepository";
import { MyPhoto } from "../model/entities/Task";

// Definição dos tipos para State e Actions
export type UserGaleryState = {
    photos: MyPhoto[];
    selectedPhoto: MyPhoto | null;
    isLoading: boolean;
    error: string | null;
};

export type UserGaleryActions = {
    fetchPhotos: () => Promise<void>;
    deletePhoto: (uri: string) => Promise<void>;
    openPhoto: (photo: MyPhoto) => void;
    closePhoto: () => void;
};

export function useGaleryViewModel(): { state: UserGaleryState; actions: UserGaleryActions } {
    // States
    const [photos, setPhotos] = useState<MyPhoto[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<MyPhoto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Actions
    const fetchPhotos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedPhotos = await photoRepository.getAll();
            setPhotos(fetchedPhotos);
        } catch (err) {
            setError("Erro ao carregar fotos.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deletePhoto = useCallback(async (uri: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await photoRepository.delete(uri);
            await fetchPhotos(); // Atualiza a lista após deletar
        } catch (err) {
            setError("Erro ao deletar foto.");
        } finally {
            setIsLoading(false);
        }
    }, [fetchPhotos]);

    const openPhoto = useCallback((photo: MyPhoto) => {
        setSelectedPhoto(photo);
    }, []);

    const closePhoto = useCallback(() => {
        setSelectedPhoto(null);
    }, []);

    // Efeito para carregar as fotos ao montar o componente
    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    // Retorno no formato MVVM com os tipos definidos
    return {
        state: {
            photos,
            selectedPhoto,
            isLoading,
            error,
        },
        actions: {
            fetchPhotos,
            deletePhoto,
            openPhoto,
            closePhoto,
        },
    };
}
