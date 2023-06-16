import * as express from "express";
import { header } from "express-validator";
import * as jwt from "jsonwebtoken";
import { container } from "tsyringe";
import { Configuration } from "../../../config";
import { AuthorizationError } from "../../Errors/AuthorizationError";

const config = container.resolve<Configuration>(Configuration);

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    const token = request.headers['x-access-token'];
    return new Promise((resolve, reject) => {
        try {
            jwt.verify((token as string).trim(), config.TOKEN_SECRET, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        } catch (error) {
            reject(new AuthorizationError("Invalid token"));
        }
    });
}