import { Collection, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICollectionRepository } from "../../domain/model/collection/ICollectionRepository";
import { ILogger } from "../../shared/interface/ILogger";


@injectable()
export class CollectionRepository implements ICollectionRepository {
    constructor(private db: PrismaClient, @inject("ILogger") private logger: ILogger) { }
    public async allPublic(): Promise<Collection[]> {
        try {
            return this.db.collection.findMany({
                where: {
                    isPublic: true
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return [];
        }
    }

    public async getPublic(id: string): Promise<Collection | null> {
        try {
            return this.db.collection.findFirst({
                where: {
                    id: id,
                    isPublic: true
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }

    public async create(title: string, description: string | null, isPublic: boolean, userId: string): Promise<Collection | null> {
        try {
            return this.db.collection.create({
                data: {
                    title: title,
                    description: description,
                    isPublic: isPublic,
                    User: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
        }
        catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async findById(id: string): Promise<Collection | null> {
        try {
            return this.db.collection.findUnique({
                where: {
                    id: id
                }
            });
        }
        catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async allFromUser(userId: string): Promise<Collection[]> {
        try {
            return this.db.collection.findMany({
                where: {
                    userId: userId
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return [];
        }
    }

    public async delete(collectionId: string): Promise<Collection | null> {
        try {
            return this.db.collection.delete({
                where: {
                    id: collectionId
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async update(collectionId: string, name: string, description: string | null, isPublic: boolean): Promise<Collection | null> {
        try {
            return this.db.collection.update({
                where: {
                    id: collectionId
                },
                data: {
                    title: name,
                    description: description,
                    isPublic: isPublic
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }

}