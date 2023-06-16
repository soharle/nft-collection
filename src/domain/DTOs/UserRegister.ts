import { BaseResponse } from "./BaseResponse";

export interface UserRegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface UserRegisterResponse extends BaseResponse {

}