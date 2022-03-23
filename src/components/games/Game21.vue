<template>
    <div>
        <table class="center" v-if="!gameEnds">
            <tr>
                <td><h1>Game: 21</h1></td>
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
                    <button v-on:click="addPoints($event, 1)">
                        Add 1 point
                    </button>
                    <button
                        v-if="currentPlayer.points < 20"
                        v-on:click="addPoints($event, 2)"
                    >
                        Add 2 points
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

export default class Game21 extends Vue {
    players: IPlayer[] = [
        { name: "Player1", points: 0 },
        { name: "Player2", points: 0 },
    ];
    currentPlayer: IPlayer = this.players[0];
    gameEnds = false;

    addPoints(event: Event, points: number): void {
        event.preventDefault();
        this.currentPlayer.points += points;
        if (this.currentPlayer.points === 21) {
            this.gameEnds = true;
        }
    }

    missBucket(event: Event): void {
        event.preventDefault();
        if (
            this.currentPlayer.points === 10 ||
            this.currentPlayer.points === 20
        ) {
            this.currentPlayer.points = 0;
        }
        this.changePlayers();
    }

    changePlayers(): void {
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
