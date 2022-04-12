<template>
    <section id="current-player-info-games-section">
        <div class="wrapper">
            <table>
                <tr>
                    <th class="player">Player</th>
                    <td>{{ playerName }}</td>
                </tr>
                <tr>
                    <th class="points">Points</th>
                    <td>{{ playerPoints }}</td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        playerName: String,
        playerPoints: Number,
    },
})
export default class CurrentPlayerInfo extends Vue {
    playerName!: string;
    playerPoints!: number;
}
</script>
