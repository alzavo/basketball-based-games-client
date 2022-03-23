<template>
    <div>
        <table class="center" v-if="!gameEnds">
            <tr>
                <td><h1>Game: -5</h1></td>
            </tr>

            <tr v-if="deathCircleCount > 0">
                <td><h3>Death Circle</h3></td>
            </tr>

            <tr>
                <td>{{ createShotMessage() }}</td>
            </tr>

            <tr>
                <td>
                    {{ createPointsMessage() }}
                </td>
            </tr>

            <tr>
                <td>
                    <button v-on:click="missBucket($event)">Miss</button>
                    <button v-on:click="madeBucket($event)">Bucket</button>
                    <button
                        v-on:click="this.$router.push({ name: 'add-players' })"
                    >
                        menu
                    </button>
                </td>
            </tr>
        </table>

        <table v-if="gameEnds" class="center">
            <tr>
                <td>
                    {{ createGameEndMessage() }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import store from "@/store";

export default class GameMinus5 extends Vue {
    players: IPlayer[] = [...store.state.players];
    currentPlayer: IPlayer = this.players[0];
    deathCircleCount = 0;
    gameEnds = false;

    madeBucket(event: Event): void {
        event.preventDefault();
        if (this.deathCircleCount === 0) {
            this.deathCircleCount++;
        } else if (this.deathCircleCount < this.players.length) {
            this.deathCircleCount++;
            if (this.deathCircleCount === this.players.length) {
                this.deathCircleCount = 0;
            }
        }
        this.changePlayers(event);
    }

    missBucket(event: Event): void {
        event.preventDefault();
        if (this.deathCircleCount > 0) {
            this.currentPlayer.points -= 1;
            if (this.currentPlayer.points === -5) {
                this.removePlayer(event);
            }
        }
        this.deathCircleCount = 0;
        this.changePlayers(event);
    }

    changePlayers(event: Event): void {
        event.preventDefault();
        let currentPlayerIndex = this.players.indexOf(this.currentPlayer);
        if (currentPlayerIndex === this.players.length - 1) {
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[++currentPlayerIndex];
        }
    }

    removePlayer(event: Event): void {
        event.preventDefault();
        let removePlayerIndex = this.players.indexOf(this.currentPlayer);
        this.changePlayers(event);
        this.players.splice(removePlayerIndex, 1);
        if (this.players.length === 1) {
            this.gameEnds = true;
        }
    }

    createPointsMessage(): string {
        return "Points: " + this.currentPlayer.points;
    }

    createShotMessage(): string {
        return this.currentPlayer.name + " makes shot";
    }

    createGameEndMessage(): string {
        return this.currentPlayer.name + " WINS THE GAME!";
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
    border: 1px solid black;
}

table,
th,
td {
    border: 1px solid black;
}

.center {
    margin-left: auto;
    margin-right: auto;
}

button {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
</style>
