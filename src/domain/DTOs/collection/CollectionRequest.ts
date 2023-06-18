export interface CollectionRequest {
    title: string;
    description: string | null;
    isPublic: boolean;
}

export interface CollectionUpdateRequest {
    id: string;
    title: string;
    description: string | null;
    isPublic: boolean;
}