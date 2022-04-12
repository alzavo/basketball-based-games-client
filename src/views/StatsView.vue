<template>
    <section id="stats-section">
        <div class="wrapper">
            <div class="table-wrapper">
                <table>
                    <tr>
                        <th class="place">Place</th>
                        <th class="points">Points</th>
                        <th class="name">Game</th>
                    </tr>
                    <tr v-for="game in playedGames" :key="game">
                        <td>{{ game.place }}</td>
                        <td>{{ game.points }}</td>
                        <td>{{ game.gameName }}</td>
                    </tr>
                </table>
            </div>

            <button @click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { BaseService } from "@/services/BaseService";
import { Vue } from "vue-class-component";
import { IPlayedGame } from "@/domain/IPlayedGame";

export default class StatsView extends Vue {
    service: BaseService = new BaseService("PlayedGames");
    playedGames: IPlayedGame[] = [];

    async created() {
        const response = await this.service.getAll<IPlayedGame>("Get");

        if (response.data) {
            this.playedGames = response.data;
        }
    }
}
</script>
