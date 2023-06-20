import { PrismaClient, User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../domain/model/user/IUserRepository";
import { ILogger } from "../../shared/interface/ILogger";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(private db: PrismaClient, @inject("ILogger") private logger: ILogger) { }

    public async all(): Promise<User[]> {
        return this.db.user.findMany();
    }

    public async create(email: string, password: string, name: string): Promise<User | null> {
        try {
            return this.db.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
        } catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }

    }

    public async findById(id: string): Promise<User | null> {
        try {
            return this.db.user.findUnique({
                where: {
                    id: id
                }
            });
        }
        catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            return this.db.user.findUnique({
                where: {
                    email: email
                }
            });
        }
        catch (e) {
            this.logger.error((e as Error).message);
            return null;
        }
    }
}
