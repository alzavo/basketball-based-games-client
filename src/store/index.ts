import { createStore } from "vuex";

import { IPlayer } from "@/interfaces/IPlayer";
import { State } from "./InitialState";

import * as Mutation from "./MutationTypes";
import { IJwtResponse } from "@/domain/IJwtResponse";
import { IGame } from "@/interfaces/IGame";

export const STORE = createStore({
    state: State,

    getters: {
        getGameById: (state) => (gameId: string) => {
            return state.games.find((game) => game.id === gameId);
        },

        getPlayersOrderedByPoints: (state) => () => {
            return state.players.sort(function (player1, player2) {
                if (player1.points < player2.points) {
                    return 1;
                }
                if (player1.points > player2.points) {
                    return -1;
                }
                return 0;
            });
        },
    },

    mutations: {
        [Mutation.ADD_PLAYER](state, player: IPlayer) {
            state.players.push(player);
        },

        [Mutation.REMOVE_PLAYER](state, index: number) {
            state.players.splice(index, 1);
        },

        [Mutation.SET_GAME_STATUS_START](state) {
            state.gameStatus.start = true;
            state.gameStatus.end = false;
        },

        [Mutation.SET_GAME_STATUS_END](state) {
            state.gameStatus.start = false;
            state.gameStatus.end = true;
        },

        [Mutation.CLEAR_GAME_STATUSES](state) {
            state.gameStatus.start = false;
            state.gameStatus.end = false;
        },

        [Mutation.REMOVE_POINTS_FROM_PLAYERS](state) {
            state.players.forEach((player) => {
                player.points = 0;
                player.canPlay = true;
            });
        },

        [Mutation.LOG_IN](state, jwtResponse: IJwtResponse) {
            state.user.name = jwtResponse.userName;
            state.user.token = jwtResponse.token;
            state.user.id = jwtResponse.userId;
        },

        [Mutation.LOG_OUT](state) {
            state.user.name = "";
            state.user.token = "";
            state.user.id = "";
        },

        [Mutation.SET_GAMES](state, games: IGame[]) {
            state.games = [];
            state.games = games;
        },
    },

    actions: {},
});
