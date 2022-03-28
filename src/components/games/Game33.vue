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
                    v-on:click="changePlayers($event)"
                >
                    Miss
                </button>
                <button
                    class="button made-button"
                    v-on:click="addPoints($event)"
                >
                    Made
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import store from "@/store";
import { SET_GAME_STATUS_END } from "@/store/MutationTypes";

import { Vue } from "vue-class-component";

export default class Game33 extends Vue {
    currentPlayer: IPlayer = store.state.players[0];

    addPoints(event: Event): void {
        event.preventDefault();
        if (this.currentPlayer.points < 30) {
            this.currentPlayer.points += 3;
        } else if (this.currentPlayer.points >= 30) {
            this.currentPlayer.points += 1;
            if (this.currentPlayer.points === 33) {
                store.commit(SET_GAME_STATUS_END);
                router.push({ name: "results" });
            }
        }
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
