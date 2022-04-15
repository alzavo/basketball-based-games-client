<template>
    <MapSpotShotTypes :playerPoints="currentPlayer.points" />

    <CurrentPlayerInfo
        :playerName="currentPlayer.name"
        :playerPoints="currentPlayer.points"
    />

    <section id="points-counter-game-around-the-world-section">
        <div class="wrapper">
            <button class="button miss-button" @click="missBucket()">
                Miss
            </button>
            <button class="button made-button" @click="makeBucket()">
                Made
            </button>
            <button class="button made-button" @click="changePlayers()">
                Next player
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
import { IGame } from "@/interfaces/IGame";
import { GameAroundTheWorld } from "@/store/InitialState";
import GameManager from "@/helpers/GameManager";
import * as RouteName from "@/router/RoutesNames";
import Actions from "@/components/games/Actions.vue";
import CurrentPlayerInfo from "@/components/games/CurrentPlayerInfo.vue";
import MapSpotShotTypes from "@/components/games/game-around-the-world/MapSpotShotTypes.vue";

@Options({
    components: {
        Actions,
        CurrentPlayerInfo,
        MapSpotShotTypes,
    },
})
export default class GameAroundTheWorldView extends Vue {
    currentPlayer: IPlayer = {
        id: "",
        name: "",
        points: 0,
        canPlay: true,
    };
    game: IGame = GameAroundTheWorld;
    missCounter = 0;
    gameManager = new GameManager();

    created() {
        if (STORE.state.players.length === 0) {
            router.push({ name: RouteName.HOME });
        } else {
            if (!STORE.state.gameStatus.start && !STORE.state.gameStatus.end) {
                STORE.state.players.forEach((player) => {
                    player.points = 1;
                });
            }
            this.gameManager = new GameManager();
            this.gameManager.startGame();
            this.currentPlayer = this.gameManager.getCurrentPlayer();
        }
    }

    makeBucket(): void {
        if (this.currentPlayer.points === 12) {
            this.gameManager.finishGame();
        } else {
            this.gameManager.addPointsToCurrentPlayer(1);
            this.makeActive("shot-free");
            this.missCounter = 0;
        }
    }

    missBucket(): void {
        this.missCounter += 1;
        if (this.missCounter === 1) {
            this.makeActive("shot-chance");
        } else if (this.missCounter === 2) {
            this.makeActive("shot-life");
        } else if (this.missCounter === 3) {
            this.missCounter = 0;
            this.currentPlayer.points = 0;
            this.makeActive("shot-free");
            this.gameManager.disableCurrentPlayer();
            this.currentPlayer = this.gameManager.getNewCurrentPlayer();
        }
    }

    changePlayers(): void {
        if (this.missCounter === 2) {
            this.currentPlayer.points = 1;
        }

        this.currentPlayer = this.gameManager.getNewCurrentPlayer();

        this.makeActive("shot-free");

        this.missCounter = 0;
    }

    makeActive(id: string) {
        let free = document.getElementById("shot-free");
        let chance = document.getElementById("shot-chance");
        let life = document.getElementById("shot-life");

        free?.classList.remove("active");
        chance?.classList.remove("active");
        life?.classList.remove("active");

        let target = document.getElementById(id);
        target?.classList.add("active");
    }
}
</script>
