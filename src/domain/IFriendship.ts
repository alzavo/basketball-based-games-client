export interface IFriendship {
    id: string,
    userId: number,
    userName: string,
    friendId: number,
    friendName: string,
}

export interface IFriendshipCreate {
    userId: string,
    friendId: string,
}