import { Comments, Nft } from "@prisma/client"

export type Collection = {
    id: string,
    title: string,
    description: string | null,
    userId: string,
    isPublic: boolean,
    Comments?: Comments[]
}