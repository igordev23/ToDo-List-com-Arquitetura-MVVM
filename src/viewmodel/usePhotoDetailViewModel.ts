import { useState } from "react";
import { MyPhoto } from "../model/entities/MyPhoto";

// Definição dos tipos para State e Actions
export type PhotoDetailState = {
    photo: MyPhoto | null;
};

export type PhotoDetailActions = {
    updatePhoto: (newPhoto: MyPhoto) => void;
};

export const usePhotoDetailViewModel = (
    initialPhoto: MyPhoto | null
): { state: PhotoDetailState; actions: PhotoDetailActions } => {
    // Estado
    const [photo, setPhoto] = useState<MyPhoto | null>(initialPhoto);

    // Ação para atualizar a foto
    const updatePhoto = (newPhoto: MyPhoto) => {
        setPhoto(newPhoto);
    };

    // Retorno no formato MVVM
    return {
        state: {
            photo,
        },
        actions: {
            updatePhoto,
        },
    };
};
