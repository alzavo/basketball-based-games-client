<template>
    <CurrentPlayerInfo
        :playerName="currentPlayer.name"
        :playerPoints="currentPlayer.points"
    />

    <section id="points-counter-game-33-section">
        <div class="wrapper">
            <button @click="missBucket()" class="button miss-button">
                Miss
            </button>
            <button @click="makeBucket()" class="button made-button">
                Make
            </button>
        </div>
    </section>

    <Actions />
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { STORE } from "@/store";
import { Options, Vue } from "vue-class-component";
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
export default class Game33View extends Vue {
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

    makeBucket() {
        if (this.currentPlayer.points < 30) {
            this.gameManager.addPointsToCurrentPlayer(3);
        } else if (this.currentPlayer.points < 33) {
            this.gameManager.addPointsToCurrentPlayer(1);

            if (this.currentPlayer.points === 33) {
                this.gameManager.finishGame();
            }
        }
    }

    missBucket() {
        this.currentPlayer = this.gameManager.getNewCurrentPlayer();
    }
}
</script>
