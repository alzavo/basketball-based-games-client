<template>
    <div class="list-container">
        <section>
            <div class="players-list">
                <table>
                    <tr>
                        <th colspan="2"><h1>Players</h1></th>
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
    </div>

    <div class="actions-container">
        <section class="new-player-entry">
            <div id="new-player-form">
                <input
                    type="text"
                    autocomplete="off"
                    placeholder="Enter name"
                    maxlength="15"
                    v-model="this.newPlayerName"
                />
                <button
                    class="button add-button"
                    v-on:click="addPlayer($event)"
                >
                    +
                </button>
            </div>
        </section>

        <section class="buttons-group">
            <div>
                <button
                    v-on:click="this.$router.push({ name: 'home' })"
                    class="button home-button"
                >
                    Home
                </button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { STORE } from "@/store";
import { ADD_PLAYER, REMOVE_PLAYER } from "@/store/MutationTypes";
import { IPlayer } from "@/interfaces/IPlayer";

export default class AddPlayersView extends Vue {
    newPlayerName = "";

    addPlayer(event: Event): void {
        event.preventDefault();
        if (this.newPlayerName.length === 0) {
            return;
        } else {
            STORE.commit(ADD_PLAYER, this.createPlayer());
        }
    }

    removePlayer(event: Event, index: number): void {
        event.preventDefault();
        STORE.commit(REMOVE_PLAYER, index);
    }

    createPlayer(): IPlayer {
        let player: IPlayer = {
            name: this.newPlayerName,
            points: 0,
            canPlay: true,
        };
        this.newPlayerName = "";
        return player;
    }
}
</script>
