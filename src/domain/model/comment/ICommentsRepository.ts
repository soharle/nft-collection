import { Comment } from "./Comment";


export interface ICommentsRepository {
    findById(id: string): Promise<Comment | null>;
    createComment(text: string | null, rating: number, collectionId: string, userId: string): Promise<Comment | null>;
    updateComment(commentId: string, text: string | null, rating: number): Promise<Comment | null>;
    deleteComment(id: string): Promise<Comment | null>;
    getAllByCollection(collectionId: string): Promise<Comment[]>;
    getAllByCollectionPublic(collectionId: string): Promise<Comment[]>;
    getAllByUser(user: string): Promise<Comment[]>;
}