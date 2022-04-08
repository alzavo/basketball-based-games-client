<template>
    <section class="game-info">
        <div class="player-info">
            <table>
                <tr>
                    <th class="player">Player</th>
                    <th class="points">Points</th>
                </tr>
                <tr>
                    <td>{{ this.currentPlayer.name }}</td>
                    <td>{{ this.currentPlayer.points }}</td>
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
                <button
                    class="button miss-button"
                    v-on:click="missBucket($event)"
                >
                    Miss
                </button>
                <button
                    class="button made-button"
                    v-on:click="addPoints($event, 1)"
                >
                    1 point
                </button>
                <button
                    v-if="this.currentPlayer.points !== 20"
                    class="button made-button"
                    v-on:click="addPoints($event, 2)"
                >
                    2 points
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import { STORE } from "@/store";
import router from "@/router";
import {
    SET_GAME_STATUS_END,
    SET_GAME_STATUS_START,
} from "@/store/MutationTypes";
import { IGame } from "@/interfaces/IGame";
import { Game21 } from "@/store/InitialState";
import GameManager from "@/helpers/GameManager";

export default class Game21View extends Vue {
    currentPlayer: IPlayer = { id: "", name: "", points: 0, canPlay: true };
    game: IGame = Game21;
    manager = new GameManager();

    beforeCreate() {
        if (STORE.state.players.length === 0) {
            router.push({ name: "home" });
        } else {
            this.currentPlayer = STORE.state.players[0];
            STORE.commit(SET_GAME_STATUS_START);
        }
    }

    addPoints(event: Event, points: number): void {
        event.preventDefault();
        this.currentPlayer.points += points;

        if (this.currentPlayer.points === 21) {
            STORE.commit(SET_GAME_STATUS_END);
            router.push({ name: "results" });
        }
    }

    missBucket(event: Event): void {
        event.preventDefault();
        if (
            this.currentPlayer.points === 10 ||
            this.currentPlayer.points === 20
        ) {
            this.currentPlayer.points = 0;
        }

        this.currentPlayer = this.manager.getNextPlayer(this.currentPlayer);
    }
}
</script>
