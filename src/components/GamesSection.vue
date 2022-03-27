<template>
    <section class="games-home">
        <div class="games-list">
            <div class="list-title">
                Basketball based games &#127936; &#9977;
            </div>
            <hr />
            <div v-for="game in games" :key="game" class="game-item">
                <div class="game-name">
                    <p>{{ game.name }}</p>
                </div>
                <div class="actions-list">
                    <button
                        v-on:click="handleClick($event, 'rules', game)"
                        class="button rules-button"
                    >
                        Rules
                    </button>
                    <button
                        v-on:click="handleClick($event, 'add-players', game)"
                        class="button play-button"
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import router from "@/router/index";
import store from "@/store/index";
import { REMOVE_POINTS_FROM_PLAYERS, SET_GAME } from "@/store/MutationTypes";
import { IGame } from "@/interfaces/IGame";

export default class GameSection extends Vue {
    games: IGame[] = store.state.games;

    beforeCreate() {
        store.commit(REMOVE_POINTS_FROM_PLAYERS);
    }

    handleClick(event: Event, routeName: string, game: IGame): void {
        event.preventDefault();
        store.commit(SET_GAME, game);
        router.push({
            name: routeName,
        });
    }
}
</script>
