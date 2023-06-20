import { inject, injectable } from "tsyringe";
import { INftRepository } from "../../model/nft/INftRepository";
import { Nft as NftModel } from "../../model/nft/Nft";
import { Nft } from "@prisma/client";
import { MoralisApi } from "../thirdparty/MoralisApi";
import { ICollectionRepository } from "../../model/collection/ICollectionRepository";

@injectable()
export class NftService {
    constructor(@inject("INftRepository") private nftRepository: INftRepository, @inject("ICollectionRepository") private collectionRepository: ICollectionRepository, private api: MoralisApi) {
    }

    public async create(tokenId: string, tokenAddress: string, collectionId: string, userId: string): Promise<Nft | null> {
        const collection = await this.collectionRepository.findById(collectionId);
        if (!collection || collection.userId !== userId) {
            return null;
        }

        const nft = await this.api.getNft(tokenId, tokenAddress);
        if (!nft) {
            return null;
        }

        return this.nftRepository.create(tokenId, tokenAddress, nft.name, nft.tokenHash, nft.tokenUri, collectionId);
    }

    public async search(query: string): Promise<NftModel[] | null> {
        return this.api.searchByNameNft(query);
    }

    public async getAllByCollectionPublic(collectionId: string): Promise<Nft[] | null> {
        return this.nftRepository.getAllByCollectionPublic(collectionId);
    }

    public async getAllByCollection(collectionId: string, userId: string): Promise<Nft[] | null> {
        const collection = await this.collectionRepository.findById(collectionId);
        if (!collection || collection.userId !== userId) {
            return null;
        }
        return this.nftRepository.getAllByCollection(collectionId);
    }
}