import {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import { AuthorizationError } from "../../Errors/AuthorizationError";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { ValidateError } from "tsoa";


@injectable()
export class GenericErrorHandler {
    public handle(
        err: unknown,
        req: ExRequest,
        res: ExResponse,
        next: NextFunction
    ): ExResponse | void {
        if (err instanceof AuthorizationError || err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (err instanceof ValidateError) {
            return res.status(422).json({
                message: "Validation Failed",
                details: err?.fields,
            });
        }
        if (err instanceof Error) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
        next();
    }
}
