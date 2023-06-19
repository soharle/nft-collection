import { Route, Tags, Controller, Body, Post, Response, Request, Put, Security, Delete, Path, Get } from "tsoa";
import { injectable } from "tsyringe";
import express from "express";
import { BaseResponse } from "../../../domain/DTOs/BaseResponse";
import { CommentsCreateRequest, CommentsUpdateRequest } from "../../../domain/DTOs/comments/CommentsRequest";
import { CommentsListResponse, CommentsResponse } from "../../../domain/DTOs/comments/CommentsResponse";
import { CommentsService } from "../../../domain/services/comments/CommentsService";
import { UserJwt } from "../../../domain/model/user/User";


@Route("comments")
@Tags("Comments")
@injectable()
export class CommentsController extends Controller {
    constructor(private commentsService: CommentsService) {
        super();
    }

    @Response<CommentsResponse>(200, "Comment created successfully", { success: true, message: "Comment created successfully", id: "", text: "Some text", rating: 5, userId: "", collectionId: "" })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not create comment" })
    @Security("jwt")
    @Post("create")
    public async create(@Body() comment: CommentsCreateRequest, @Request() request: express.Request): Promise<CommentsResponse | BaseResponse> {
        try {
            const user = request.user as UserJwt;
            console.log("teste", user)
            const result = await this.commentsService.create(
                comment.text,
                comment.rating,
                comment.collectionId,
                user._id
            );
            if (result === null) {
                this.setStatus(400);
                return { success: false, message: "Could not create comment" }
            }
            return {
                success: true,
                message: "Comment created successfully",
                text: result.text,
                rating: result.rating
            }
        } catch (err) {
            this.setStatus(500);
            return { success: false, message: "Internal Server Error" };
        }
    }

    @Response<CommentsResponse>(200, "Comment updated successfully", { success: true, message: "Comment updated successfully", id: "", text: "Some text", rating: 5, userId: "", collectionId: "" })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not update comment" })
    @Security("jwt")
    @Put("update")
    public async update(@Body() comment: CommentsUpdateRequest, @Request() request: express.Request): Promise<CommentsResponse | BaseResponse> {
        try {
            const user = request.user as UserJwt;
            const result = await this.commentsService.update(
                comment.text,
                comment.rating,
                comment.id,
                user._id
            );
            if (result === null) {
                this.setStatus(400);
                return { success: false, message: "Could not update comment" }
            }
            return {
                success: true,
                message: "Comment updated successfully",
                text: result.text,
                rating: result.rating
            }
        }
        catch (err) {
            this.setStatus(500);
            return { success: false, message: "Internal Server Error" };
        }
    }

    @Response<BaseResponse>(200, "Comment deleted successfully", { success: true, message: "Comment deleted successfully" })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not delete comment" })
    @Security("jwt")
    @Delete("delete")
    public async delete(@Body() comment: CommentsUpdateRequest, @Request() request: express.Request): Promise<BaseResponse> {
        try {
            const user = request.user as UserJwt;
            const result = await this.commentsService.delete(
                comment.id,
                user._id
            );
            if (result === null) {
                this.setStatus(400);
                return { success: false, message: "Could not delete comment" }
            }
            return {
                success: true,
                message: "Comment deleted successfully"
            }
        } catch (err) {
            this.setStatus(500);
            return { success: false, message: "Internal Server Error" };
        }
    }

    @Response<CommentsListResponse>(200, "Comments retrieved successfully", { success: true, message: "Comments retrieved successfully", comments: [{ id: "", text: "Some text", rating: 5, userId: "", collectionId: "" }] })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not retrieve comments" })
    @Security("jwt")
    @Get("byCollection/{collectionId}")
    public async getCommentsByCollectionId(@Path() collectionId: string, @Request() request: express.Request): Promise<CommentsListResponse | null> {
        try {
            const user = request.user as UserJwt;
            const result = await this.commentsService.getCommentsByCollectionId(collectionId, user._id);
            if (result === null) {
                this.setStatus(400);
                return null;
            }
            return {
                success: true,
                message: "Comments retrieved successfully",
                comments: result.map((comment) => {
                    return {
                        id: comment.id,
                        text: comment.text,
                        rating: comment.rating,
                        userId: comment.userId,
                        collectionId: comment.collectionId
                    }
                })
            }
        }
        catch (err) {
            this.setStatus(500);
            return null;
        }
    }

    @Response<CommentsListResponse>(200, "Comments retrieved successfully", { success: true, message: "Comments retrieved successfully", comments: [{ id: "", text: "Some text", rating: 5, userId: "", collectionId: "" }] })
    @Response<BaseResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
    @Response<BaseResponse>(400, "Bad request", { success: false, message: "Could not retrieve comments" })
    @Security("jwt")
    @Get("getAll")
    public async getCommentsByUserId(@Request() request: express.Request): Promise<CommentsListResponse | null> {
        try {
            const user = request.user as UserJwt;
            const result = await this.commentsService.getCommentsByUserId(user._id);
            if (result === null) {
                this.setStatus(400);
                return null;
            }
            return {
                success: true,
                message: "Comments retrieved successfully",
                comments: result.map((comment) => {
                    return {
                        id: comment.id,
                        text: comment.text,
                        rating: comment.rating,
                        userId: comment.userId,
                        collectionId: comment.collectionId
                    }
                })
            }
        }
        catch (err) {
            this.setStatus(500);
            return null;
        }
    }
}