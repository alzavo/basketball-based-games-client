<template>
    <section v-if="messageText.length !== 0" class="message">
        <div>{{ messageText }}</div>
        <div v-on:click="this.messageText = ''" class="cross">&times;</div>
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
</template>

<script lang="ts">
import { IGame } from "@/interfaces/IGame";
import router from "@/router";
import { STORE } from "@/store";
import { Vue } from "vue-class-component";

export default class GameListSection extends Vue {
    games: IGame[] = STORE.state.games;
    messageText = "";

    readRules(event: Event, game: IGame): void {
        event.preventDefault();
        router.push({
            name: "rules",
            params: { name: game.name },
        });
    }

    startGame(event: Event, game: IGame): void {
        event.preventDefault();
        if (STORE.state.players.length < 2) {
            this.messageText = "add minimal 2 players";
        } else {
            router.push({ name: game.route });
        }
    }
}
</script>
