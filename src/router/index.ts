import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },

    {
        path: "/rules",
        name: "rules",
        component: () => import("../views/RulesView.vue"),
    },

    {
        path: "/add-players",
        name: "add-players",
        component: () => import("../views/AddPlayersView.vue"),
    },

    {
        path: "/game",
        name: "game",
        component: () => import("../views/GameView.vue"),
    },

    {
        path: "/settings",
        name: "settings",
        component: () => import("../views/SettingsView.vue"),
    },

    {
        path: "/results",
        name: "results",
        component: () => import("../views/GameResultsView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
