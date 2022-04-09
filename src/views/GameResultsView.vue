<template>
    <section v-if="gameEnded" class="winner-info">
        <table>
            <tr>
                <td>&#127942;</td>
                <td class="player">{{ players[0].name }}</td>
                <td>&#127942;</td>
            </tr>
        </table>
    </section>
    <section class="game-results">
        <div class="title"><h1>Results</h1></div>
        <div class="results-table">
            <table>
                <tr>
                    <th class="place">Place</th>
                    <th>Player</th>
                    <th class="points">Points</th>
                </tr>

                <tr v-for="(player, index) in players" :key="player">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.name }}</td>
                    <td>{{ player.points }}</td>
                </tr>
            </table>
        </div>
        <div class="actions">
            <button
                v-if="gameStarted"
                v-on:click="this.$router.go(-1)"
                class="button back-button"
            >
                Back
            </button>
            <button
                v-if="gameEnded"
                v-on:click="saveGame()"
                class="button save-button"
            >
                Save
            </button>
            <button
                v-if="gameEnded"
                v-on:click="doAfterGameActions()"
                class="button home-button"
            >
                Home
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { IPlayedGameAllUsers } from "@/domain/IPlayedGameAllUsers";
import { IPlayer } from "@/interfaces/IPlayer";
import router from "@/router";
import { BaseService } from "@/services/BaseService";
import { STORE } from "@/store";
import {
    CLEAR_GAME_STATUSES,
    REMOVE_POINTS_FROM_PLAYERS,
} from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class GameResultsView extends Vue {
    service: BaseService = new BaseService("PlayedGames");
    gameEnded = false;
    gameStarted = false;
    players: IPlayer[] = [];

    beforeCreate() {
        if (STORE.state.players.length === 0) {
            router.push({ name: "home" });
        } else {
            this.gameEnded = STORE.state.gameStatus.end;
            this.gameStarted = STORE.state.gameStatus.start;
            this.players = STORE.getters.getPlayersOrderedByPoints();
        }
    }

    doAfterGameActions(): void {
        STORE.commit(CLEAR_GAME_STATUSES);
        STORE.commit(REMOVE_POINTS_FROM_PLAYERS);
        router.push({ name: "home" });
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
