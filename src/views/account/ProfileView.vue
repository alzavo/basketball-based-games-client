<template>
    <section>
        <div>
            <div>Welcome, {{ user.name }}!</div>
            <button
                v-on:click="this.$router.push('/friends')"
                class="button friends-button"
            >
                Friends
            </button>
            <div>Statistics</div>
            <button
                v-on:click="this.$router.push('/')"
                class="button home-button"
            >
                Home
            </button>
            <button v-on:click="logOut()" class="button log-out-button">
                Log Out
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import router from "@/router";
import { STORE } from "@/store";
import { LOG_OUT } from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class ProfileView extends Vue {
    user = STORE.state.user;

    logOut(): void {
        STORE.commit(LOG_OUT);
        router.push("/");
    }
}
</script>
