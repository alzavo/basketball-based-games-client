import { createStore } from "vuex";

import { IPlayer } from "@/interfaces/IPlayer";
import { State } from "./InitialState";
import { IGame } from "@/interfaces/IGame";

import * as Mutation from "./MutationTypes";

export default createStore({
    state: State,

    getters: {
        getChosenGame: (state) => () => {
            return state.games.find((game) => game.isChosen);
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

        [Mutation.SET_GAME](state, selectedGame: IGame) {
            state.games.forEach((game) => {
                game.isChosen = false;
            });

            state.games.find((game) => {
                if (game.name === selectedGame.name) {
                    game.isChosen = true;
                }
            });
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
    },

    actions: {},

    modules: {},
});
