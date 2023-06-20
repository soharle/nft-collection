import { BaseResponse } from "../BaseResponse";

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse extends BaseResponse {
    token: string;
}