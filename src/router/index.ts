import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import * as RouteName from "../router/RoutesNames";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: RouteName.HOME,
        component: HomeView,
    },

    {
        path: "/add-players",
        name: RouteName.ADD_PLAYERS,
        component: () => import("../views/AddPlayersView.vue"),
    },

    {
        path: "/results",
        name: RouteName.RESULTS,
        component: () => import("../views/GameResultsView.vue"),
    },

    {
        path: "/register",
        name: RouteName.REGISTER,
        component: () => import("../views/account/RegisterView.vue"),
    },

    {
        path: "/log-in",
        name: RouteName.LOG_IN,
        component: () => import("../views/account/LogInView.vue"),
    },

    {
        path: "/profile",
        name: RouteName.PROFILE,
        component: () => import("../views/account/ProfileView.vue"),
    },

    {
        path: "/friends",
        name: RouteName.FRIENDS,
        component: () => import("../views/FriendsView.vue"),
    },

    {
        path: "/statistics",
        name: RouteName.STATISTICS,
        component: () => import("../views/StatsView.vue"),
    },

    {
        path: "/rules",
        name: RouteName.RULES,
        component: () => import("../views/RulesView.vue"),
    },

    {
        path: "/game-33",
        name: RouteName.GAME_33,
        component: () => import("../views/games/Game33View.vue"),
    },

    {
        path: "/game-21",
        name: RouteName.GAME_21,
        component: () => import("../views/games/Game21View.vue"),
    },

    {
        path: "/game-minus-5",
        name: RouteName.GAME_MINUS_5,
        component: () => import("../views/games/GameMinus5View.vue"),
    },

    {
        path: "/game-around-the-world",
        name: RouteName.GAME_AROUND_THE_WORLD,
        component: () => import("../views/games/GameAroundTheWorldView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
