const collection1 = {
    id: "collection1",
    title: "collection1",
    description: "collection1",
    isPublic: true,
    userId: "user1"
}
const collection2 = {
    id: "collection2",
    title: "collection2",
    description: "collection2",
    isPublic: false,
    userId: "user1"
}
const collection3 = {
    id: "collection3",
    title: "collection3",
    description: "collection3",
    isPublic: false,
    userId: "user2"
}
const user1 = {
    id: "user1",
    name: "user1",
    email: "user1@email.com",
    password: "user1"
}
const user2 = {
    id: "user2",
    name: "user2",
    email: "user2@email.com",
    password: "user2"
}

const comment1 = {
    id: "comment1",
    text: "comment1",
    rating: 1,
    userId: "user1",
    collectionId: "collection1"
}

const comment2 = {
    id: "comment2",
    text: "comment2",
    rating: 2,
    userId: "user1",
    collectionId: "collection1"
}

const comment3 = {
    id: "comment3",
    text: "comment3",
    rating: 3,
    userId: "user2",
    collectionId: "collection3"
}

const comment4 = {
    id: "comment4",
    text: "comment4",
    rating: 4,
    userId: "user1",
    collectionId: "collection2"
}


export { collection1, collection2, collection3, user1, user2, comment1, comment2, comment3, comment4 };