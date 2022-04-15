<template>
    <section id="friends-list-add-players-section">
        <div class="wrapper">
            <table>
                <tr>
                    <td colspan="2"><h1>Friends list</h1></td>
                </tr>
            </table>
            <table>
                <template v-for="friend in friends" :key="friend">
                    <tr v-if="!checkIfFriendAlreadyAdded(friend)">
                        <td class="name">{{ friend.name }}</td>
                        <td @click="addPlayer(friend)" class="actions">
                            &#9989;
                        </td>
                    </tr>
                </template>
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
    friends: IPlayer[] = [];
    players: IPlayer[] = [];

    async created() {
        this.players = STORE.state.players;

        const response = await this.service.getAll<IFriendship>("Get");

        if (response.data) {
            response.data.forEach((friendship) => {
                this.friends.push({
                    id: friendship.friendId,
                    name: friendship.friendName,
                    points: 0,
                    canPlay: true,
                });
            });
        }
    }

    checkIfFriendAlreadyAdded(friend: IPlayer): boolean {
        if (this.players.some((player) => player.id === friend.id)) {
            return true;
        } else {
            return false;
        }
    }

    addPlayer(friend: IPlayer) {
        STORE.commit(ADD_PLAYER, friend);
    }
}
</script>
