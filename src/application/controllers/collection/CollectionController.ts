import { Route, Tags, Controller, Body, Post, Response, Security, Request, Patch, Get, Path, Put, Delete } from "tsoa";
import { injectable } from "tsyringe";
import express from "express";
import { BaseResponse } from "../../../domain/DTOs/BaseResponse";
import { CollectionListResponse, CollectionResponse } from "../../../domain/DTOs/collection/CollectionResponse";
import { CollectionRequest, CollectionUpdateRequest } from "../../../domain/DTOs/collection/CollectionRequest";
import { UserLoginResponse } from "../../../domain/DTOs/user/UserLogin";
import { CollectionService } from "../../../domain/services/collection/CollectionService";
import { UserJwt } from "../../../domain/model/user/User";


@Route("collection")
@Tags("Collection")
@injectable()
export class CollectionController extends Controller {
    constructor(private collectionService: CollectionService) {
        super();
    }

    @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
    @Response<CollectionResponse>(200, "Collection created with success", {
        success: true, message: "Collection created with success", id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        title: "Title",
        description: "Description about the collection",
        isPublic: false,
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not create the collection" })
    @Security("jwt")
    @Post("create")
    public async create(@Body() collection: CollectionRequest, @Request() request: express.Request): Promise<CollectionResponse | BaseResponse> {
        const user = request.user as UserJwt;
        const result = await this.collectionService.create(collection.title, collection.description, collection.isPublic, user._id);
        if (result === null) {
            this.setStatus(400);
            return { success: false, message: "Could not create the collection" }
        }

        return {
            success: true,
            message: "Collection created with success",
            id: result.id,
            title: result.title,
            description: result.description,
            isPublic: result.isPublic,
            userId: result.userId
        };
    }

    @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
    @Response<CollectionResponse>(200, "Collection updated with success", {
        success: true, message: "Collection updated with success", id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        title: "Title",
        description: "Description about the collection",
        isPublic: false,
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not update the collection" })
    @Put("update")
    @Security("jwt")
    public async update(@Body() collection: CollectionUpdateRequest, @Request() request: express.Request): Promise<CollectionResponse | BaseResponse> {
        const user = request.user as UserJwt;
        const result = await this.collectionService.update(collection.id, collection.title, collection.description, collection.isPublic, user._id);
        if (result === null) {
            this.setStatus(400);
            return { success: false, message: "Could not update the collection" }
        }
        return {
            success: true,
            message: "Collection updated with success",
            id: result.id,
            title: result.title,
            description: result.description,
            isPublic: result.isPublic,
            userId: result.userId
        };
    }

    @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
    @Response<BaseResponse>(200, "Collection deleted with success", {
        success: true, message: "Collection deleted with success"
    })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not delete the collection" })
    @Delete("delete/{collectionId}")
    @Security("jwt")
    public async delete(@Path() collectionId: string, @Request() request: express.Request): Promise<BaseResponse> {
        const user = request.user as UserJwt;
        const result = await this.collectionService.delete(collectionId, user._id);
        if (result === null) {
            this.setStatus(400);
            return { success: false, message: "Could not delete the collection" }
        }
        return {
            success: true,
            message: "Collection deleted with success"
        };
    }

    @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
    @Response<CollectionResponse>(200, "Collection retrieved with success", {
        success: true, message: "Collection retrieved with success", id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        title: "Title",
        description: "Description about the collection",
        isPublic: false,
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not retrieve the collection" })
    @Get("get/{collectionId}")
    @Security("jwt")
    public async get(@Path() collectionId: string, @Request() request: express.Request): Promise<CollectionResponse | BaseResponse> {
        const user = request.user as UserJwt;
        const result = await this.collectionService.get(collectionId, user._id);
        if (result === null) {
            this.setStatus(400);
            return { success: false, message: "Could not retrieve the collection" }
        }
        return {
            success: true,
            message: "Collection retrieved with success",
            id: result.id,
            title: result.title,
            description: result.description,
            isPublic: result.isPublic,
            userId: result.userId
        };
    }

    @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
    @Response<CollectionResponse[]>(200, "Collections retrieved with success", [{
        success: true, message: "Collection retrieved with success", id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        title: "Title",
        description: "Description about the collection",
        isPublic: false,
        userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }])
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not retrieve the collections" })
    @Get("getAll")
    @Security("jwt")
    public async getAll(@Request() request: express.Request): Promise<CollectionListResponse | BaseResponse> {
        const user = request.user as UserJwt;
        const result = await this.collectionService.getAll(user._id);
        if (result === null) {
            this.setStatus(400);
            return { success: false, message: "Could not retrieve the collections" }
        }

        return {
            success: true,
            message: "Collections retrieved with success",
            collections: result.map((collection) => {
                return {
                    id: collection.id,
                    title: collection.title,
                    description: collection.description,
                    isPublic: collection.isPublic,
                    userId: collection.userId,
                }
            })
        };
    }

}