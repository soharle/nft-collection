import { Comments } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICollectionRepository } from "../../model/collection/ICollectionRepository";
import { Comment } from "../../model/comment/Comment";
import { ICommentsRepository } from "../../model/comment/ICommentsRepository";


@injectable()
export class CommentsService {
    constructor(@inject("ICommentsRepository") private commentsRepository: ICommentsRepository, @inject("ICollectionRepository") private collectionRepository: ICollectionRepository) { }

    public async create(text: string | null, rating: number, collectionId: string, userId: string): Promise<Comment | null> {
        const collection = await this.collectionRepository.findById(collectionId);
        //check if collection exists and if it is public
        if (collection === null || !collection.isPublic && collection.userId !== userId) {
            return null;
        }


        return this.commentsRepository.createComment(text, rating, collectionId, userId);
    }

    public async update(text: string | null, rating: number, commentId: string, userId: string): Promise<Comment | null> {
        const comment = await this.commentsRepository.findById(commentId);
        //check if comment exists and if it belongs to the user
        if (comment === null || comment.userId !== userId) {
            return null;
        }

        return this.commentsRepository.updateComment(commentId, text, rating);
    }

    public async delete(id: string, userId: string): Promise<Comment | null> {
        const comment = await this.commentsRepository.findById(id);
        //check if comment exists and if it belongs to the user
        if (comment === null || comment.userId !== userId) {
            return null;
        }
        return this.commentsRepository.deleteComment(id);
    }

    public async getCommentsByCollectionId(collectionId: string, userId: string): Promise<Comments[] | null> {
        const collection = await this.collectionRepository.findById(collectionId);
        //check if collection exists and if it is public
        if (collection === null || !collection.isPublic && collection.userId !== userId) {
            return null;
        }

        return this.commentsRepository.getAllByCollection(collectionId);
    }

    public async getPublicCommentsByCollectionId(collectionId: string): Promise<Comments[] | null> {
        return this.commentsRepository.getAllByCollectionPublic(collectionId);
    }

    public async getCommentsByUserId(userId: string): Promise<Comments[] | null> {
        return this.commentsRepository.getAllByUser(userId);
    }
}