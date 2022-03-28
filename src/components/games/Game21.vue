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
import store from "@/store";
import router from "@/router";
import { SET_GAME_STATUS_END } from "@/store/MutationTypes";

export default class Game21 extends Vue {
    currentPlayer: IPlayer = store.state.players[0];

    addPoints(event: Event, points: number): void {
        event.preventDefault();
        this.currentPlayer.points += points;
        if (this.currentPlayer.points === 21) {
            store.commit(SET_GAME_STATUS_END);
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
    }
}
</script>
