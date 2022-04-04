<template>
    <section class="game-info">
        <div class="player-info">
            <div class="image">
                <img src="../../assets/halfcourt.jpg" />
            </div>
            <div class="container">
                <div id="shot-free" class="active">Free</div>
                <div id="shot-chance">Chance</div>
                <div id="shot-life">Life</div>
            </div>
            <hr />
            <table>
                <tr>
                    <th class="player">Player</th>
                    <th class="points">Spot</th>
                </tr>
                <tr>
                    <td>{{ this.currentPlayer.name }}</td>
                    <td>{{ this.currentPlayer.points }}</td>
                </tr>
            </table>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="additional">
                <button
                    v-on:click="
                        this.$router.push({
                            name: 'rules',
                            params: { name: game.name },
                        })
                    "
                    class="button rules-button"
                >
                    Rules
                </button>
                <button
                    v-on:click="this.$router.push({ name: 'home' })"
                    class="button back-button"
                >
                    Quit game
                </button>
                <button
                    v-on:click="this.$router.push({ name: 'results' })"
                    class="button results-button"
                >
                    Results
                </button>
            </div>
            <hr />
            <div class="shooting">
                <button
                    class="button miss-button"
                    v-on:click="missBucket($event)"
                >
                    Miss
                </button>
                <button
                    class="button made-button"
                    v-on:click="addPoints($event)"
                >
                    Made
                </button>
                <button
                    v-if="this.currentPlayer.points !== 20"
                    class="button made-button"
                    v-on:click="changePlayers($event)"
                >
                    Next player
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import { STORE } from "@/store";
import { SET_GAME_STATUS_START } from "@/store/MutationTypes";
import router from "@/router";
import { IGame } from "@/interfaces/IGame";
import { GameAroundTheWorld } from "@/store/InitialState";
import GameManager from "@/helpers/GameManager";

export default class GameAroundTheWorldView extends Vue {
    currentPlayer: IPlayer = { name: "", points: 0, canPlay: true };
    game: IGame = GameAroundTheWorld;
    missCounter = 0;
    manager = new GameManager();

    beforeCreate() {
        if (STORE.state.players.length === 0) {
            router.push({ name: "home" });
        } else {
            if (!STORE.state.gameStatus.start && !STORE.state.gameStatus.end) {
                STORE.state.players.forEach((player) => {
                    player.points = 1;
                });
            }
            this.currentPlayer = STORE.state.players[0];
            STORE.commit(SET_GAME_STATUS_START);
        }
    }

    addPoints(event: Event): void {
        event.preventDefault();
        if (this.currentPlayer.points === 12) {
            this.manager.finishGame();
            return;
        }
        this.currentPlayer.points += 1;
        this.setChildActive("shot-free");
        this.missCounter = 0;
    }

    missBucket(event: Event): void {
        event.preventDefault();
        this.missCounter += 1;
        if (this.missCounter === 1) {
            this.setChildActive("shot-chance");
        } else if (this.missCounter === 2) {
            this.setChildActive("shot-life");
        } else if (this.missCounter === 3) {
            this.removePlayer(event);
        }
    }

    setChildActive(id: string): void {
        document
            .querySelectorAll("[id^='shot']")
            .forEach((n) => n.classList.remove("active"));
        document.getElementById(id)?.classList.add("active");
    }

    changePlayers(event: Event): void {
        event.preventDefault();
        if (this.missCounter === 2) {
            this.currentPlayer.points = 1;
        }

        this.currentPlayer = this.manager.getNextPlayer(this.currentPlayer);

        this.setChildActive("shot-free");
        this.missCounter = 0;
    }

    removePlayer(event: Event): void {
        event.preventDefault();
        this.currentPlayer.canPlay = false;
        this.currentPlayer.points = 0;
        this.setChildActive("shot-free");
        if (this.manager.countActivePlayers() === 1) {
            this.manager.finishGame();
        }
        this.changePlayers(event);
    }
}
</script>
