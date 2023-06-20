import { inject, injectable } from "tsyringe";
import { HealthCheckResponse } from "../../DTOs/healthcheck/HealthCheckResponse";
import { UserLoginRequest } from "../../DTOs/user/UserLogin";
import { UserRegisterRequest } from "../../DTOs/user/UserRegister";
import { IUserRepository } from "../../model/user/IUserRepository";
import { User } from "../../model/user/User";
import { AuthService } from "../auth/AuthService";


@injectable()
export class UserService {

    constructor(@inject("IUserRepository") private userRepository: IUserRepository, private authService: AuthService) {

    }

    public async register(user: UserRegisterRequest): Promise<User | null> {

        const passHashed = await this.authService.hashPassword(user.password)
        const result = await this.userRepository.create(user.email, passHashed, user.name);

        if (result != null) {
            return {
                id: result.id,
                name: result.name,
                email: result.email,
                password: ""
            }
        } else {
            return null
        }
    }

    public async login(login: UserLoginRequest): Promise<string | null> {
        const result = await this.userRepository.findByEmail(login.email);
        if (result != null && await this.authService.comparePassword(login.password, result.password)) {
            return await this.authService.getJwtToken(result);
        }

        return null;
    }

    public async getUser(email: string): Promise<User> {
        const result = await this.userRepository.findByEmail(email);
        if (result != null) {
            return {
                id: result.id,
                name: result.name,
                email: result.email,
                password: ""
            }
        }

        throw new Error("User not found");
    }
}
export { HealthCheckResponse };

