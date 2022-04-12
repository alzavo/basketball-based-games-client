<template>
    <section v-if="messageText.length !== 0" id="message-home-section">
        <div>
            <strong>{{ messageText }}</strong>
        </div>
        <div @click="this.messageText = ''" class="cross">&times;</div>
    </section>

    <section id="games-list-home-section">
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
import * as Mutation from "@/store/MutationTypes";
import { BaseService } from "@/services/BaseService";

export default class GameListSection extends Vue {
    games: IGame[] = [];
    messageText = "";
    service: BaseService = new BaseService("Games");

    async created() {
        this.games = STORE.state.games;

        const response = await this.service.getAll<IGame>();

        if (response.data) {
            STORE.commit(Mutation.SET_GAMES, response.data);
            this.games = response.data;
        }
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
