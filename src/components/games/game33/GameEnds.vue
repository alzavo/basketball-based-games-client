<template>
    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="in-game-actions">
                <button
                    class="button save-button"
                    v-on:click="saveGame($event)"
                >
                    Save
                </button>
                <button
                    class="button home-button"
                    v-on:click="goToHome($event)"
                >
                    Home
                </button>
            </div>
        </div>
    </section>

    <section class="game-results">
        <div class="title"><h1>Results</h1></div>
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
    </section>
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import store from "@/store";
import {
    REMOVE_POINTS_FROM_PLAYERS,
    SET_STATUS_GAME_GOES,
} from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class GameEnds extends Vue {
    players: IPlayer[] = store.getters.getPlayersOrderedByPoints();

    goToHome(event: Event): void {
        event.preventDefault();
        store.commit(REMOVE_POINTS_FROM_PLAYERS);
        store.commit(SET_STATUS_GAME_GOES);
        router.push({ name: "home" });
    }

    saveGame(event: Event): void {
        // async save game data
    }
}
</script>
