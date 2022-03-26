<template>
    <GameGoes v-if="this.$store.state.gameStatus.gameGoes" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GameGoes from "./game33/GameGoes.vue";

@Options({
    components: {
        GameGoes,
    },
})
export default class Game33 extends Vue {}
</script>
