import { Body, Controller, Get, Post, Request, Res, Response, Route, Security, Tags } from "tsoa";
import { UserLoginRequest, UserLoginResponse } from "../../../domain/DTOs/UserLogin";
import { UserRegisterRequest, UserRegisterResponse } from "../../../domain/DTOs/UserRegister";
import { injectable } from "tsyringe";
import { UserService } from "../../../domain/services/user/UserService";
import express from "express";
import { UserJwt } from "../../../domain/model/user/User";


@Route("user")
@Tags("User")
@injectable()
export class UserController extends Controller {
  constructor(private userService: UserService) {
    super();
  }

  @Response<UserLoginResponse>(401, "Unauthorized", { success: false, message: "Invalid credentials", token: "" })
  @Response<UserLoginResponse>(200, "User logged in successfully", { success: true, message: "User logged in successfully", token: "" })
  @Response<UserLoginResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error", token: "" })
  @Post("signin")
  public async login(@Body() login: UserLoginRequest): Promise<UserLoginResponse> {
    const result = await this.userService.login(login);

    if (result === null) {
      this.setStatus(401);
      return { success: false, message: "Invalid credentials", token: "" };
    }

    return {
      success: true,
      message: "User logged in successfully",
      token: result
    }
  }

  @Response<UserRegisterResponse>(200, "User created successfully", { success: true, message: "User created successfully" })
  @Response<UserRegisterResponse>(500, "Internal Server Error", { success: false, message: "Internal Server Error" })
  @Response<UserRegisterResponse>(400, "Bad request", { success: false, message: "Could not create user" })
  @Post("signup")
  public async register(@Body() user: UserRegisterRequest): Promise<UserRegisterResponse> {
    try {
      const result = await this.userService.register(user);
      if (result === null) {
        this.setStatus(400);
        return { success: false, message: "Could not create user" }
      }
      return {
        success: true,
        message: "User created successfully"
      }
    } catch (err) {
      this.setStatus(500);
      return { success: false, message: "Internal Server Error" };
    }
  }
}