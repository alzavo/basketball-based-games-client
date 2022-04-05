<template>
    <section v-if="messageText.length !== 0" class="message">
        <div>{{ messageText }}</div>
        <div v-on:click="this.messageText = ''" class="cross">&times;</div>
    </section>

    <section class="home-games">
        <div class="container">
            <div class="title">Basketball based games &#127936;</div>
            <hr />
            <div class="list">
                <div v-for="game in games" :key="game" class="item">
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

<style lang="scss" scoped>
.home-games {
    display: flex;
    flex-direction: column;
    max-height: 60vh;

    .container {
        display: flex;
        flex-direction: column;

        .title {
            text-align: center;
            font-size: 2rem;
        }

        hr {
            margin: 0.2rem 0.5rem;
        }

        .list {
            max-height: 40vh;
            overflow-y: scroll;
        }

        .item {
            display: flex;
            flex-direction: row;
            align-items: center;

            .game-name {
                display: flex;
                flex-direction: row;
                flex: 1;
                justify-content: center;
            }

            .actions-list {
                display: flex;
                flex-direction: row;
                flex: 1;

                button {
                    margin: 0 0.3rem;
                    width: 4rem;
                }
            }
        }
    }
}
</style>
