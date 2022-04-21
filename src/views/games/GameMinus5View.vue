<template>
    <DeathCircle v-if="deathCircleCount > 0" />

    <CurrentPlayerInfo
        :playerName="currentPlayer.name"
        :playerPoints="currentPlayer.points"
    />

    <section id="points-counter-game-minus-5-section">
        <div class="wrapper">
            <button class="button miss-button" @click="missBucket()">
                Miss
            </button>
            <button class="button made-button" @click="makeBucket()">
                Make
            </button>
        </div>
    </section>

    <Actions />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import { STORE } from "@/store";
import router from "@/router";
import GameManager from "@/helpers/GameManager";
import * as RouteName from "@/router/RoutesNames";
import Actions from "@/components/games/Actions.vue";
import CurrentPlayerInfo from "@/components/games/CurrentPlayerInfo.vue";
import DeathCircle from "@/components/games/game-minus-5/DeathCircle.vue";

@Options({
    components: {
        Actions,
        CurrentPlayerInfo,
        DeathCircle,
    },
})
export default class GameMinus5View extends Vue {
    currentPlayer: IPlayer = {
        id: "",
        name: "",
        points: 0,
        canPlay: true,
    };
    deathCircleCount = 0;
    gameManager = new GameManager();

    created() {
        if (STORE.state.players.length === 0) {
            router.push({ name: RouteName.HOME });
        } else {
            this.gameManager = STORE.state.gameManager;
            if (!STORE.state.gameStatus.start) {
                this.gameManager.startGame();
            }
            this.currentPlayer = this.gameManager.getCurrentPlayer();
        }
    }

    makeBucket(): void {
        this.deathCircleCount++;

        if (this.deathCircleCount === this.gameManager.countActivePlayers()) {
            this.deathCircleCount = 0;
        }

        this.currentPlayer = this.gameManager.getNewCurrentPlayer();
    }

    missBucket(): void {
        if (this.deathCircleCount > 0) {
            this.gameManager.addPointsToCurrentPlayer(-1);

            if (this.currentPlayer.points === -5) {
                this.gameManager.disableCurrentPlayer();
            }
        }

        this.deathCircleCount = 0;
        this.currentPlayer = this.gameManager.getNewCurrentPlayer();
    }
}
</script>
