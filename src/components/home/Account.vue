<template>
    <section id="account-home-section">
        <div v-if="!userLoggedIn" class="wrapper">
            <button @click="goToRegisterView()" class="button register-button">
                Register
            </button>
            <button @click="goToLogInView()" class="button log-in-button">
                Log In
            </button>
        </div>

        <div v-if="userLoggedIn" class="wrapper">
            <button @click="goToProfileView()" class="button register-button">
                Profile
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import router from "@/router";
import { STORE } from "@/store";
import { Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";

export default class AccountSection extends Vue {
    userLoggedIn = STORE.state.user.token.length !== 0;

    goToRegisterView() {
        router.push({ name: RouteName.REGISTER });
    }

    goToLogInView() {
        router.push({ name: RouteName.LOG_IN });
    }

    goToProfileView() {
        router.push({ name: RouteName.PROFILE });
    }
}
</script>
