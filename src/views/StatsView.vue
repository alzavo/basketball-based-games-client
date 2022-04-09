<template>
    <section>
        <div class="wrapper">
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
    </section>

    <section class="buttons-group">
        <div>
            <button v-on:click="this.$router.go(-1)" class="button back-button">
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
        } else {
            console.log("fails");
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0.3rem;
}

table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    text-align: center;
}

tr {
    .place {
        width: 25%;
    }

    .points {
        width: 25%;
    }

    .name {
        width: 50%;
    }
}

td,
th {
    border: 1px solid #dddddd;
    padding: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
