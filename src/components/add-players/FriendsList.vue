<template>
    <section class="friends-list-section">
        <div class="wrapper">
            <table>
                <tr>
                    <td colspan="2"><h1>Friends list</h1></td>
                </tr>
            </table>
            <table>
                <template v-for="friend in friends" :key="friend">
                    <tr v-if="!friend.chosen">
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

    async created() {
        const response = await this.service.getAll<IFriendship>();

        if (response.data) {
            response.data.forEach((friendship) => {
                this.friends.push(this.createPlayer(friendship));
            });
        }
    }

    addPlayer(friend: IPlayer) {
        if (!friend.chosen) {
            friend.chosen = true;
            STORE.commit(ADD_PLAYER, friend);
        }
    }

    createPlayer(friendship: IFriendship): IPlayer {
        return {
            id: friendship.friendId,
            name: friendship.friendName,
            points: 0,
            canPlay: true,
            chosen: false,
        };
    }
}
</script>
