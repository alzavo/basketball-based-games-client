import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import * as Mutation from "@/store/MutationTypes";
import * as RouteName from "@/router/RoutesNames";
import { STORE } from "../store";

export default class GameManager {
    private currentPlayer: IPlayer;

    constructor() {
        this.currentPlayer = STORE.state.players[0];
    }

    disableCurrentPlayer() {
        this.getCurrentPlayer().canPlay = false;

        if (this.countActivePlayers() === 1) {
            this.finishGame();
        }
    }

    addPointsToCurrentPlayer(points: number) {
        this.currentPlayer.points += points;
    }

    getCurrentPlayer(): IPlayer {
        return this.currentPlayer;
    }

    getNewCurrentPlayer(): IPlayer {
        this.currentPlayer = this.getNextPlayer(this.currentPlayer);
        return this.currentPlayer;
    }

    getNextPlayer(currentPlayer: IPlayer): IPlayer {
        let currentPlayerIndex = STORE.state.players.indexOf(currentPlayer);
        let nextPlayerFound = false;

        while (!nextPlayerFound) {
            if (currentPlayerIndex === STORE.state.players.length - 1) {
                currentPlayerIndex = 0;
            } else {
                currentPlayerIndex++;
            }

            currentPlayer = STORE.state.players[currentPlayerIndex];

            if (currentPlayer.canPlay) {
                nextPlayerFound = true;
            }
        }

        return currentPlayer;
    }

    countActivePlayers(): number {
        let counter = 0;
        STORE.state.players.forEach((player) => {
            if (player.canPlay) {
                counter += 1;
            }
        });
        return counter;
    }

    finishGame(): void {
        STORE.commit(Mutation.SET_GAME_STATUS_END);
        router.push({ name: RouteName.RESULTS });
    }

    startGame(): void {
        STORE.commit(Mutation.SET_GAME_STATUS_START);
    }
}
