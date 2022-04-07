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
        <table>
            <tr v-for="user in results" :key="user">
                <td class="name">{{ user.userName }}</td>
                <td @click="addFriend(user)" class="actions">&#9989;</td>
            </tr>
        </table>
    </section>
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

    async searchFriends(): Promise<unknown> {
        if (this.searchPhrase.length === 0) return;

        const response = await this.usersService.getAll<IUser>(
            "GetAllByName",
            this.searchPhrase
        );

        if (response.data) {
            this.results = response.data;
        } else {
            console.log("failed to get data");
        }
    }

    async addFriend(user: IUser): Promise<unknown> {
        const newFriend: IFriendshipCreate = {
            userId: STORE.state.user.id,
            friendId: user.id,
        };

        const response = await this.frindshipsService.create<IFriendshipCreate>(
            newFriend
        );

        if (response.statusCode === 201) {
            return;
        } else {
            console.log("failed to create friendship");
        }
    }
}
</script>

<style scoped></style>
