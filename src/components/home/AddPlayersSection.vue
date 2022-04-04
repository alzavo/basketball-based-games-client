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
