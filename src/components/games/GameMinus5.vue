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
            <div class="settings">
                <button
                    v-on:click="this.$router.push({ name: 'settings' })"
                    class="button settings-button"
                >
                    Settings
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
import { SET_GAME_STATUS_END } from "@/store/MutationTypes";

export default class GameMinus5 extends Vue {
    currentPlayer: IPlayer = store.state.players[0];
    deathCircleCount = 0;

    madeBucket(event: Event): void {
        event.preventDefault();
        if (this.deathCircleCount === 0) {
            this.deathCircleCount++;
        } else {
            this.deathCircleCount++;
            if (this.deathCircleCount === this.countActivePlayers()) {
                this.deathCircleCount = 0;
            }
        }
        this.changePlayers(event);
    }

    missBucket(event: Event): void {
        event.preventDefault();
        if (this.deathCircleCount > 0) {
            this.currentPlayer.points -= 1;
            if (this.currentPlayer.points === -5) {
                this.removePlayer(event);
            }
        }
        this.deathCircleCount = 0;
        this.changePlayers(event);
    }

    changePlayers(event: Event): void {
        event.preventDefault();

        let currentPlayerIndex = store.state.players.indexOf(
            this.currentPlayer
        );

        if (currentPlayerIndex === store.state.players.length - 1) {
            this.currentPlayer = store.state.players[0];
        } else {
            this.currentPlayer = store.state.players[++currentPlayerIndex];
        }

        if (!this.currentPlayer.canPlay) {
            this.changePlayers(event);
        }
    }

    removePlayer(event: Event): void {
        event.preventDefault();
        this.currentPlayer.canPlay = false;
        if (this.countActivePlayers() === 1) {
            this.finishGame();
            return;
        }
        this.changePlayers(event);
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
</script>
