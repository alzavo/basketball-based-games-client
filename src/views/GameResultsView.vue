<template>
    <section class="winner-info">
        <div class="winner-name">Winner: {{ players[0].name }}</div>
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
            <button v-on:click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
            <button
                v-on:click="this.$router.push({ name: 'home' })"
                class="button home-button"
            >
                Home
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import store from "@/store";
import { Vue } from "vue-class-component";

export default class GameResultsView extends Vue {
    players: IPlayer[] = store.getters.getPlayersOrderedByPoints();
}
</script>
