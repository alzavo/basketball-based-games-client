<template>
    <section id="friends-list-add-players-section">
        <div class="wrapper">
            <table>
                <tr>
                    <td colspan="2"><h2>Friends</h2></td>
                </tr>
                <tr v-for="friendship in friendships" :key="friendship">
                    <td class="name">{{ friendship.friendName }}</td>
                    <td @click="addFriend(friendship)" class="actions">
                        &#9989;
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { IFriendship } from "@/domain/IFriendship";
import { IPlayer } from "@/interfaces/IPlayer";
import { BaseService } from "@/services/BaseService";
import { STORE } from "@/store";
import { ADD_PLAYER } from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class FriendsList extends Vue {
    service: BaseService = new BaseService("Friendships");
    friendships: IFriendship[] = [];
    playerInList = false;

    async beforeCreate() {
        const response = await this.service.getAll<IFriendship>();

        if (response.data) {
            this.friendships = response.data;
        } else {
            console.log("failed to load friends");
        }
    }

    addFriend(friendship: IFriendship) {
        let player: IPlayer = {
            id: friendship.friendId,
            name: friendship.friendName,
            points: 0,
            canPlay: true,
        };

        if (
            STORE.state.players.filter(
                (player) => player.id === friendship.friendId
            ).length > 0
        ) {
            this.playerInList = true;
            return;
        }

        STORE.commit(ADD_PLAYER, player);
    }
}
</script>

<style lang="scss" scoped>
#friends-list-add-players-section {
    margin-top: 0.5rem;
}

.wrapper {
    padding: 0.3rem;
}

table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    text-align: center;
}

tr {
    .name {
        width: 80%;
    }

    .actins {
        width: 20%;
    }
}

td,
th {
    border: 1px solid #dddddd;
    padding: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
