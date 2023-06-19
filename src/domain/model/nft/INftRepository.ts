import { Nft } from "@prisma/client";


export interface INftRepository {
    create(tokenId: string, tokenAddress: string, name: string, tokenHash: string, tokenUri: string, collectionId: string): Promise<Nft | null>;
    getAllByCollection(collectionId: string): Promise<Nft[]>;
    delete(id: string): Promise<boolean>;
}