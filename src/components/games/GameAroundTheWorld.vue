<template>
    <!-- add rules button and place there image also -->
    <!-- 399 x 272 */ -->
    <!-- <img src="../../assets/halfcourt.jpg" alt="Half of the basketball court." /> -->
    <div>
        <button v-on:click="this.$router.push({ name: 'rules' })">Rules</button>
        <table class="center" v-if="!gameEnds">
            <tr>
                <td><h1>Game: Around the world</h1></td>
            </tr>

            <tr>
                <td>
                    {{
                        currentPlayer.name +
                        "| Position: " +
                        currentPlayer.points
                    }}
                </td>
            </tr>

            <tr>
                <td class="wrapper" id="shots">
                    <div id="shot-free" class="active">Free shot</div>
                    <div id="shot-chance">Chance shot</div>
                    <div id="shot-life">Life shot</div>
                </td>
            </tr>

            <tr>
                <td>
                    <button v-on:click="missBucket($event)">Miss</button>
                    <button v-on:click="makeBucket($event)">Bucket</button>
                    <button v-on:click="changePlayers($event)">
                        Next player
                    </button>
                </td>
            </tr>
        </table>

        <table v-if="gameEnds" class="center">
            <tr>
                <td>
                    {{ this.currentPlayer.name + " WINS THE GAME!" }}
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
        { name: "Lebron James", points: 0 },
        { name: "Kevin Durant", points: 0 },
    ];
    currentPlayer: IPlayer = this.players[0];
    missCounter = 0;
    gameEnds = false;

    created(): void {
        this.prepareGame();
    }

    prepareGame(): void {
        this.players.forEach((player) => {
            player.points = 1;
        });
    }

    makeBucket(event: Event): void {
        event.preventDefault();
        this.currentPlayer.points += 1;
        if (this.currentPlayer.points === 13) {
            this.gameEnds = true;
        }
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
            this.removePlayer();
        }
    }

    setChildActive(id: string): void {
        document
            .querySelectorAll("[id^='shot']")
            .forEach((n) => n.classList.remove("active"));
        document.getElementById(id)?.classList.add("active");
    }

    changePlayers(event?: Event): void {
        event?.preventDefault();
        if (this.missCounter === 2) {
            this.currentPlayer.points = 1;
        }

        let currentPlayerIndex = this.players.indexOf(this.currentPlayer);
        if (currentPlayerIndex === this.players.length - 1) {
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[++currentPlayerIndex];
        }

        this.setChildActive("shot-free");
        this.missCounter = 0;
    }

    removePlayer(): void {
        let removePlayerIndex = this.players.indexOf(this.currentPlayer);
        this.changePlayers(undefined);
        this.players.splice(removePlayerIndex, 1);
        if (this.players.length === 1) {
            this.gameEnds = true;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
}

.active {
    background-color: rgb(16, 118, 235);
}

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
