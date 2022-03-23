import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },

    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/AboutView.vue"),
    },

    {
        path: "/rules/:game",
        name: "rules",
        component: () => import("../views/RulesView.vue"),
        props: true,
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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;