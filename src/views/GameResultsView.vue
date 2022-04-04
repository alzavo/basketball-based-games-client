<template>
    <section v-if="gameEnded" class="winner-info">
        <table>
            <tr>
                <td>&#127942;</td>
                <td class="player">{{ players[0].name }}</td>
                <td>&#127942;</td>
            </tr>
        </table>
    </section>
    <section class="game-results">
        <div class="title"><h1>Results</h1></div>
        <div class="results-table">
            <table>
                <tr>
                    <th class="place">Place</th>
                    <th>Player</th>
                    <th class="points">Points</th>
                </tr>

                <tr v-for="(player, index) in players" :key="player">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.name }}</td>
                    <td>{{ player.points }}</td>
                </tr>
            </table>
        </div>
        <div class="actions">
            <button
                v-if="gameStarted"
                v-on:click="this.$router.go(-1)"
                class="button back-button"
            >
                Back
            </button>
            <button
                v-if="gameEnded"
                v-on:click="doAfterGameActions($event)"
                class="button home-button"
            >
                Home
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { STORE } from "@/store";
import {
    CLEAR_GAME_STATUSES,
    REMOVE_POINTS_FROM_PLAYERS,
} from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class GameResultsView extends Vue {
    gameEnded = false;
    gameStarted = false;
    players: IPlayer[] = [];

    beforeCreate() {
        if (STORE.state.players.length === 0) {
            router.push({ name: "home" });
        } else {
            this.gameEnded = STORE.state.gameStatus.end;
            this.gameStarted = STORE.state.gameStatus.start;
            this.players = STORE.getters.getPlayersOrderedByPoints();
        }
    }

    doAfterGameActions(event: Event): void {
        event.preventDefault();
        STORE.commit(CLEAR_GAME_STATUSES);
        STORE.commit(REMOVE_POINTS_FROM_PLAYERS);
        router.push({ name: "home" });
    }
}
</script>
