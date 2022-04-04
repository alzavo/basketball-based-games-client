import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { SET_GAME_STATUS_END } from "@/store/MutationTypes";
import { STORE } from "../store";

export default class GameManager {
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
        STORE.commit(SET_GAME_STATUS_END);
        router.push({ name: "results" });
    }
}
