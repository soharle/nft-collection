import { User } from "@prisma/client"

export interface IUserRepository {
    create(email: string, password: string, name: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    all(): Promise<User[]>
}
