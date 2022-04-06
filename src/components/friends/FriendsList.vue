<template>
    <table>
        <tr v-for="friend in friendships" :key="friend">
            <td class="name">{{ friend.friendName }}</td>
            <td @click="deleteFriend(friend)" class="actions">&#10060;</td>
        </tr>
    </table>
</template>

<script lang="ts">
import { IFriendship } from "@/domain/IFriendship";
import { BaseService } from "@/services/BaseService";
import { Vue } from "vue-class-component";

export default class FriendsList extends Vue {
    service: BaseService = new BaseService("Friendships");
    friendships: IFriendship[] = [];

    async created() {
        const response = await this.service.getAll<IFriendship>();

        if (response.data) {
            this.friendships = response.data;
        } else {
            console.log("failed to load friends");
        }
    }

    async deleteFriend(friend: IFriendship) {
        const response = await this.service.delete(friend.id);

        if (response.statusCode === 204) {
            this.friendships.splice(this.friendships.indexOf(friend), 1);
        } else {
            console.log("failed to delete friend");
        }
    }
}
</script>

<style lang="scss" scoped>
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
