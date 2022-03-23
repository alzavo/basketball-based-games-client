<template>
    <div>
        <table class="center" style="width: 50%">
            <tr>
                <th v-for="name in columnsNames" :key="name">{{ name }}</th>
            </tr>

            <template v-for="name in gamesNames" :key="name">
                <tr>
                    <td>{{ name }}</td>
                    <td>
                        <button
                            v-on:click="
                                handleClick($event, 'add-players', name)
                            "
                        >
                            Play
                        </button>
                        <button v-on:click="handleClick($event, 'rules', name)">
                            Rules
                        </button>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import router from "@/router/index";
import store from "@/store/index";
import { SET_GAME } from "@/store/MutationTypes";

export default class GameSection extends Vue {
    columnsNames: string[] = ["Game", "Actions"];
    gamesNames: string[] = ["Around the world", "33", "21", "-5"];

    handleClick(event: Event, routeName: string, game: string): void {
        event.preventDefault();
        store.commit(SET_GAME, game);
        router.push({
            name: routeName,
        });
    }
}
</script>

<style scoped>
table,
th,
td {
    border: 1px solid black;
}

td {
    text-align: center;
}

.center {
    margin-left: auto;
    margin-right: auto;
}

button {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
</style>
