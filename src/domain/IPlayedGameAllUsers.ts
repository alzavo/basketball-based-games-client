export interface IPlayedGameAllUsers {
    playedGames: IUserResult[];
}

export interface IUserResult {
    id: string,
    place: number,
    points: number,
    userId: string,
    userName: string,
    gameId: string,
    gameName: string,
}
