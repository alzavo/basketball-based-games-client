<template>
    <WinnerInfo v-if="gameEnded" :playerName="winnerName" />

    <section id="game-results-section">
        <div class="title"><h1>Results</h1></div>
        <ResultsTable :players="players" />
        <Actions :players="players" />
    </section>
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { STORE } from "@/store";
import { Options, Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";
import WinnerInfo from "@/components/game-results/WinnerInfo.vue";
import ResultsTable from "@/components/game-results/ResultsTable.vue";
import Actions from "@/components/game-results/Actions.vue";

@Options({
    components: {
        WinnerInfo,
        ResultsTable,
        Actions,
    },
})
export default class GameResultsView extends Vue {
    players: IPlayer[] = [];
    winnerName = "";
    gameEnded = STORE.state.gameStatus.end;

    created() {
        if (STORE.state.players.length === 0) {
            router.push({ name: RouteName.HOME });
        } else {
            this.players = STORE.getters.getPlayersOrderedByPoints();
            this.winnerName = this.players[0].name;
        }
    }
}
</script>
