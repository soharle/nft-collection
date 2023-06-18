export type User = {
    id: string,
    email: string,
    password: string,
    name: string
}

export type UserJwt = {
    email: string,
    name: string,
    _id: string
}