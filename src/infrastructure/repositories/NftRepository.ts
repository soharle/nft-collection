import { Nft, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INftRepository } from "../../domain/model/nft/INftRepository";
import { ILogger } from "../../shared/interface/ILogger";

@injectable()
export class NftRepository implements INftRepository {
    constructor(private db: PrismaClient, @inject("ILogger") private logger: ILogger) { }
    public async getAllByCollection(collectionId: string): Promise<Nft[] | null> {
        try {
            return await this.db.nft.findMany({
                where: {
                    collectionId: collectionId
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }

    public async create(tokenId: string, tokenAddress: string, name: string, tokenHash: string, tokenUri: string, collectionId: string): Promise<Nft | null> {
        try {
            return this.db.nft.create({
                data: {
                    name: name,
                    tokenId: tokenId,
                    tokenHash: tokenHash,
                    tokenAddress: tokenAddress,
                    tokenUri: tokenUri,
                    collectionId: collectionId
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async getAllByCollectionPublic(collectionId: string): Promise<Nft[] | null> {
        try {
            return this.db.nft.findMany({
                include: {
                    Collection: true
                },
                where: {
                    collectionId: collectionId,
                    Collection: {
                        isPublic: true
                    }
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
    public async delete(id: string): Promise<boolean> {
        try {
            await this.db.nft.delete({
                where: {
                    id: id
                }
            });
            return true;
        } catch (e) {
            this.logger.error((e as Error).message);
            return false;
        }
    }
}
