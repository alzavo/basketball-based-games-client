<template>
    <section id="add-players-home-section">
        <div class="wrapper">
            <button @click="goToAddPlayersView()" class="button add-button">
                Add Players
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import router from "@/router";
import { Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";

export default class AddPlayersSection extends Vue {
    goToAddPlayersView() {
        router.push({ name: RouteName.ADD_PLAYERS });
    }
}
</script>
