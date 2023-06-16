import { PrismaClient, User } from "@prisma/client";
import { injectable } from "tsyringe";
import { IUserRepository } from "../../domain/model/user/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(private db: PrismaClient) { }

    public async all(): Promise<User[]> {
        return this.db.user.findMany();
    }

    public async create(email: string, password: string, name: string): Promise<User | null> {
        return this.db.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
    }

    public async findById(id: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                id: id
            }
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                email: email
            }
        })
    }
}
