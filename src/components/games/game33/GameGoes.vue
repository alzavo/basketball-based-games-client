<template>
    <section class="game-info">
        <div class="general-info">
            <button
                v-on:click="stopTheGame($event)"
                class="button settings-button"
            >
                Settings
            </button>
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
            <div class="in-game-actions">
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
        </div>
    </section>
</template>

<script lang="ts">
import { IPlayer } from "@/interfaces/IPlayer";
import store from "@/store";
import {
    SET_STATUS_GAME_ENDS,
    SET_STATUS_GAME_STOPS,
} from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class GameGoes extends Vue {
    currentPlayer: IPlayer = store.state.players[0];

    addPoints(event: Event): void {
        event.preventDefault();
        if (this.currentPlayer.points < 30) {
            this.currentPlayer.points += 3;
        } else if (this.currentPlayer.points >= 30) {
            this.currentPlayer.points += 1;
            if (this.currentPlayer.points === 33) {
                store.commit(SET_STATUS_GAME_ENDS);
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

    stopTheGame(event: Event): void {
        event.preventDefault();
        store.commit(SET_STATUS_GAME_STOPS);
    }
}
</script>
