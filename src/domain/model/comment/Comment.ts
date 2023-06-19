import { User } from "@prisma/client"

export type Comment = {
    id: string,
    rating: number,
    text: string | null,
    userId: string,
    collectionId: string
}