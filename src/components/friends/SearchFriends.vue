<template>
    <section class="new-player-entry">
        <div>
            <input
                type="text"
                autocomplete="off"
                placeholder="Enter name"
                maxlength="15"
                v-model="searchPhrase"
            />
            <button class="button add-button" @click="searchFriends()">
                Search
            </button>
        </div>
    </section>
    <table>
        <tr v-for="user in results" :key="user">
            <td class="name">{{ user.userName }}</td>
            <td @click="addFriend(user)" class="actions">&#9989;</td>
        </tr>
    </table>
</template>

<script lang="ts">
import { IFriendshipCreate } from "@/domain/IFriendship";
import { IUser } from "@/interfaces/IUser";
import { BaseService } from "@/services/BaseService";
import { STORE } from "@/store";
import { Vue } from "vue-class-component";

export default class SearchFriends extends Vue {
    usersService: BaseService = new BaseService("Users");
    frindshipsService: BaseService = new BaseService("Friendships");
    searchPhrase = "";
    results: IUser[] = [];

    async searchFriends() {
        if (this.searchPhrase.length === 0) return;

        const response = await this.usersService.getAll<IUser>(
            "GetAllByName",
            this.searchPhrase
        );

        if (response.data) {
            this.results = response.data;
            this.searchPhrase = "";
        } else {
            console.log("failed to get data");
        }
    }

    async addFriend(user: IUser) {
        const newFriend: IFriendshipCreate = {
            userId: STORE.state.user.id,
            friendId: user.id,
        };

        const response = await this.frindshipsService.create<IFriendshipCreate>(
            newFriend
        );

        if (response.statusCode === 201) {
            this.results.splice(this.results.indexOf(user), 1);
        } else {
            console.log("failed to create friendship");
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
