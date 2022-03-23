<template>
    <div>
        <table class="center" v-if="!gameEnds">
            <tr>
                <td><h1>Game: 33</h1></td>
            </tr>
            <tr>
                <td>{{ this.currentPlayer.name + " makes shot" }}</td>
            </tr>
            <tr>
                <td>
                    {{
                        this.currentPlayer.name +
                        " points: " +
                        this.currentPlayer.points
                    }}
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
                    {{ this.currentPlayer.name + " WINS THE GAME!" }}
                    <router-link to="/">Home</router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IPlayer } from "@/interfaces/IPlayer";
import store from "@/store";
import { SET_PLAYERS_INITIAL_STATE } from "@/store/MutationTypes";

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
                store.commit(SET_PLAYERS_INITIAL_STATE);
                console.log(store.state);
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
