import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },

    {
        path: "/add-players",
        name: "add-players",
        component: () => import("../views/AddPlayersView.vue"),
    },

    {
        path: "/results",
        name: "results",
        component: () => import("../views/GameResultsView.vue"),
    },

    {
        path: "/account",
        name: "account",
        component: () => import("../views/AccountView.vue"),
    },

    {
        path: "/rules/:name",
        name: "rules",
        component: () => import("../views/RulesView.vue"),
        props: true,
    },

    {
        path: "/game-33",
        name: "game-33",
        component: () => import("../views/games/Game33View.vue"),
    },

    {
        path: "/game-21",
        name: "game-21",
        component: () => import("../views/games/Game21View.vue"),
    },

    {
        path: "/game-minus-5",
        name: "game-minus-5",
        component: () => import("../views/games/GameMinus5View.vue"),
    },

    {
        path: "/game-around-the-world",
        name: "game-around-the-world",
        component: () => import("../views/games/GameAroundTheWorldView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
