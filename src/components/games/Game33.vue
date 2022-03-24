<template>
    <section class="game-info">
        <div class="general-info">
            <div v-if="gameEnds" class="winner-label">Winner</div>
            <button v-if="!gameEnds" class="button">Rules</button>
        </div>
        <hr />
        <div class="player-info">
            <div class="player-name">
                <div class="column-name">Player</div>
                <hr />
                <div class="column-data">{{ this.currentPlayer.name }}</div>
            </div>
            <div class="player-points">
                <div class="column-name">Points</div>
                <hr />
                <div class="column-data">{{ this.currentPlayer.points }}</div>
            </div>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div v-if="!gameEnds" class="in-game-actions">
                <button
                    class="button miss-button"
                    v-on:click="changePlayers($event)"
                >
                    Miss
                </button>
                <button
                    class="button made-button"
                    v-on:click="addPoints($event)"
                >
                    Made
                </button>
            </div>
            <div v-if="gameEnds" class="out-game-actions">
                <button
                    class="button home-button"
                    v-on:click="goToHome($event)"
                >
                    Home
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import store from "@/store/index";
import router from "@/router/index";

export default class Game33 extends Vue {
    currentPlayer: IPlayer = store.state.players[0];
    gameEnds = false;

    addPoints(event: Event): void {
        event.preventDefault();
        if (this.currentPlayer.points < 30) {
            this.currentPlayer.points += 3;
        } else if (this.currentPlayer.points >= 30) {
            this.currentPlayer.points += 1;
            if (this.currentPlayer.points === 33) {
                this.gameEnds = true;
            }
        }
    }

    changePlayers(event: Event): void {
        event.preventDefault();
        let currentPlayerIndex = store.state.players.indexOf(
            this.currentPlayer
        );
        if (currentPlayerIndex === store.state.players.length - 1) {
            this.currentPlayer = store.state.players[0];
        } else {
            this.currentPlayer = store.state.players[++currentPlayerIndex];
        }
    }

    goToHome(event: Event): void {
        event.preventDefault();
        router.push({ name: "home" });
    }
}
</script>
