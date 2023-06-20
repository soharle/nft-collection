import { Collection } from "@prisma/client"

export interface ICollectionRepository {
    create(name: string, description: string | null, isPublic: boolean, userId: string): Promise<Collection | null>
    findById(id: string): Promise<Collection | null>
    allFromUser(userId: string): Promise<Collection[]>
    getPublic(id: string): Promise<Collection | null>
    allPublic(): Promise<Collection[]>
    delete(collectionId: string): Promise<Collection | null>
    update(collectionId: string, name: string, description: string | null, isPublic: boolean): Promise<Collection | null>
}
