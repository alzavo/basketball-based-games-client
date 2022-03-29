<template>
    <section class="game-info">
        <div class="player-info">
            <div v-if="deathCircleCount > 0" class="container">
                <div>Death circle</div>
            </div>
            <hr v-if="deathCircleCount > 0" />
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
                    v-on:click="madeBucket($event)"
                >
                    Made
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import store from "@/store";
import router from "@/router";
import { SET_GAME_STATUS_START } from "@/store/MutationTypes";
import { IGame } from "@/interfaces/IGame";
import { GameMinus5 } from "@/store/InitialState";
import GameManager from "@/helpers/GameManager";

export default class GameMinus5View extends Vue {
    currentPlayer: IPlayer = { name: "", points: 0, canPlay: true };
    game: IGame = GameMinus5;
    deathCircleCount = 0;
    manager = new GameManager();

    beforeCreate() {
        if (store.state.players.length === 0) {
            router.push({ name: "home" });
        } else {
            this.currentPlayer = store.state.players[0];
            store.commit(SET_GAME_STATUS_START);
        }
    }

    madeBucket(event: Event): void {
        event.preventDefault();

        this.deathCircleCount++;
        if (this.deathCircleCount === this.manager.countActivePlayers()) {
            this.deathCircleCount = 0;
        }

        this.currentPlayer = this.manager.getNextPlayer(this.currentPlayer);
    }

    missBucket(event: Event): void {
        event.preventDefault();

        if (this.deathCircleCount > 0) {
            this.currentPlayer.points -= 1;

            if (this.currentPlayer.points === -5) {
                this.removePlayer();
            }
        }

        this.deathCircleCount = 0;
        this.currentPlayer = this.manager.getNextPlayer(this.currentPlayer);
    }

    removePlayer(): void {
        this.currentPlayer.canPlay = false;

        if (this.manager.countActivePlayers() === 1) {
            this.manager.finishGame();
        }

        this.currentPlayer = this.manager.getNextPlayer(this.currentPlayer);
    }
}
</script>
