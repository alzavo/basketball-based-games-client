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
            state.games.find((game) => {
                if (game.name === selectedGame.name) {
                    game.isChosen = true;
                }
            });
        },

        [Mutation.SET_STATUS_GAME_GOES](state) {
            state.gameStatus.gameGoes = true;
            state.gameStatus.gameStops = false;
            state.gameStatus.gameEnds = false;
        },

        [Mutation.SET_STATUS_GAME_STOPS](state) {
            state.gameStatus.gameGoes = false;
            state.gameStatus.gameStops = true;
            state.gameStatus.gameEnds = false;
        },

        [Mutation.SET_STATUS_GAME_ENDS](state) {
            state.gameStatus.gameGoes = false;
            state.gameStatus.gameStops = false;
            state.gameStatus.gameEnds = true;
        },

        [Mutation.REMOVE_POINTS_FROM_PLAYERS](state) {
            state.players.forEach((player) => {
                player.points = 0;
                player.allotedShot = 1;
            });
        },
    },

    actions: {},

    modules: {},
});
