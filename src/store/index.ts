import { createStore } from "vuex";

import { IPlayer } from "@/interfaces/IPlayer";
import { State } from "./InitialState";

import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    SET_GAME,
    SET_INITIAL_STATE,
} from "./MutationTypes";
import { IGame } from "@/interfaces/IGame";

export default createStore({
    state: State,

    getters: {
        getChosenGame: (state) => () => {
            return state.games.find((game) => game.isChosen);
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

        [SET_INITIAL_STATE](state) {
            state.games.forEach((game) => {
                game.isChosen = false;
            });
            state.players.forEach((player) => {
                player.points = 0;
                player.allotedShot = 1;
            });
        },
    },

    actions: {},

    modules: {},
});
