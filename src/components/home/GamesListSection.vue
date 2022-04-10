<template>
    <section v-if="messageText.length !== 0" class="message">
        <div>
            <strong>{{ messageText }}</strong>
        </div>
        <div v-on:click="this.messageText = ''" class="cross">&times;</div>
    </section>

    <section class="home-games-section">
        <div class="title">Basketball based games &#127936;</div>
        <hr />
        <div class="wrapper">
            <div class="list">
                <div v-for="game in games" :key="game" class="item">
                    <div class="name">{{ game.name }}</div>
                    <div class="actions-list">
                        <button
                            @click="readRules(game)"
                            class="button rules-button"
                        >
                            Rules
                        </button>
                        <button
                            @click="startGame(game)"
                            class="button play-button"
                        >
                            Play
                        </button>
                    </div>
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
import * as RouteName from "@/router/RoutesNames";

export default class GameListSection extends Vue {
    games: IGame[] = [];
    messageText = "";

    created() {
        this.games = STORE.state.games;
    }

    readRules(game: IGame): void {
        game.chosen = true;
        router.push({ name: RouteName.RULES });
    }

    startGame(game: IGame): void {
        if (STORE.state.players.length < 2) {
            this.messageText = "Add minimal 2 players!";
        } else {
            game.chosen = true;
            router.push({ name: game.routeName });
        }
    }
}
</script>
