<template>
    <section v-if="message" class="message">
        <div>{{ messageText }}</div>
        <div v-on:click="this.message = false" class="cross">&times;</div>
    </section>

    <section class="new-player-entry">
        <div id="new-player-form">
            <input
                type="text"
                autocomplete="off"
                placeholder="Add player"
                v-model="this.newPlayerName"
            />
            <button class="button add-button" v-on:click="addPlayer($event)">
                +
            </button>
        </div>
    </section>

    <section class="list-container">
        <div class="buttons-group">
            <button v-on:click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
            <button v-on:click="startGame($event)" class="button play-button">
                Play
            </button>
        </div>

        <div class="players-list">
            <table>
                <tr>
                    <th class="player">Player</th>
                    <th class="actions">Remove</th>
                </tr>
                <tr
                    v-for="(player, index) in this.$store.state.players"
                    :key="player"
                >
                    <td class="player">{{ player.name }}</td>
                    <td class="actions">
                        <div
                            id="remove-cross"
                            v-on:click="removePlayer($event, index)"
                        >
                            &#10060;
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";
import router from "@/router/index";
import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    SET_GAME_STATUS_START,
} from "@/store/MutationTypes";
import { IPlayer } from "@/interfaces/IPlayer";

export default class AddPlayersView extends Vue {
    newPlayerName = "";
    message = false;
    messageText = "";

    addPlayer(event: Event): void {
        event.preventDefault();
        if (this.newPlayerName.length === 0) {
            this.message = true;
            this.messageText = "Name can't be empty";
        } else {
            store.commit(ADD_PLAYER, this.createPlayer());
        }
    }

    removePlayer(event: Event, index: number): void {
        event.preventDefault();
        store.commit(REMOVE_PLAYER, index);
    }

    startGame(event: Event): void {
        event.preventDefault();
        if (store.state.players.length < 2) {
            this.message = true;
            this.messageText = "Minimal 2 players";
        } else {
            store.commit(SET_GAME_STATUS_START);
            router.push({ name: "game" });
        }
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
