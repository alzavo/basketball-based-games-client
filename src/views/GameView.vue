<template>
    <!-- done -->
    <!-- <Game33 /> -->

    <!-- done -->
    <!-- <GameMinus5 /> -->

    <!-- not done -->
    <Game21 />

    <!-- not done -->
    <!-- <GameAroundTheWorld /> -->
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
