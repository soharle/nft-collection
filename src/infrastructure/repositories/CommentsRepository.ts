import { PrismaClient } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { Comment } from "../../domain/model/comment/Comment";
import { ICommentsRepository } from "../../domain/model/comment/ICommentsRepository";
import { ILogger } from "../../shared/interface/ILogger";


@injectable()
export class CommentsRepository implements ICommentsRepository {
    constructor(private db: PrismaClient, @inject("ILogger") private logger: ILogger) { }
    public async getAllByCollection(collectionId: string): Promise<Comment[]> {
        try {
            return this.db.comments.findMany({
                where: {
                    collectionId: collectionId
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return [];
        }
    }
    public async getAllByUser(user: string): Promise<Comment[]> {
        try {
            return this.db.comments.findMany({
                where: {
                    userId: user
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return [];
        }
    }
    public async findById(id: string): Promise<Comment | null> {
        try {
            return this.db.comments.findUnique({
                where: {
                    id: id
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async createComment(text: string | null, rating: number, collectionId: string, userId: string): Promise<Comment | null> {
        try {
            return this.db.comments.create({
                data: {
                    rating: rating,
                    text: text,
                    User: {
                        connect: {
                            id: userId
                        }
                    },
                    Collection: {
                        connect: {
                            id: collectionId
                        }
                    }
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async updateComment(commentId: string, text: string | null, rating: number): Promise<Comment | null> {
        try {
            return this.db.comments.update({
                where: {
                    id: commentId
                },
                data: {
                    rating: rating,
                    text: text
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async deleteComment(id: string): Promise<Comment | null> {
        try {
            return this.db.comments.delete({
                where: {
                    id: id
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
}
