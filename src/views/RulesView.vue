<template>
    <section id="rules-section">
        <div class="name">
            <h1>{{ game.name }}</h1>
        </div>
        <hr />
        <div class="wrapper">
            <div class="rules">{{ game.description }}</div>
        </div>
        <hr />
        <div class="buttons">
            <button v-on:click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { IGame } from "@/interfaces/IGame";
import { STORE } from "@/store";
import { Vue } from "vue-class-component";

export default class RulesView extends Vue {
    game: IGame = {
        routeName: "",
        id: "",
        name: "",
        description: "",
        language: "",
        chosen: false,
    };

    created() {
        STORE.state.games.forEach((game) => {
            if (game.chosen) {
                this.game = game;
            }
        });
    }
}
</script>
