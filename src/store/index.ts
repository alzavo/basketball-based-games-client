import { IAppState } from "@/interfaces/IAppState";
import { IPlayer } from "@/interfaces/IPlayer";
import { createStore } from "vuex";

import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    SET_GAME,
    SET_PLAYERS_INITIAL_STATE,
} from "./MutationTypes";

export const state: IAppState = {
    gameName: "",
    players: [],
};

export default createStore({
    state: state,

    getters: {},

    mutations: {
        [ADD_PLAYER](state, player: IPlayer) {
            state.players.push(player);
        },

        [REMOVE_PLAYER](state, index: number) {
            state.players.splice(index, 1);
        },

        [SET_GAME](state, game: string) {
            state.gameName = game;
        },

        [SET_PLAYERS_INITIAL_STATE](state) {
            state.players.forEach((player) => {
                player.points = 0;
                player.allotedShot = 1;
            });
        },
    },

    actions: {},

    modules: {},
});
