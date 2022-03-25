<template>
    <section class="new-player-entry">
        <div id="new-player-form">
            <input
                id="new-player"
                type="text"
                autocomplete="off"
                placeholder="Add player"
                v-model="this.newPlayerName"
            />
            <button
                id="add-player"
                class="button"
                v-on:click="addPlayer($event)"
            >
                +
            </button>
        </div>
    </section>

    <section class="list-container">
        <div class="list-title">
            <h1>Players</h1>
            <div class="buttons-group">
                <button
                    v-on:click="this.$router.go(-1)"
                    class="button back-button"
                >
                    Back
                </button>
                <button
                    class="button play-button"
                    v-on:click="startGame($event)"
                >
                    Play
                </button>
            </div>
        </div>
        <hr />
        <div id="list-items">
            <div
                class="item"
                v-for="(player, index) in this.$store.state.players"
                :key="player"
            >
                <p>{{ player.name }}</p>
                <button
                    id="remove-item"
                    class="button"
                    title="Remove the item"
                    aria-label="Remove the item from the list"
                    tabindex="0"
                    v-on:click="removePlayer($event, index)"
                >
                    -
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";
import router from "@/router/index";
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

    startGame(event: Event): void {
        event.preventDefault();
        router.push({ name: "game" });
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
