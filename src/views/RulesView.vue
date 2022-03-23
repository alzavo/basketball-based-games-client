<template>
    <RulesAroundTheWorld />
</template>

<script lang="ts">
import RulesAroundTheWorld from "@/components/rules/RulesAroundTheWorld.vue";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
        RulesAroundTheWorld,
    },
})
export default class RulesView extends Vue {}
</script>

<style scoped></style>
