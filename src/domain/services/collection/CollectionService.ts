import { Collection } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { ICollectionRepository } from "../../model/collection/ICollectionRepository";


@injectable()
export class CollectionService {

    constructor(@inject("ICollectionRepository") private collectionRepository: ICollectionRepository) { }

    public async create(title: string, description: string | null, isPublic: boolean, userId: string): Promise<Collection | null> {
        return this.collectionRepository.create(title, description, isPublic, userId);
    }

    public async getPublic(id: string): Promise<Collection | null> {
        return this.collectionRepository.getPublic(id);
    }

    public async get(id: string, userId: string): Promise<Collection | null> {
        const collection = await this.collectionRepository.findById(id);
        //check if collection exists and if it belongs to the user
        if (collection === null || collection.userId !== userId) {
            return null;
        }
        return collection;
    }

    public async getAll(userId: string): Promise<Collection[]> {
        return this.collectionRepository.allFromUser(userId);
    }

    public async getAllPublic(): Promise<Collection[]> {
        return this.collectionRepository.allPublic();
    }

    public async delete(collectionId: string, userId: string): Promise<Collection | null> {
        const collection = await this.collectionRepository.findById(collectionId);
        //check if collection exists and if it belongs to the user
        if (collection === null || collection.userId !== userId) {
            return null;
        }
        return this.collectionRepository.delete(collectionId);
    }

    public async update(collectionId: string, name: string, description: string | null, isPublic: boolean, userId: string): Promise<Collection | null> {
        const collection = await this.collectionRepository.findById(collectionId);
        //check if collection exists and if it belongs to the user
        if (collection === null || collection.userId !== userId) {
            return null;
        }

        return this.collectionRepository.update(collectionId, name, description, isPublic);
    }
}