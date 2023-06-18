import { inject, injectable } from "tsyringe"
import { User } from "../../model/user/User"
import { IUserRepository } from "../../model/user/IUserRepository";
import bcrypt from 'bcrypt';
import { Configuration } from "../../../config";
import jwt from 'jsonwebtoken'

@injectable()
export class AuthService {
  private userRepository: IUserRepository;

  constructor(@inject("IUserRepository") userRepository: IUserRepository, private config: Configuration) {
    this.userRepository = userRepository;
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  public async getJwtToken(user: User): Promise<string> {
    const token = jwt.sign({ _id: user.id, email: user.email, name: user.name, expiresIn: '12 hours' }, this.config.TOKEN_SECRET, { expiresIn: '1h' });

    return token;
  }
}
