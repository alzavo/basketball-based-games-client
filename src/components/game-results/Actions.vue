<template>
    <div id="actions-game-results-section">
        <button
            v-if="gameStarted"
            @click="this.$router.go(-1)"
            class="button back-button"
        >
            Back
        </button>
        <button
            v-if="gameEnded && userLoggedIn"
            @click="saveGame()"
            class="button save-button"
        >
            Save
        </button>
        <button
            v-if="gameEnded"
            @click="doAfterGameActions()"
            class="button home-button"
        >
            Home
        </button>
    </div>
</template>

<script lang="ts">
import { IPlayedGameAllUsers } from "@/domain/IPlayedGameAllUsers";
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { BaseService } from "@/services/BaseService";
import { STORE } from "@/store";
import * as Mutation from "@/store/MutationTypes";
import { Options, Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";

@Options({
    props: {
        players: Object,
    },
})
export default class Actions extends Vue {
    service: BaseService = new BaseService("PlayedGames");
    gameEnded = false;
    gameStarted = false;
    userLoggedIn = false;
    players!: IPlayer[];

    created() {
        if (STORE.state.players.length === 0) {
            router.push({ name: RouteName.HOME });
        } else {
            this.gameEnded = STORE.state.gameStatus.end;
            this.gameStarted = STORE.state.gameStatus.start;
            this.userLoggedIn = STORE.state.user.token.length > 0;
        }
    }

    doAfterGameActions(): void {
        STORE.commit(Mutation.CLEAR_GAME_STATUSES);
        STORE.commit(Mutation.REMOVE_POINTS_FROM_PLAYERS);
        router.push({ name: RouteName.HOME });
    }

    async saveGame() {
        let playedGame: IPlayedGameAllUsers = { playedGames: [] };
        let gameId = "";
        STORE.state.games.forEach((game) => {
            if (game.chosen) {
                gameId = game.id;
            }
        });

        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            playedGame.playedGames.push({
                place: i + 1,
                points: player.points,
                userId: player.id,
                gameId: gameId,
            });
        }

        const response = await this.service.create<IPlayedGameAllUsers>(
            playedGame,
            "Post"
        );

        if (response.statusCode === 201) {
            this.doAfterGameActions();
        } else {
            console.log("failed to create");
        }
    }
}
</script>
