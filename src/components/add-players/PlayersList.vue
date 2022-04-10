<template>
    <section class="add-players-section">
        <div class="wrapper">
            <table>
                <tr>
                    <td colspan="2"><h1>Players list</h1></td>
                </tr>
            </table>
            <table>
                <tr v-for="(player, index) in players" :key="player">
                    <td class="player-name">{{ player.name }}</td>
                    <td @click="removePlayer(index)">&#10060;</td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { STORE } from "@/store";
import { REMOVE_PLAYER } from "@/store/MutationTypes";
import { IPlayer } from "@/interfaces/IPlayer";

export default class PlayersList extends Vue {
    userLoggedIn = false;
    players: IPlayer[] = [];

    created() {
        this.players = STORE.state.players;
    }

    removePlayer(index: number): void {
        STORE.commit(REMOVE_PLAYER, index);
    }
}
</script>
