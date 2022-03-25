import { IGame } from "./IGame";
import { IGameStatus } from "./IGameStatus";
import { IPlayer } from "./IPlayer";

export interface IAppState {
    players: IPlayer[];
    games: IGame[];
    gameStatus: IGameStatus;
}
