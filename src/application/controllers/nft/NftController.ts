import { Route, Tags, Controller, Response, Res, Post, Body, Request, Path, Security, Get } from "tsoa";
import { injectable } from "tsyringe";
import express from "express";
import { BaseResponse } from "../../../domain/DTOs/BaseResponse";
import { NftCreateRequest } from "../../../domain/DTOs/nft/NftRequest";
import { NftListResponse, NftResponse } from "../../../domain/DTOs/nft/NftResponse";
import { NftService } from "../../../domain/services/nft/NftService";
import { UserJwt } from "../../../domain/model/user/User";
import { UserLoginResponse } from "../../../domain/DTOs/user/UserLogin";



@Route("nft")
@Tags("Nft")
@injectable()
export class NftController extends Controller {
    constructor(private nftService: NftService) {
        super();
    }

    @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
    @Response<NftListResponse>(200, "Nft list retrieved successfully", { success: true, message: "Nft list retrieved successfully", nfts: [{ name: "Some name", tokenHash: "Some hash", tokenUri: "Some uri", tokenAddress: "Some address", tokenId: "Some id" }] })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(404, "Not found", { success: false, message: "Could not retrieve nft list" })
    @Security("jwt")
    @Get("list/{collectionId}")
    public async getNftList(@Path() collectionId: string, @Request() request: express.Request): Promise<NftListResponse | BaseResponse> {
        const user = request.user as UserJwt;
        const result = await this.nftService.getAllByCollection(collectionId, user._id);

        if (result === null) {
            this.setStatus(404);
            return { success: false, message: "Could not retrieve nft list" }
        }

        return {
            success: true,
            message: "Nft list retrieved successfully",
            nfts: result.map((nft) => {
                return {
                    name: nft.name,
                    tokenHash: nft.tokenHash,
                    tokenUri: nft.tokenUri,
                    tokenAddress: nft.tokenAddress,
                    tokenId: nft.tokenId
                }
            })
        }
    }

    @Response<NftListResponse>(200, "Nft list retrieved successfully", { success: true, message: "Nft list retrieved successfully", nfts: [{ name: "Some name", tokenHash: "Some hash", tokenUri: "Some uri", tokenAddress: "Some address", tokenId: "Some id" }] })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Bad request" })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Get("public/list/{collectionId}")
    public async getPublicNftList(@Path() collectionId: string): Promise<NftListResponse | BaseResponse> {
        const result = await this.nftService.getAllByCollectionPublic(collectionId);

        if (result === null) {
            this.setStatus(400);
            return { success: false, message: "Could not retrieve nft list" }
        }

        return {
            success: true,
            message: "Nft list retrieved successfully",
            nfts: result.map((nft) => {
                return {
                    name: nft.name,
                    tokenHash: nft.tokenHash,
                    tokenUri: nft.tokenUri,
                    tokenAddress: nft.tokenAddress,
                    tokenId: nft.tokenId
                }
            })
        }
    }

    @Response<NftResponse>(200, "Nft created successfully", { success: true, message: "Nft created successfully", name: "", tokenHash: "", tokenUri: "", tokenAddress: "", tokenId: "" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Bad request" })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Security("jwt")
    @Post("create")
    public async create(@Body() nft: NftCreateRequest, @Request() request: express.Request): Promise<NftResponse | BaseResponse> {
        try {
            const user = request.user as UserJwt;
            const result = await this.nftService.create(
                nft.tokenId,
                nft.tokenAddress,
                nft.collectionId,
                user._id
            );
            if (result === null) {
                this.setStatus(400);
                return { success: false, message: "Bad request" }
            }
            return {
                success: true,
                message: "Nft created successfully",
                name: result.name,
                tokenHash: result.tokenHash,
                tokenUri: result.tokenUri,
                tokenAddress: result.tokenAddress,
                tokenId: result.tokenId
            }
        } catch (err) {
            this.setStatus(500);
            return { success: false, message: "Internal Server Error" };
        }
    }

    @Response<NftListResponse>(200, "Nft list", { success: true, message: "Nft list", nfts: [{ name: "", tokenHash: "", tokenUri: "", tokenAddress: "", tokenId: "" }] })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not list nfts" })
    @Security("jwt")
    @Get("search/{query}")
    public async list(@Path() query: string): Promise<NftListResponse | BaseResponse> {
        try {
            const result = await this.nftService.search(query);
            if (result === null) {
                this.setStatus(400);
                return { success: false, message: "Could not list nfts" }
            }
            return {
                success: true,
                message: "Nft list",
                nfts: result.map((nft) => {
                    return {
                        name: nft.name,
                        tokenHash: nft.tokenHash,
                        tokenUri: nft.tokenUri,
                        tokenAddress: nft.tokenAddress,
                        tokenId: nft.tokenId
                    }
                })
            }
        } catch (err) {
            this.setStatus(500);
            return { success: false, message: "Internal Server Error" };
        }
    }
}