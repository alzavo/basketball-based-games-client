<template>
    <section id="search-friends-friends-section">
        <div class="wrapper">
            <input
                type="text"
                autocomplete="off"
                placeholder="Enter name"
                maxlength="30"
                v-model="searchPhrase"
            />
            <button class="button add-button" @click="searchFriends()">
                Search
            </button>
        </div>
    </section>

    <section id="friends-list-friends-section">
        <div class="wrapper">
            <table>
                <tr v-for="user in results" :key="user">
                    <td class="name">{{ user.userName }}</td>
                    <td @click="addFriend(user)" class="actions">&#9989;</td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { IFriendship } from "@/domain/IFriendship";
import { IUser } from "@/interfaces/IUser";
import { BaseService } from "@/services/BaseService";
import { STORE } from "@/store";
import { Vue } from "vue-class-component";

export default class SearchFriends extends Vue {
    searchPhrase = "";
    renderResults = false;
    usersService: BaseService = new BaseService("Users");
    frindshipsService: BaseService = new BaseService("Friendships");
    results: IUser[] = [];

    async searchFriends() {
        if (this.searchPhrase.length === 0) return;

        const response = await this.usersService.getAll<IUser>(
            "GetByPhrase",
            this.searchPhrase
        );

        if (response.data) {
            this.results = response.data;
            this.searchPhrase = "";
        }
    }

    async addFriend(user: IUser) {
        const newFriend: IFriendship = {
            id: "0",
            userId: STORE.state.user.id,
            userName: "",
            friendId: user.id,
            friendName: "",
        };

        const response = await this.frindshipsService.create<IFriendship>(
            newFriend
        );

        if (response.statusCode === 200) {
            this.results.splice(this.results.indexOf(user), 1);
        }
    }
}
</script>
