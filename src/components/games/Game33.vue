<template>
    <template v-if="this.$store.state.gameStatus.gameGoes">
        <GameGoes />
    </template>
    <template v-if="this.$store.state.gameStatus.gameStops">
        <GameStops />
    </template>
    <template v-if="this.$store.state.gameStatus.gameEnds">
        <GameEnds />
    </template>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GameStops from "@/components/games/game33/GameStops.vue";
import GameGoes from "./game33/GameGoes.vue";
import GameEnds from "./game33/GameEnds.vue";

@Options({
    components: {
        GameGoes,
        GameStops,
        GameEnds,
    },
})
export default class Game33 extends Vue {}
</script>
