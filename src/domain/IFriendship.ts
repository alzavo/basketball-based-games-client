export interface IFriendship {
    id: string,
    userId: string,
    userName: string,
    friendId: string,
    friendName: string,
}

export interface IFriendshipCreate {
    userId: string,
    friendId: string,
}