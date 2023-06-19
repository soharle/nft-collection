/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CollectionController } from './../application/controllers/collection/CollectionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CommentsController } from './../application/controllers/comments/CommentsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthCheckController } from './../application/controllers/healthcheck/HealthCheckController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NftController } from './../application/controllers/nft/NftController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../application/controllers/user/UserController';
import { expressAuthentication } from './../shared/infrastructure/auth/Authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import { iocContainer } from './../shared/infrastructure/Container';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "CollectionResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "isPublic": {"dataType":"boolean","required":true},
            "userId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CollectionRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "isPublic": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CollectionUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "isPublic": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CollectionListResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "collections": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true},"isPublic":{"dataType":"boolean","required":true},"description":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"title":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommentsResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "id": {"dataType":"string","required":true},
            "text": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "rating": {"dataType":"double","required":true},
            "userId": {"dataType":"string","required":true},
            "collectionId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommentsCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "text": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
            "collectionId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommentsUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "text": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommentsListResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "comments": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"collectionId":{"dataType":"string","required":true},"userId":{"dataType":"string","required":true},"rating":{"dataType":"double","required":true},"text":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"id":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HealthCheckResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date":{"dataType":"string","required":true},"success":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
            "tokenId": {"dataType":"string","required":true},
            "tokenAddress": {"dataType":"string","required":true},
            "tokenHash": {"dataType":"string","required":true},
            "tokenUri": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "tokenId": {"dataType":"string","required":true},
            "tokenAddress": {"dataType":"string","required":true},
            "collectionId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NftListResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
            "nfts": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"tokenUri":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"tokenHash":{"dataType":"string","required":true},"tokenAddress":{"dataType":"string","required":true},"tokenId":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRegisterResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "success": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRegisterRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/collection/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CollectionController)),
            ...(fetchMiddlewares<RequestHandler>(CollectionController.prototype.create)),

            async function CollectionController_create(request: any, response: any, next: any) {
            const args = {
                    collection: {"in":"body","name":"collection","required":true,"ref":"CollectionRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CollectionController>(CollectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/collection/update',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CollectionController)),
            ...(fetchMiddlewares<RequestHandler>(CollectionController.prototype.update)),

            async function CollectionController_update(request: any, response: any, next: any) {
            const args = {
                    collection: {"in":"body","name":"collection","required":true,"ref":"CollectionUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CollectionController>(CollectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/collection/delete/:collectionId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CollectionController)),
            ...(fetchMiddlewares<RequestHandler>(CollectionController.prototype.delete)),

            async function CollectionController_delete(request: any, response: any, next: any) {
            const args = {
                    collectionId: {"in":"path","name":"collectionId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CollectionController>(CollectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/collection/get/:collectionId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CollectionController)),
            ...(fetchMiddlewares<RequestHandler>(CollectionController.prototype.get)),

            async function CollectionController_get(request: any, response: any, next: any) {
            const args = {
                    collectionId: {"in":"path","name":"collectionId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CollectionController>(CollectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/collection/getAll',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CollectionController)),
            ...(fetchMiddlewares<RequestHandler>(CollectionController.prototype.getAll)),

            async function CollectionController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CollectionController>(CollectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAll.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/comments/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CommentsController)),
            ...(fetchMiddlewares<RequestHandler>(CommentsController.prototype.create)),

            async function CommentsController_create(request: any, response: any, next: any) {
            const args = {
                    comment: {"in":"body","name":"comment","required":true,"ref":"CommentsCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CommentsController>(CommentsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/comments/update',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CommentsController)),
            ...(fetchMiddlewares<RequestHandler>(CommentsController.prototype.update)),

            async function CommentsController_update(request: any, response: any, next: any) {
            const args = {
                    comment: {"in":"body","name":"comment","required":true,"ref":"CommentsUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CommentsController>(CommentsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/comments/delete',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CommentsController)),
            ...(fetchMiddlewares<RequestHandler>(CommentsController.prototype.delete)),

            async function CommentsController_delete(request: any, response: any, next: any) {
            const args = {
                    comment: {"in":"body","name":"comment","required":true,"ref":"CommentsUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CommentsController>(CommentsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/comments/byCollection/:collectionId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CommentsController)),
            ...(fetchMiddlewares<RequestHandler>(CommentsController.prototype.getCommentsByCollectionId)),

            async function CommentsController_getCommentsByCollectionId(request: any, response: any, next: any) {
            const args = {
                    collectionId: {"in":"path","name":"collectionId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CommentsController>(CommentsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCommentsByCollectionId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/comments/getAll',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CommentsController)),
            ...(fetchMiddlewares<RequestHandler>(CommentsController.prototype.getCommentsByUserId)),

            async function CommentsController_getCommentsByUserId(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CommentsController>(CommentsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCommentsByUserId.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/health',
            ...(fetchMiddlewares<RequestHandler>(HealthCheckController)),
            ...(fetchMiddlewares<RequestHandler>(HealthCheckController.prototype.invoke)),

            async function HealthCheckController_invoke(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<HealthCheckController>(HealthCheckController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.invoke.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Nft/create',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.create)),

            async function NftController_create(request: any, response: any, next: any) {
            const args = {
                    nft: {"in":"body","name":"nft","required":true,"ref":"NftCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NftController>(NftController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/Nft/list/:query',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(NftController)),
            ...(fetchMiddlewares<RequestHandler>(NftController.prototype.list)),

            async function NftController_list(request: any, response: any, next: any) {
            const args = {
                    query: {"in":"path","name":"query","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<NftController>(NftController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.list.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/signin',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.login)),

            async function UserController_login(request: any, response: any, next: any) {
            const args = {
                    login: {"in":"body","name":"login","required":true,"ref":"UserLoginRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.register)),

            async function UserController_register(request: any, response: any, next: any) {
            const args = {
                    user: {"in":"body","name":"user","required":true,"ref":"UserRegisterRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.register.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
