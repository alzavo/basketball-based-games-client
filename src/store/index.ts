import { createStore } from "vuex";

import { IPlayer } from "@/interfaces/IPlayer";
import * as Games from "./InitialState";
import { State } from "./InitialState";

import * as Mutation from "./MutationTypes";
import * as RouteName from "@/router/RoutesNames";
import { IJwtResponse } from "@/domain/IJwtResponse";
import { IGame } from "@/interfaces/IGame";

export const STORE = createStore({
    state: State,

    getters: {
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

        [Mutation.REMOVE_PLAYER](state, player: IPlayer) {
            player.chosen = false;
            state.players.splice(state.players.indexOf(player), 1);
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
            state.games.forEach((game) => (game.chosen = false));
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
            state.players = [];
        },

        [Mutation.LOG_OUT](state) {
            state.user.name = "";
            state.user.token = "";
            state.user.id = "";
            state.players = [];
        },

        [Mutation.SET_GAMES](state, games: IGame[]) {
            games.forEach((game) => {
                switch (game.name) {
                    case Games.Game21.name:
                        game.routeName = RouteName.GAME_21;
                        break;
                    case Games.Game33.name:
                        game.routeName = RouteName.GAME_33;
                        break;
                    case Games.GameMinus5.name:
                        game.routeName = RouteName.GAME_MINUS_5;
                        break;
                    case Games.GameAroundTheWorld.name:
                        game.routeName = RouteName.GAME_AROUND_THE_WORLD;
                        break;
                }
            });

            state.games = games;
        },
    },

    actions: {},
});
