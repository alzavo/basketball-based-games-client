export interface IPlayedGameAllUsers {
    playedGames: IUserResult[];
}

export interface IUserResult {
    place: number,
    points: number,
    userId: string,
    gameId: string,
}
