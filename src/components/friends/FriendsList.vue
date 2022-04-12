<template>
    <section id="friends-list-friends-section">
        <table>
            <tr v-for="friend in friendships" :key="friend">
                <td class="name">{{ friend.friendName }}</td>
                <td @click="deleteFriend(friend)" class="actions">&#10060;</td>
            </tr>
        </table>
    </section>
</template>

<script lang="ts">
import { IFriendship } from "@/domain/IFriendship";
import { BaseService } from "@/services/BaseService";
import { Vue } from "vue-class-component";

export default class FriendsListWithRemove extends Vue {
    service: BaseService = new BaseService("Friendships");
    friendships: IFriendship[] = [];

    async created() {
        const response = await this.service.getAll<IFriendship>();

        if (response.data) {
            this.friendships = response.data;
        }
    }

    async deleteFriend(friend: IFriendship) {
        const response = await this.service.delete(friend.id);

        if (response.statusCode === 204) {
            this.friendships.splice(this.friendships.indexOf(friend), 1);
        }
    }
}
</script>
