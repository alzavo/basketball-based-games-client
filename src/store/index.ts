import { createStore } from "vuex";

import { IPlayer } from "@/interfaces/IPlayer";
import { State } from "./InitialState";

import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    REMOVE_POINTS_FROM_PLAYERS,
    SET_GAME,
    SET_STATUS_GAME_ENDS,
    SET_STATUS_GAME_GOES,
    SET_STATUS_GAME_STOPS,
} from "./MutationTypes";
import { IGame } from "@/interfaces/IGame";

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
        [ADD_PLAYER](state, player: IPlayer) {
            state.players.push(player);
        },

        [REMOVE_PLAYER](state, index: number) {
            state.players.splice(index, 1);
        },

        [SET_GAME](state, selectedGame: IGame) {
            state.games.find((game) => {
                if (game.name === selectedGame.name) {
                    game.isChosen = true;
                }
            });
        },

        [SET_STATUS_GAME_GOES](state) {
            state.gameStatus.gameGoes = true;
            state.gameStatus.gameStops = false;
            state.gameStatus.gameEnds = false;
        },

        [SET_STATUS_GAME_STOPS](state) {
            state.gameStatus.gameGoes = false;
            state.gameStatus.gameStops = true;
            state.gameStatus.gameEnds = false;
        },

        [SET_STATUS_GAME_ENDS](state) {
            state.gameStatus.gameGoes = false;
            state.gameStatus.gameStops = false;
            state.gameStatus.gameEnds = true;
        },

        [REMOVE_POINTS_FROM_PLAYERS](state) {
            state.players.forEach((player) => {
                player.points = 0;
                player.allotedShot = 1;
            });
        },
    },

    actions: {},

    modules: {},
});
