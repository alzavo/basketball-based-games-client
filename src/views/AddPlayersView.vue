<template>
    <section class="new-player-entry">
        <form id="new-player-form" action="">
            <label for="new-player"> Enter new player name</label>
            <input
                id="new-player"
                type="text"
                size="40"
                autocomplete="off"
                placeholder="Add player"
                tabindex="0"
            />
            <button
                id="add-player"
                class="button"
                title="Add new player"
                aria-label="Add new player to list"
                tabindex="0"
            >
                +
            </button>
        </form>
    </section>

    <section class="list-container">
        <div class="list-title">
            <h1>Players list</h1>
        </div>
        <hr />
        <div id="list-items">
            <div class="item">
                <p>Kyrie Irving</p>
                <button
                    id="remove-item"
                    class="button"
                    title="Remove the item"
                    aria-label="Remove the item from the list"
                    tabindex="0"
                >
                    Remove
                </button>
            </div>
            <div class="item">
                <p>James Harden</p>
                <button
                    id="remove-item"
                    class="button"
                    title="Remove the item"
                    aria-label="Remove the item from the list"
                    tabindex="0"
                >
                    Remove
                </button>
            </div>
        </div>
    </section>

    <div class="wrapper center">
        <div class="column">
            <div
                v-for="(player, index) in this.$store.state.players"
                :key="player"
            >
                {{ player.name }}
                <button v-on:click="removePlayer($event, index)">Remove</button>
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
        <router-link to="/game">Start game</router-link>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";
import { ADD_PLAYER, REMOVE_PLAYER } from "@/store/MutationTypes";
import { IPlayer } from "@/interfaces/IPlayer";

export default class AddPlayersView extends Vue {
    private newPlayerName = "";

    addPlayer(event: Event): void {
        event.preventDefault();
        store.commit(ADD_PLAYER, this.createPlayer());
    }

    removePlayer(event: Event, index: number): void {
        event.preventDefault();
        store.commit(REMOVE_PLAYER, index);
    }

    createPlayer(): IPlayer {
        let player: IPlayer = {
            name: this.newPlayerName,
            points: 0,
            allotedShot: 1,
        };
        this.newPlayerName = "";
        return player;
    }
}
</script>

<style lang="scss" scoped></style>
