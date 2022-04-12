<template>
    <section id="friends-section">
        <div class="wrapper">
            <div class="nav">
                <button @click="doSearch = false" class="button friends-button">
                    Friends List
                </button>
                <button @click="doSearch = true" class="button add-button">
                    Add Friends
                </button>
            </div>

            <FriendsList v-if="!doSearch" />
            <SearchFriends v-if="doSearch" />

            <button @click="goToProfileView()" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import FriendsList from "@/components/friends/FriendsList.vue";
import SearchFriends from "@/components/friends/SearchFriends.vue";
import { IFriendship } from "@/domain/IFriendship";
import router from "@/router";
import { BaseService } from "@/services/BaseService";
import { Options, Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";

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

    goToProfileView() {
        router.push({ name: RouteName.PROFILE });
    }
}
</script>
