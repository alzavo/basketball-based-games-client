<template>
    <div>
        <h1>{{ this.$store.state.gameName }}</h1>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class RulesAroundTheWorld extends Vue {}
</script>

<style scoped></style>
