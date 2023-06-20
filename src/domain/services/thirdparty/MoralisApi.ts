import { inject, injectable } from "tsyringe";
import { Configuration } from "../../../config";
import Moralis from 'moralis'
import { Nft } from "../../model/nft/Nft";
import { ILogger } from "../../../shared/interface/ILogger";


@injectable()
export class MoralisApi {
    constructor(private config: Configuration, @inject("ILogger") private logger: ILogger) {
        Moralis.start({
            apiKey: this.config.MORALIS_API_KEY,
        })
    }
    public async searchByNameNft(query: string): Promise<Nft[] | null> {
        try {
            const response = await Moralis.EvmApi.nft.searchNFTs({
                "chain": "0x1",
                "format": "decimal",
                "filter": "name",
                "q": query,
                "limit": 20,
            })

            return response.result.map((nft) => {
                return {
                    tokenId: nft.token.tokenId as string,
                    tokenAddress: nft.token.tokenAddress.checksum,
                    name: nft.token.name as string,
                    tokenHash: nft.token.tokenHash as string,
                    tokenUri: nft.token.tokenUri as string
                }
            })
        } catch (e) {
            this.logger.error((e as Error).message)
            return null
        }
    }

    public async getNft(tokenId: string, tokenAddress: string): Promise<Nft | null> {
        try {
            const response = await Moralis.EvmApi.nft.getNFTMetadata({
                "chain": "0x1",
                "format": "decimal",
                "mediaItems": false,
                "address": tokenAddress,
                "tokenId": tokenId
            });

            if (response?.result) {
                return {
                    tokenId: response.result.tokenId as string,
                    tokenAddress: response.result.tokenAddress.checksum,
                    name: response.result.name as string,
                    tokenHash: response.result.tokenHash as string,
                    tokenUri: response.result.tokenUri as string
                }
            }

            return null;
        } catch (e) {
            this.logger.error((e as Error).message)
            return null
        }
    }
}