<template>
    <section class="account-section">
        <div class="choices">
            <button
                v-on:click="this.$router.push({ name: 'account' })"
                class="button account-button"
            >
                Account
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AccountSection extends Vue {}
</script>

<style lang="scss" scoped>
.account-section {
    margin-top: 0.5rem;

    .choices {
        display: flex;
        justify-content: space-evenly;
        padding: 0.2rem;

        button {
            padding: 0.3rem;
            width: 30%;
        }
    }
}
</style>
