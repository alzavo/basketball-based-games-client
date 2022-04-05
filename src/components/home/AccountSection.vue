<template>
    <section class="account-entry">
        <div v-if="this.$store.state.user.token.length === 0" class="wrapper">
            <button
                v-on:click="this.$router.push('/register')"
                class="button register-button"
            >
                Register
            </button>
            <button
                v-on:click="this.$router.push('/log-in')"
                class="button log-in-button"
            >
                Log In
            </button>
        </div>
        <div v-if="this.$store.state.user.token.length !== 0" class="wrapper">
            <button
                v-on:click="this.$router.push('/profile')"
                class="button register-button"
            >
                Profile
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AccountSection extends Vue {}
</script>

<style lang="scss" scoped>
.account-entry {
    margin-top: 0.5rem;

    .wrapper {
        display: flex;
        justify-content: space-evenly;
        padding: 0.2rem;
    }

    button {
        padding: 0.3rem;
        width: 5rem;
    }
}
</style>
