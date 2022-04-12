<template>
    <div id="results-table-game-results-section">
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
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        players: Object,
    },
})
export default class ResultsTable extends Vue {
    players!: IPlayer[];
}
</script>
