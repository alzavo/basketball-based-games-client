<template>
    <section class="game-info">
        <div class="player-info">
            <table>
                <tr>
                    <th class="player">Player</th>
                    <th class="points">Points</th>
                </tr>
                <tr>
                    <td>{{ currentPlayer.name }}</td>
                    <td>{{ currentPlayer.points }}</td>
                </tr>
            </table>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="additional">
                <button
                    v-on:click="
                        this.$router.push({
                            name: 'rules',
                            params: { name: game.name },
                        })
                    "
                    class="button rules-button"
                >
                    Rules
                </button>
                <button
                    v-on:click="this.$router.push({ name: 'home' })"
                    class="button back-button"
                >
                    Quit game
                </button>
                <button
                    v-on:click="this.$router.push({ name: 'results' })"
                    class="button results-button"
                >
                    Results
                </button>
            </div>
            <hr />
            <div class="shooting">
                <button class="button miss-button" @click="changePlayers()">
                    Miss
                </button>
                <button class="button made-button" @click="addPoints($event)">
                    Made
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { IGame } from "@/interfaces/IGame";
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { STORE } from "@/store";
import { Game33 } from "@/store/InitialState";
import {
    SET_GAME_STATUS_END,
    SET_GAME_STATUS_START,
} from "@/store/MutationTypes";
import { Vue } from "vue-class-component";
import GameManager from "@/helpers/GameManager";

export default class Game33View extends Vue {
    currentPlayer: IPlayer = { id: "", name: "", points: 0, canPlay: true };
    game: IGame = Game33;
    manager = new GameManager();

    beforeCreate() {
        if (STORE.state.players.length === 0) {
            router.push({ name: "home" });
        } else {
            this.currentPlayer = STORE.state.players[0];
            STORE.commit(SET_GAME_STATUS_START);
        }
    }

    addPoints(event: Event): void {
        event.preventDefault();
        if (this.currentPlayer.points < 30) {
            this.currentPlayer.points += 3;
        } else if (this.currentPlayer.points >= 30) {
            this.currentPlayer.points += 1;
            if (this.currentPlayer.points === 33) {
                STORE.commit(SET_GAME_STATUS_END);
                router.push({ name: "results" });
            }
        }
    }

    changePlayers(): void {
        this.currentPlayer = this.manager.getNextPlayer(this.currentPlayer);
    }
}
</script>
