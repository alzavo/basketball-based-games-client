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
                        <button v-on:click="playClicked($event, name)">
                            Play
                        </button>
                        <button v-on:click="rulesClicked($event, name)">
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

export default class GameSection extends Vue {
    columnsNames: string[] = ["Game", "Actions"];
    gamesNames: string[] = ["Around the world", "33", "21", "-5"];

    rulesClicked(event: Event, name: string): void {
        event.preventDefault();
        this.$router.push({
            name: "rules",
            params: { game: name },
        });
    }

    playClicked(event: Event): void {
        // change state in store about game
        event.preventDefault();
        this.$router.push({
            name: "add-players",
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
