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
            <div class="settings">
                <button
                    v-on:click="this.$router.push({ name: 'settings' })"
                    class="button settings-button"
                >
                    Settings
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
import store from "@/store";
import { SET_GAME_STATUS_END } from "@/store/MutationTypes";
import router from "@/router";

export default class GameAroundTheWorld extends Vue {
    currentPlayer: IPlayer = store.state.players[0];
    missCounter = 0;

    beforeCreate() {
        store.state.players.forEach((player) => {
            player.points = 1;
        });
    }

    addPoints(event: Event): void {
        event.preventDefault();
        if (this.currentPlayer.points === 12) {
            this.finishGame();
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

        let currentPlayerIndex = store.state.players.indexOf(
            this.currentPlayer
        );

        if (currentPlayerIndex === store.state.players.length - 1) {
            this.currentPlayer = store.state.players[0];
        } else {
            this.currentPlayer = store.state.players[++currentPlayerIndex];
        }

        if (!this.currentPlayer.canPlay) {
            this.changePlayers(event);
        }

        this.setChildActive("shot-free");
        this.missCounter = 0;
    }

    removePlayer(event: Event): void {
        event.preventDefault();
        this.currentPlayer.canPlay = false;
        this.currentPlayer.points = 0;
        this.setChildActive("shot-free");
        if (!this.checkIfGameCanContinue()) {
            this.finishGame();
            return;
        }
        this.changePlayers(event);
    }

    checkIfGameCanContinue(): boolean {
        let counter = 0;
        store.state.players.forEach((player) => {
            if (player.canPlay) {
                counter += 1;
            }
        });

        if (counter >= 2) {
            return true;
        } else {
            return false;
        }
    }

    finishGame(): void {
        store.commit(SET_GAME_STATUS_END);
        router.push({ name: "results" });
    }
}
</script>
