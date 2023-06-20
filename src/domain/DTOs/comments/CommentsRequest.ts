export interface CommentsCreateRequest {
    text: string;
    rating: number;
    collectionId: string;
}

export interface CommentsUpdateRequest {
    id: string;
    text: string;
    rating: number;
}