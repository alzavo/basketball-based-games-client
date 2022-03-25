<template>
    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="out-game-actions">
                <button class="button results-button">Results</button>
            </div>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="out-game-actions">
                <button
                    v-on:click="checkRules($event)"
                    class="button rules-button"
                >
                    Rules
                </button>
            </div>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="out-game-actions">
                <button class="button back-button">Takeback</button>
            </div>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="out-game-actions">
                <button
                    v-on:click="abortGame($event)"
                    class="button back-button"
                >
                    Abort the game
                </button>
            </div>
        </div>
    </section>

    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="out-game-actions">
                <button
                    v-on:click="returnToTheGame($event)"
                    class="button back-button"
                >
                    Back to game
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import {
    REMOVE_POINTS_FROM_PLAYERS,
    SET_STATUS_GAME_GOES,
} from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class GameStops extends Vue {
    abortGame(event: Event): void {
        event.preventDefault();
        store.commit(REMOVE_POINTS_FROM_PLAYERS);
        store.commit(SET_STATUS_GAME_GOES);
        router.push({ name: "home" });
    }

    checkRules(event: Event): void {
        event.preventDefault();
        router.push({ name: "rules" });
    }

    returnToTheGame(event: Event): void {
        event.preventDefault();
        store.commit(SET_STATUS_GAME_GOES);
    }
}
</script>
