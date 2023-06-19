import { BaseResponse } from "../BaseResponse";

export interface NftResponse extends BaseResponse {
    name: string;
    tokenId: string;
    tokenAddress: string;
    tokenHash: string;
    tokenUri: string | null;
}

export interface NftListResponse extends BaseResponse {
    nfts: {
        name: string;
        tokenId: string;
        tokenAddress: string;
        tokenHash: string;
        tokenUri: string | null;
    }[];
}