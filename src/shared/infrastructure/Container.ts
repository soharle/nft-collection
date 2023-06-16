import { container } from "tsyringe";
import { IocContainer } from '@tsoa/runtime';
import { PrismaClient } from "@prisma/client";
import { createPrismaClient } from "./prisma";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { ServerLogger } from "./logger";

container.register(PrismaClient, { useFactory: createPrismaClient })
container.register("ILogger", { useClass: ServerLogger })
//repositories
container.register("IUserRepository", { useClass: UserRepository })

export const iocContainer: IocContainer = { get: <T>(controller: { prototype: T }): T => container.resolve<T>(controller as never) };
export { container };
export default iocContainer;