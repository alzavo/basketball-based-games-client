<template>
    <section class="profile-section">
        <div class="wrapper">
            <div class="greeting">
                <h1>Welcome, {{ user.name }}!</h1>
            </div>
            <div class="choices">
                <button
                    @click="goToFriendsView()"
                    class="button friends-button"
                >
                    Friends
                </button>
                <button @click="goToStatsView()" class="button stats-button">
                    Statistics
                </button>
                <button @click="goToHomeView()" class="button home-button">
                    Home
                </button>
                <button @click="deleteProfile()" class="button delete-button">
                    Delete Profile
                </button>
                <button @click="logOut()" class="button log-out-button">
                    Log Out
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import router from "@/router";
import { STORE } from "@/store";
import { LOG_OUT } from "@/store/MutationTypes";
import { Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";
import { BaseService } from "@/services/BaseService";

export default class ProfileView extends Vue {
    user = STORE.state.user;
    usersService: BaseService = new BaseService("Users");

    async deleteProfile() {
        const response = await this.usersService.delete(this.user.id);

        if (response.statusCode === 204) {
            this.logOut();
        }
    }

    goToFriendsView() {
        router.push({ name: RouteName.FRIENDS });
    }

    goToStatsView() {
        router.push({ name: RouteName.STATISTICS });
    }

    goToHomeView() {
        router.push({ name: RouteName.HOME });
    }

    logOut(): void {
        STORE.commit(LOG_OUT);
        this.goToHomeView();
    }
}
</script>
