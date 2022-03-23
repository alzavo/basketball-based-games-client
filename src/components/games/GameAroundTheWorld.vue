<template>
    <div>
        <table class="center" v-if="!gameEnds">
            <tr>
                <td><h1>Game: Around The World</h1></td>
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
                    <button v-on:click="changePlayers($event)">Miss</button>
                    <button v-on:click="addPoints($event)">Bucket</button>
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

export default class GameAroundTheWorld extends Vue {
    players: IPlayer[] = [
        { name: "Player1", points: 0 },
        { name: "Player2", points: 0 },
    ];
    currentPlayer: IPlayer = this.players[0];
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
        let currentPlayerIndex = this.players.indexOf(this.currentPlayer);
        if (currentPlayerIndex === this.players.length - 1) {
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[++currentPlayerIndex];
        }
    }

    createPointsMessage(): string {
        return (
            this.currentPlayer.name + " points: " + this.currentPlayer.points
        );
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
