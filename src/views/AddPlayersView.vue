<template>
    <section>
        <div class="players-list">
            <table>
                <tr>
                    <td colspan="2"><h1>Players list</h1></td>
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

    <PlayerNameEntry v-if="!userLoggedIn" />
    <FriendsList v-if="userLoggedIn" />

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
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { STORE } from "@/store";
import { REMOVE_PLAYER } from "@/store/MutationTypes";
import { BaseService } from "@/services/BaseService";
import { IFriendship } from "@/domain/IFriendship";
import PlayerNameEntry from "@/components/add-players/PlayerNameEntry.vue";
import FriendsList from "@/components/add-players/FriendsList.vue";

@Options({ components: { PlayerNameEntry, FriendsList } })
export default class AddPlayersView extends Vue {
    service: BaseService = new BaseService("Friendships");
    newPlayerName = "";
    friendships: IFriendship[] = [];
    userLoggedIn = STORE.state.user.token.length > 0;

    async created() {
        if (STORE.state.user.token.length > 0) {
            const response = await this.service.getAll<IFriendship>();

            if (response.data) {
                this.friendships = response.data;
            } else {
                console.log("failed to load data");
            }
        }
    }

    removePlayer(event: Event, index: number): void {
        event.preventDefault();
        STORE.commit(REMOVE_PLAYER, index);
    }
}
</script>

<style lang="scss" scoped>
.players-list {
    padding: 0.5rem;
    min-height: 45vh;
    max-height: 45vh;
    overflow-y: scroll;
    margin-top: 0.5rem;
}

table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    text-align: center;
}

tr {
    .actions {
        width: 2rem;
    }
}

td,
th {
    border: 1px solid #dddddd;
    padding: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    #remove-cross:hover {
        cursor: pointer;
        font-size: 2rem;
    }
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
