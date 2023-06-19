import { BaseResponse } from "../BaseResponse";


export interface CommentsResponse extends BaseResponse {
    id: string;
    text: string | null;
    rating: number;
    userId: string;
    collectionId: string;
}

export interface CommentsListResponse extends BaseResponse {
    comments: {
        id: string;
        text: string | null;
        rating: number;
        userId: string;
        collectionId: string;
    }[];
}