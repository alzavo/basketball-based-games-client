<template>
    <CurrentPlayerInfo
        :playerName="currentPlayer.name"
        :playerPoints="currentPlayer.points"
    />

    <section id="points-counter-game-21-section">
        <div class="wrapper">
            <button class="button miss-button" @click="missBucket()">
                Miss
            </button>
            <button class="button made-button" @click="addPoints(1)">
                1 point
            </button>
            <button
                v-if="this.currentPlayer.points !== 20"
                class="button made-button"
                @click="addPoints(2)"
            >
                2 points
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

@Options({
    components: {
        Actions,
        CurrentPlayerInfo,
    },
})
export default class Game21View extends Vue {
    currentPlayer: IPlayer = {
        id: "",
        name: "",
        points: 0,
        canPlay: true,
    };
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

    addPoints(points: number): void {
        this.currentPlayer.points += points;

        if (this.currentPlayer.points === 21) {
            this.gameManager.finishGame();
        }
    }

    missBucket(): void {
        if (
            this.currentPlayer.points === 10 ||
            this.currentPlayer.points === 20
        ) {
            this.currentPlayer.points = 0;
        }

        this.currentPlayer = this.gameManager.getNewCurrentPlayer();
    }
}
</script>
