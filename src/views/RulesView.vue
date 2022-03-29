<template>
    <section class="game-rules">
        <div class="general-info">
            <div class="name">
                <h1>{{ game.name }}</h1>
            </div>
            <hr />
            <div class="rules">{{ game.description }}</div>
        </div>
        <hr />
        <div class="nav-actions">
            <button v-on:click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { IGame } from "@/interfaces/IGame";
import store from "@/store";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        name: String,
    },
})
export default class RulesView extends Vue {
    name!: string;
    game: IGame = { name: "", route: "", description: "" };

    beforeCreate() {
        this.game = store.getters.getGameByName(this.name);
    }
}
</script>
