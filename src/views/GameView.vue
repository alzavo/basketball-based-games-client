<template>
    <Game33 v-if="this.$store.getters.getChosenGame().name === '33'" />
    <GameMinus5 v-if="this.$store.getters.getChosenGame().name === '-5'" />
    <Game21 v-if="this.$store.getters.getChosenGame().name === '21'" />
    <GameAroundTheWorld
        v-if="this.$store.getters.getChosenGame().name === 'Around the world'"
    />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import Game33 from "@/components/games/Game33.vue";
import GameMinus5 from "@/components/games/GameMinus5.vue";
import Game21 from "@/components/games/Game21.vue";
import GameAroundTheWorld from "@/components/games/GameAroundTheWorld.vue";

@Options({
    components: {
        Game33,
        GameMinus5,
        Game21,
        GameAroundTheWorld,
    },
})
export default class GameView extends Vue {}
</script>
