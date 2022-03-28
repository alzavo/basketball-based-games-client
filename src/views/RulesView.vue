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
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IGame } from "@/interfaces/IGame";

@Options({
    components: {},
})
export default class RulesView extends Vue {
    game: IGame = store.getters.getChosenGame();
}
</script>

<style scoped></style>
