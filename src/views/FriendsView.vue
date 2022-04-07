<template>
    <section>
        <div class="wrapper">
            <table>
                <tr>
                    <td>
                        <button @click="doSearch = false">Friends List</button>
                    </td>
                    <td>
                        <button @click="doSearch = true">Add Friends</button>
                    </td>
                </tr>
            </table>
            <FriendsList v-if="!doSearch" />
            <SearchFriends v-if="doSearch" />
            <button
                @click="this.$router.push('/profile')"
                class="button back-button"
            >
                Back to profile
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import FriendsList from "@/components/friends/FriendsList.vue";
import SearchFriends from "@/components/friends/SearchFriends.vue";
import { IFriendship } from "@/domain/IFriendship";
import { BaseService } from "@/services/BaseService";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
        FriendsList,
        SearchFriends,
    },
})
export default class FriendsView extends Vue {
    service: BaseService = new BaseService("Friendships");
    friendships: IFriendship[] = [];
    doSearch = false;

    async created() {
        const response = await this.service.getAll<IFriendship>();

        if (response.data) {
            this.friendships = response.data;
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0.3rem;
}

table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    text-align: center;
}

td {
    padding: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 1rem;
}
</style>
