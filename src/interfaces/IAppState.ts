import { IPlayer } from "./IPlayer";

export interface IAppState {
    gameName: string | null;
    players: IPlayer[];
}