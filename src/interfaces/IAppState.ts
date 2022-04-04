import { IGame } from "./IGame";
import { IGameStatus } from "./IGameStatus";
import { IPlayer } from "./IPlayer";
import { IUser } from "./IUser";

export interface IAppState {
    players: IPlayer[];
    games: IGame[];
    gameStatus: IGameStatus;
    user: IUser;
}
