import { MyPhoto } from "../entities/Task";

class PhotoRepository {
    private photos: MyPhoto[] = [];

    getAll(): MyPhoto[] {
        return this.photos;
    }

    add(photo: MyPhoto) {
        this.photos = [photo, ...this.photos];
    }

    delete(uri: string) {
        this.photos = this.photos.filter(p => p.uri !== uri);
    }
}

export const photoRepository = new PhotoRepository();
