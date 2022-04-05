<template>
    <section class="add-players">
        <div class="container">
            <button
                v-on:click="this.$router.push({ name: 'add-players' })"
                class="button add-button"
            >
                Add players
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AddPlayersSection extends Vue {}
</script>

<style lang="scss" scoped>
.add-players {
    margin-top: 0.5rem;

    .container {
        display: flex;
        margin: 0;
        padding: 0.3rem;
        justify-content: center;

        button {
            width: 7rem;
            padding: 0.2rem;
        }
    }
}
</style>
