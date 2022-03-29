<template>
    <section v-if="message" class="message">
        <div>add minimal 2 players</div>
        <div v-on:click="this.message = false" class="cross">&times;</div>
    </section>
    <section class="games-home">
        <div class="games-list">
            <div class="list-title">Basketball based games &#127936;</div>
            <hr />
            <div v-for="game in games" :key="game" class="game-item">
                <div class="game-name">
                    <p>{{ game.name }}</p>
                </div>
                <div class="actions-list">
                    <button
                        v-on:click="readRules($event, game)"
                        class="button rules-button"
                    >
                        Rules
                    </button>
                    <button
                        v-on:click="startGame($event, game)"
                        class="button play-button"
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    </section>
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
import { Options, Vue } from "vue-class-component";
import { IGame } from "@/interfaces/IGame";
import router from "@/router";
import store from "@/store";
import {
    CLEAR_GAME_STATUSES,
    REMOVE_POINTS_FROM_PLAYERS,
} from "@/store/MutationTypes";

@Options({
    components: {},
})
export default class HomeView extends Vue {
    games: IGame[] = store.state.games;
    message = false;

    beforeCreate() {
        store.commit(REMOVE_POINTS_FROM_PLAYERS);
        store.commit(CLEAR_GAME_STATUSES);
    }

    readRules(event: Event, game: IGame): void {
        event.preventDefault();
        router.push({
            name: "rules",
            params: { name: game.name },
        });
    }

    startGame(event: Event, game: IGame): void {
        event.preventDefault();
        if (store.state.players.length < 2) {
            this.message = true;
        } else {
            router.push({ name: game.route });
        }
    }
}
</script>
