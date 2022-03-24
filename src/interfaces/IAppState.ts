import { IGame } from "./IGame";
import { IPlayer } from "./IPlayer";

export interface IAppState {
    players: IPlayer[];
    games: IGame[];
}
