import { Collection } from "../../model/collection/Collection";
import { BaseResponse } from "../BaseResponse";

export interface CollectionResponse extends BaseResponse {
    id: string;
    title: string;
    description: string | null;
    isPublic: boolean;
    userId: string;
}

export interface CollectionListResponse extends BaseResponse {
    collections: {
        id: string;
        title: string;
        description: string | null;
        isPublic: boolean;
        userId: string;
    }[];
}