<template>
    <section class="players-list-section">
        <div class="wrapper">
            <table>
                <tr>
                    <td colspan="2"><h1>Players list</h1></td>
                </tr>
            </table>
            <table>
                <tr v-for="player in players" :key="player">
                    <template v-if="!checkIfUser(player)">
                        <td class="player-name">{{ player.name }}</td>
                        <td @click="removePlayer(player)">&#10060;</td>
                    </template>
                    <template v-if="checkIfUser(player)">
                        <td class="player-name">{{ player.name }}</td>
                        <td></td>
                    </template>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { STORE } from "@/store";
import { ADD_PLAYER, REMOVE_PLAYER } from "@/store/MutationTypes";
import { IPlayer } from "@/interfaces/IPlayer";

export default class PlayersList extends Vue {
    userLoggedIn = false;
    players: IPlayer[] = [];

    checkIfUser(player: IPlayer) {
        if (STORE.state.user.token.length !== 0) {
            if (STORE.state.user.id === player.id) {
                return true;
            }
        } else {
            return false;
        }
    }

    created() {
        let player: IPlayer = {
            id: STORE.state.user.id,
            name: STORE.state.user.name,
            points: 0,
            canPlay: true,
            chosen: true,
        };

        if (STORE.state.user.token.length > 0) {
            if (STORE.state.players.length === 0) {
                STORE.commit(ADD_PLAYER, player);
            }
        }

        this.players = STORE.state.players;
    }

    removePlayer(player: IPlayer): void {
        STORE.commit(REMOVE_PLAYER, player);
    }
}
</script>
