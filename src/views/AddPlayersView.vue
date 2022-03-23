<template>
    <div class="wrapper center">
        <div class="column">
            <div v-for="(player, index) in players" :key="player">
                {{ player }}
                <button v-on:click="this.players.splice(index, 1)">
                    Remove
                </button>
            </div>
        </div>
        <div>
            <input
                type="text"
                placeholder="Enter player's name"
                v-model="this.newPlayerName"
            />
            <button v-on:click="addPlayer($event)">Add player</button>
        </div>
    </div>
    <div>
        <button v-on:click="this.$router.push({ name: 'game' })">
            Start game
        </button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AddPlayersView extends Vue {
    players: string[] = ["Player1", "Player2"];
    newPlayerName = "";

    addPlayer(event: Event): void {
        event.preventDefault();
        this.players.push(this.newPlayerName);
        this.newPlayerName = "";
    }
}
</script>

<style scoped>
.wrapper {
    /* background-color: aqua; */
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.column {
    /* background-color: rebeccapurple; */
    grid-area: 1 / 1 / span 2 / 1;
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
