import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { SET_GAME_STATUS_END } from "@/store/MutationTypes";
import store from "../store";

export default class GameManager {
    getNextPlayer(currentPlayer: IPlayer): IPlayer {
        let currentPlayerIndex = store.state.players.indexOf(currentPlayer);
        let nextPlayerFound = false;

        while (!nextPlayerFound) {
            if (currentPlayerIndex === store.state.players.length - 1) {
                currentPlayerIndex = 0;
            } else {
                currentPlayerIndex++;
            }

            currentPlayer = store.state.players[currentPlayerIndex];

            if (currentPlayer.canPlay) {
                nextPlayerFound = true;
            }
        }

        return currentPlayer;
    }

    countActivePlayers(): number {
        let counter = 0;
        store.state.players.forEach((player) => {
            if (player.canPlay) {
                counter += 1;
            }
        });
        return counter;
    }

    finishGame(): void {
        store.commit(SET_GAME_STATUS_END);
        router.push({ name: "results" });
    }
}
